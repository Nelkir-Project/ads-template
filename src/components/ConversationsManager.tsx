import { useState, useEffect, useCallback } from 'react';
import type {
  ConversationRecord,
  ConversationStatus,
  ConversationsListResponse,
  SendReplyRequest,
  SendReplyResponse,
} from '../types/conversation';

const STATUS_COLORS: Record<ConversationStatus, string> = {
  INITIAL_SENT: 'bg-blue-100 text-blue-800',
  AWAITING_RESPONSE: 'bg-yellow-100 text-yellow-800',
  FOLLOW_UP_SCHEDULED: 'bg-purple-100 text-purple-800',
  FOLLOW_UP_SENT: 'bg-orange-100 text-orange-800',
  CLIENT_RESPONDED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
};

const STATUS_LABELS: Record<ConversationStatus, string> = {
  INITIAL_SENT: 'Initial Sent',
  AWAITING_RESPONSE: 'Awaiting Response',
  FOLLOW_UP_SCHEDULED: 'Follow-up Scheduled',
  FOLLOW_UP_SENT: 'Follow-up Sent',
  CLIENT_RESPONDED: 'Client Responded',
  COMPLETED: 'Completed',
};

export function ConversationsManager() {
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<ConversationRecord | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyStatus, setReplyStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [filterStatus, setFilterStatus] = useState<ConversationStatus | 'ALL'>('ALL');

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = filterStatus === 'ALL' 
        ? '/api/conversations'
        : `/api/conversations?status=${filterStatus}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }

      const data: ConversationsListResponse = await response.json();
      setConversations(data.conversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversations');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 30000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  // Handle reply submission
  const handleSendReply = async () => {
    if (!selectedConversation || !replyMessage.trim()) {
      return;
    }

    try {
      setSendingReply(true);
      setReplyStatus(null);

      const payload: SendReplyRequest = {
        phoneNumber: selectedConversation.phoneNumber,
        conversationId: selectedConversation.conversationId,
        message: replyMessage.trim(),
      };

      const response = await fetch('/api/conversations/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: SendReplyResponse = await response.json();

      if (data.success) {
        setReplyStatus({ type: 'success', message: 'Reply sent successfully!' });
        setReplyMessage('');
        // Refresh conversations and selected conversation
        await fetchConversations();
        // Update selected conversation
        const updatedConv = await fetchConversationDetail(
          selectedConversation.phoneNumber,
          selectedConversation.conversationId
        );
        if (updatedConv) {
          setSelectedConversation(updatedConv);
        }
      } else {
        setReplyStatus({ type: 'error', message: data.error || 'Failed to send reply' });
      }
    } catch (err) {
      setReplyStatus({ 
        type: 'error', 
        message: err instanceof Error ? err.message : 'Failed to send reply' 
      });
    } finally {
      setSendingReply(false);
    }
  };

  // Fetch conversation detail
  const fetchConversationDetail = async (phoneNumber: string, conversationId: string) => {
    try {
      const response = await fetch(`/api/conversations/${encodeURIComponent(phoneNumber)}/${encodeURIComponent(conversationId)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch conversation detail');
      }
      const data = await response.json();
      return data.conversation as ConversationRecord;
    } catch (err) {
      console.error('Error fetching conversation detail:', err);
      return null;
    }
  };

  // Handle conversation selection
  const handleSelectConversation = (conversation: ConversationRecord) => {
    setSelectedConversation(conversation);
    setReplyMessage('');
    setReplyStatus(null);
  };

  // Format date for display
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Mask phone number
  const maskPhone = (phone: string) => {
    if (phone.length < 4) return phone;
    return phone.slice(0, -4).replace(/\d/g, '*') + phone.slice(-4);
  };

  // Get status counts
  const statusCounts = conversations.reduce((acc, conv) => {
    acc[conv.status] = (acc[conv.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="conversations-manager">
      {/* Header */}
      <div className="conversations-header">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SMS Conversations</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and respond to client SMS conversations
          </p>
        </div>
        <button
          onClick={fetchConversations}
          disabled={loading}
          className="refresh-button"
        >
          {loading ? '↻ Refreshing...' : '↻ Refresh'}
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="status-tabs">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={filterStatus === 'ALL' ? 'status-tab-active' : 'status-tab'}
        >
          All ({conversations.length})
        </button>
        {Object.entries(STATUS_LABELS).map(([status, label]) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as ConversationStatus)}
            className={filterStatus === status ? 'status-tab-active' : 'status-tab'}
          >
            {label} ({statusCounts[status] || 0})
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={fetchConversations} className="error-retry">
            Retry
          </button>
        </div>
      )}

      <div className="conversations-layout">
        {/* Conversations List */}
        <div className="conversations-list">
          {loading && conversations.length === 0 ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading conversations...</p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="empty-state">
              <p className="text-gray-500">No conversations found</p>
              <p className="text-sm text-gray-400 mt-2">
                Conversations will appear here when clients book appointments and receive SMS
              </p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={`${conversation.phoneNumber}-${conversation.conversationId}`}
                onClick={() => handleSelectConversation(conversation)}
                className={
                  selectedConversation?.conversationId === conversation.conversationId
                    ? 'conversation-item-active'
                    : 'conversation-item'
                }
              >
                <div className="conversation-item-header">
                  <h3 className="conversation-client-name">{conversation.clientName}</h3>
                  <span className={`status-badge ${STATUS_COLORS[conversation.status]}`}>
                    {STATUS_LABELS[conversation.status]}
                  </span>
                </div>
                <p className="conversation-phone">{maskPhone(conversation.phoneNumber)}</p>
                <p className="conversation-event">{conversation.eventTitle}</p>
                {conversation.clientResponseText && (
                  <p className="conversation-preview">
                    💬 {conversation.clientResponseText.substring(0, 60)}
                    {conversation.clientResponseText.length > 60 ? '...' : ''}
                  </p>
                )}
                <p className="conversation-timestamp">
                  Updated: {formatDate(conversation.updatedAt)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Conversation Detail */}
        <div className="conversation-detail">
          {selectedConversation ? (
            <>
              <div className="detail-header">
                <div>
                  <h3 className="detail-client-name">{selectedConversation.clientName}</h3>
                  <p className="detail-phone">{maskPhone(selectedConversation.phoneNumber)}</p>
                </div>
                <span className={`status-badge ${STATUS_COLORS[selectedConversation.status]}`}>
                  {STATUS_LABELS[selectedConversation.status]}
                </span>
              </div>

              <div className="detail-event-info">
                <h4 className="detail-event-title">{selectedConversation.eventTitle}</h4>
                <p className="detail-event-time">
                  📅 {formatDate(selectedConversation.eventStartTime)}
                </p>
              </div>

              {/* Conversation Timeline */}
              <div className="conversation-timeline">
                <h4 className="timeline-header">Conversation History</h4>
                
                {/* Initial Message */}
                {selectedConversation.initialMessageSent && (
                  <div className="timeline-message timeline-message-sent">
                    <div className="message-label">Initial Message (Auto)</div>
                    <div className="message-content">
                      Hey {selectedConversation.clientName.split(' ')[0]}, this is Maria from LocalSpot
                      <br /><br />
                      Will you send over a link to your website or GoogleMaps, so I can prep for our call?
                      <br /><br />
                      Also here's some more info before the call!
                    </div>
                    <div className="message-timestamp">
                      {selectedConversation.initialMessageSentAt && formatDate(selectedConversation.initialMessageSentAt)}
                    </div>
                  </div>
                )}

                {/* Follow-up Message */}
                {selectedConversation.followUpMessageSent && (
                  <div className="timeline-message timeline-message-sent">
                    <div className="message-label">Follow-up Message (Auto)</div>
                    <div className="message-content">
                      Hi, just wanted to double check that we are still good for the call? I'm trying to find your website or GoogleMaps to do some prep so I can best help you. Without them I'll have to cancel our call.
                    </div>
                    <div className="message-timestamp">
                      {selectedConversation.followUpMessageSentAt && formatDate(selectedConversation.followUpMessageSentAt)}
                    </div>
                  </div>
                )}

                {/* Client Response */}
                {selectedConversation.clientResponseText && (
                  <div className="timeline-message timeline-message-received">
                    <div className="message-label">Client Response</div>
                    <div className="message-content">
                      {selectedConversation.clientResponseText}
                    </div>
                    <div className="message-timestamp">
                      {selectedConversation.clientResponseAt && formatDate(selectedConversation.clientResponseAt)}
                    </div>
                  </div>
                )}

                {/* Admin Replies */}
                {selectedConversation.adminReplies && selectedConversation.adminReplies.length > 0 && (
                  selectedConversation.adminReplies.map((reply, index) => (
                    <div key={index} className="timeline-message timeline-message-sent">
                      <div className="message-label">Admin Reply</div>
                      <div className="message-content">{reply.message}</div>
                      <div className="message-timestamp">{formatDate(reply.sentAt)}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Reply Form */}
              <div className="reply-form">
                <h4 className="reply-form-header">Send Reply</h4>
                
                {replyStatus && (
                  <div className={replyStatus.type === 'success' ? 'reply-status-success' : 'reply-status-error'}>
                    {replyStatus.message}
                  </div>
                )}

                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="reply-textarea"
                  rows={4}
                  maxLength={1600}
                  disabled={sendingReply}
                />
                <div className="reply-form-footer">
                  <span className="reply-char-count">
                    {replyMessage.length}/1600 characters
                  </span>
                  <button
                    onClick={handleSendReply}
                    disabled={sendingReply || !replyMessage.trim()}
                    className="reply-send-button"
                  >
                    {sendingReply ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="detail-empty-state">
              <p className="text-gray-500">Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




