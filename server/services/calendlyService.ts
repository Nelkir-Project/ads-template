import crypto from 'crypto';

export interface CalendlyClientInfo {
  clientName: string;
  clientPhone: string | null;
  startTime?: string;
  endTime?: string;
  eventTitle?: string;
  location?: string;
  eventId?: string;
}

export class CalendlyService {
  private static phonePatterns = [
    /\+\d{1,3}\d{4,14}/g,
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    /\b\d{10,15}\b/g,
  ];

  verifySignature(signatureHeader: string | string[] | undefined, rawBody: string, secret?: string): boolean {
    if (!secret) return true; // If no secret configured, skip verification
    if (!signatureHeader || Array.isArray(signatureHeader)) return false;

    // Header format: "t=timestamp,v1=signature"
    const parts = signatureHeader.split(',').reduce<Record<string, string>>((acc, part) => {
      const [k, v] = part.split('=');
      if (k && v) acc[k.trim()] = v.trim();
      return acc;
    }, {});

    const timestamp = parts['t'];
    const signature = parts['v1'];
    if (!timestamp || !signature) return false;

    const payloadToSign = `${timestamp}.${rawBody}`;
    const expected = crypto.createHmac('sha256', secret).update(payloadToSign).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  }

  extractClientInfo(calendlyPayload: any): CalendlyClientInfo {
    // Calendly events: invitee.created, invitee.canceled
    const payload = calendlyPayload?.payload || {};
    const invitee = payload?.invitee || payload?.payload?.invitee || {};
    const event = payload?.event || payload?.payload?.event || {};

    const nameFromInvitee: string | undefined = invitee?.name || invitee?.last_name || invitee?.first_name
      ? `${invitee?.first_name ?? ''} ${invitee?.last_name ?? ''}`.trim() || invitee?.name
      : undefined;
    const clientName = (nameFromInvitee && nameFromInvitee.trim().length > 0)
      ? this.capitalizeWords(nameFromInvitee)
      : 'Valued Client';

    const eventTitle: string | undefined = payload?.event_type?.name || event?.name || payload?.name;
    const startTime: string | undefined = payload?.start_time || event?.start_time;
    const endTime: string | undefined = payload?.end_time || event?.end_time;
    const eventId: string | undefined = payload?.event_uuid || event?.uuid || payload?.uuid;

    const location = this.extractLocation(payload);
    const clientPhone = this.extractPhone(payload, invitee);

    return { clientName, clientPhone, startTime, endTime, eventTitle, location: location || undefined, eventId };
  }

  private extractLocation(payload: any): string | null {
    // Calendly location can be an object or string
    const loc = payload?.location || payload?.event?.location;
    if (!loc) return null;
    if (typeof loc === 'string') return loc;
    if (typeof loc === 'object') {
      return loc?.location || loc?.join_url || loc?.details || null;
    }
    return null;
  }

  private extractPhone(payload: any, invitee: any): string | null {
    // Common explicit fields
    const candidates: Array<string | undefined> = [
      invitee?.sms_reminder_number,
      invitee?.text_reminder_number,
      invitee?.phone_number,
      payload?.answers?.phone,
      payload?.phone,
    ];

    // Q&A form responses
    const qas = payload?.questions_and_answers;
    if (Array.isArray(qas)) {
      for (const qa of qas) {
        const question = `${qa?.question || ''}`.toLowerCase();
        const answer = `${qa?.answer || ''}`;
        if (question.includes('phone') || question.includes('mobile')) {
          candidates.push(answer);
        }
      }
    }

    // Scan through candidates
    for (const candidate of candidates) {
      if (typeof candidate === 'string') {
        const phones = this.findPhonesInText(candidate);
        if (phones.length > 0) {
          const normalized = this.normalizePhoneNumber(phones[0]);
          if (this.isValidPhoneNumber(normalized)) return normalized;
        }
      }
    }

    // Fallback: scan entire payload string
    const allText = JSON.stringify(payload);
    const phones = this.findPhonesInText(allText);
    for (const phone of phones) {
      const normalized = this.normalizePhoneNumber(phone);
      if (this.isValidPhoneNumber(normalized)) return normalized;
    }

    return null;
  }

  private findPhonesInText(text: string): string[] {
    const phones: string[] = [];
    for (const pattern of CalendlyService.phonePatterns) {
      const matches = text.match(pattern);
      if (matches) phones.push(...matches);
    }
    return phones;
  }

  private normalizePhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+')) return cleaned;
    if (cleaned.length === 10) return `+1${cleaned}`;
    if (cleaned.length === 11 && cleaned.startsWith('1')) return `+${cleaned}`;
    if (!cleaned.startsWith('+')) cleaned = `+${cleaned}`;
    return cleaned;
  }

  private isValidPhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) return false;
    const digits = cleaned.substring(1);
    return digits.length >= 7 && digits.length <= 15 && /^\d+$/.test(digits);
  }

  private capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}


