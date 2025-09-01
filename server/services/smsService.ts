import AWS from 'aws-sdk';

export class SMSService {
  private sns: AWS.SNS;

  // Common phone number patterns (E.164 and various formats)
  private static phonePatterns = [
    // E.164 format: +1234567890
    /\+\d{1,3}\d{4,14}/g,
    // US format: (123) 456-7890, 123-456-7890, 123.456.7890
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    // International without +: 1234567890
    /\b\d{10,15}\b/g
  ];

  constructor() {
    // Configure AWS
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    });

    this.sns = new AWS.SNS();
  }

  // Send SMS to a single phone number
  async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    const params = {
      Message: message,
      PhoneNumber: phoneNumber,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    };

    try {
      const result = await this.sns.publish(params).promise();
      console.log('📱 SMS sent successfully to', phoneNumber.replace(/\d(?=\d{4})/g, '*'), ':', result.MessageId);
      return true;
    } catch (error) {
      console.error('❌ Error sending SMS:', error);
      return false;
    }
  }

  // Send SMS to multiple phone numbers
  async sendBulkSMS(phoneNumbers: string[], message: string): Promise<{ success: number; failed: number }> {
    const results = await Promise.allSettled(
      phoneNumbers.map(phoneNumber => this.sendSMS(phoneNumber, message))
    );

    const success = results.filter(result => result.status === 'fulfilled' && result.value).length;
    const failed = results.length - success;

    console.log(`📱 Bulk SMS results: ${success} sent, ${failed} failed`);
    return { success, failed };
  }

  // Send SMS using SNS Topic (if you prefer topic-based messaging)
  async sendSMSToTopic(message: string, topicArn?: string): Promise<boolean> {
    const arn = topicArn || process.env.AWS_SNS_TOPIC_ARN;
    
    if (!arn) {
      console.error('❌ No SNS Topic ARN provided');
      return false;
    }

    const params = {
      Message: message,
      TopicArn: arn,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    };

    try {
      const result = await this.sns.publish(params).promise();
      console.log('📱 SMS sent to topic successfully:', result.MessageId);
      return true;
    } catch (error) {
      console.error('❌ Error sending SMS to topic:', error);
      return false;
    }
  }

  /**
   * Extract phone numbers from calendar event
   * Looks in: attendee emails, event description, event location, attendee names
   */
  extractPhoneNumbers(event: any): string[] {
    const phoneNumbers: Set<string> = new Set();
    
    // 1. Check event description for phone numbers
    if (event.description) {
      const phones = this.findPhonesInText(event.description);
      phones.forEach(phone => phoneNumbers.add(phone));
    }

    // 2. Check event location for phone numbers
    if (event.location) {
      const phones = this.findPhonesInText(event.location);
      phones.forEach(phone => phoneNumbers.add(phone));
    }

    // 3. Check attendee information
    if (event.attendees) {
      for (const attendee of event.attendees) {
        // Skip the organizer (usually the calendar owner)
        if (attendee.organizer) continue;
        
        // Check attendee display name
        if (attendee.displayName) {
          const phones = this.findPhonesInText(attendee.displayName);
          phones.forEach(phone => phoneNumbers.add(phone));
        }
        
        // Check attendee email for embedded phone numbers
        if (attendee.email) {
          const phones = this.findPhonesInText(attendee.email);
          phones.forEach(phone => phoneNumbers.add(phone));
        }
      }
    }

    // 4. Check custom event properties (if any)
    if (event.extendedProperties?.private) {
      const privateProps = event.extendedProperties.private;
      Object.values(privateProps).forEach((value: any) => {
        if (typeof value === 'string') {
          const phones = this.findPhonesInText(value);
          phones.forEach(phone => phoneNumbers.add(phone));
        }
      });
    }

    return Array.from(phoneNumbers).map(phone => this.normalizePhoneNumber(phone));
  }

  /**
   * Find phone numbers in a text string
   */
  private findPhonesInText(text: string): string[] {
    const phones: string[] = [];
    
    for (const pattern of SMSService.phonePatterns) {
      const matches = text.match(pattern);
      if (matches) {
        phones.push(...matches);
      }
    }
    
    return phones;
  }

  /**
   * Normalize phone number to E.164 format
   */
  normalizePhoneNumber(phone: string): string {
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');
    
    // If it starts with +, it's likely already in E.164 format
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    // Handle US numbers (assume US if 10 digits)
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    // Handle US numbers with country code (11 digits starting with 1)
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    
    // For other formats, add + if not present
    if (!cleaned.startsWith('+')) {
      cleaned = `+${cleaned}`;
    }
    
    return cleaned;
  }

  /**
   * Validate if a phone number is likely valid for SMS
   */
  isValidPhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Must start with + and have 7-15 digits after country code
    if (!cleaned.startsWith('+')) return false;
    
    const digits = cleaned.substring(1);
    return digits.length >= 7 && digits.length <= 15 && /^\d+$/.test(digits);
  }

  /**
   * Get the primary client phone number from an event
   * Returns the first valid phone number found, prioritizing description over attendees
   */
  getPrimaryClientPhone(event: any): string | null {
    const phones = this.extractPhoneNumbers(event);
    const validPhones = phones.filter(phone => this.isValidPhoneNumber(phone));
    
    return validPhones.length > 0 ? validPhones[0] : null;
  }

  /**
   * Get client name from event for personalization
   */
  getClientName(event: any): string {
    // Try to get name from non-organizer attendees
    if (event.attendees) {
      const client = event.attendees.find((attendee: any) => !attendee.organizer);
      if (client?.displayName) {
        return client.displayName;
      }
      if (client?.email) {
        // Extract name from email if no display name
        const emailName = client.email.split('@')[0].replace(/[._]/g, ' ');
        return this.capitalizeWords(emailName);
      }
    }
    
    // Fallback to event creator if available
    if (event.creator?.displayName && !event.creator.self) {
      return event.creator.displayName;
    }
    
    return 'Valued Client';
  }

  /**
   * Capitalize words for better formatting
   */
  private capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  /**
   * Format client confirmation message
   */
  formatClientConfirmationMessage(event: any, clientName: string): string {
    const startTime = new Date(event.start?.dateTime || event.start?.date);
    const businessName = process.env.BUSINESS_NAME || 'Our Business';
    
    const formatTime = (date: Date) => {
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const title = event.summary || 'Your Appointment';
    const location = event.location || 'Our location';

    return `🎉 APPOINTMENT CONFIRMED!

Hi ${clientName},

Your appointment has been successfully booked:

📅 ${title}
🕐 ${formatTime(startTime)}
📍 ${location}

We look forward to seeing you!

Questions? Reply to this message or call ${process.env.BUSINESS_PHONE || 'us'}.

- ${businessName}`;
  }

  /**
   * Format business notification message
   */
  formatBusinessNotificationMessage(event: any, clientName: string, clientPhone: string): string {
    const startTime = new Date(event.start?.dateTime || event.start?.date);
    
    const formatTime = (date: Date) => {
      return date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const title = event.summary || 'New Appointment';
    const location = event.location || 'No location specified';
    const maskedPhone = clientPhone.replace(/\d(?=\d{4})/g, '*');

    return `📅 NEW BOOKING!

Client: ${clientName}
Phone: ${maskedPhone}
Service: ${title}
📅 ${formatTime(startTime)}
📍 ${location}

Client has been sent confirmation SMS.

Event ID: ${event.id}`;
  }

  /**
   * Process calendar event and send appropriate SMS messages
   */
  async processCalendarBooking(event: any): Promise<{ clientSent: boolean; businessSent: boolean; clientPhone?: string }> {
    console.log('📅 Processing calendar booking:', event.summary);
    
    // Extract client information
    const clientPhone = this.getPrimaryClientPhone(event);
    const clientName = this.getClientName(event);
    
    let clientSent = false;
    let businessSent = false;

    // Send confirmation SMS to client
    if (clientPhone && this.isValidPhoneNumber(clientPhone)) {
      const clientMessage = this.formatClientConfirmationMessage(event, clientName);
      clientSent = await this.sendSMS(clientPhone, clientMessage);
      
      if (clientSent) {
        console.log(`✅ Client confirmation sent to ${clientName} at ${clientPhone.replace(/\d(?=\d{4})/g, '*')}`);
      } else {
        console.log(`❌ Failed to send client confirmation to ${clientPhone.replace(/\d(?=\d{4})/g, '*')}`);
      }
    } else {
      console.log('⚠️ No valid client phone number found in event:', event.id);
    }

    // Send notification to business (if configured)
    const businessPhone = process.env.BUSINESS_NOTIFICATION_PHONE;
    const sendBusinessCopy = process.env.SEND_BUSINESS_COPY === 'true';
    
    if (sendBusinessCopy && businessPhone && clientPhone) {
      const businessMessage = this.formatBusinessNotificationMessage(event, clientName, clientPhone);
      businessSent = await this.sendSMS(businessPhone, businessMessage);
      
      if (businessSent) {
        console.log(`✅ Business notification sent`);
      } else {
        console.log(`❌ Failed to send business notification`);
      }
    }

    return { clientSent, businessSent, clientPhone: clientPhone || undefined };
  }

  // Legacy method for backward compatibility
  formatEventMessage(event: any): string {
    return this.formatBusinessNotificationMessage(event, this.getClientName(event), this.getPrimaryClientPhone(event) || 'No phone');
  }
}