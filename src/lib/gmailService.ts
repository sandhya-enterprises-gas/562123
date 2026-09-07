// Gmail API client-side service using OAuth Access Token
export interface GmailMessageItem {
  id: string;
  threadId: string;
  snippet: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  labels: string[];
  bodyHtml?: string;
  bodyText?: string;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  category?: 'order_confirmation' | 'tax_invoice' | 'safety_certificate' | 'general';
}

/**
 * Base64URL encode string (RFC 4648)
 */
function base64UrlEncode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Fetch list of recent messages with query filtering
 */
export async function fetchGmailMessages(
  accessToken: string,
  maxResults = 15,
  query = ''
): Promise<GmailMessageItem[]> {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  url.searchParams.set('maxResults', maxResults.toString());
  if (query) {
    url.searchParams.set('q', query);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch messages (${res.status})`);
  }

  const data = await res.json();
  const messageList: { id: string; threadId: string }[] = data.messages || [];

  // Fetch full details for the retrieved message IDs
  const detailedMessages: GmailMessageItem[] = [];
  for (const item of messageList.slice(0, 10)) {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=full`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        }
      );
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        const headers: { name: string; value: string }[] = msgData.payload?.headers || [];
        const getHeader = (name: string) =>
          headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

        let bodyText = '';
        if (msgData.snippet) {
          bodyText = msgData.snippet;
        }

        detailedMessages.push({
          id: msgData.id,
          threadId: msgData.threadId,
          snippet: msgData.snippet || '',
          from: getHeader('From'),
          to: getHeader('To'),
          subject: getHeader('Subject') || '(No Subject)',
          date: getHeader('Date'),
          labels: msgData.labelIds || [],
          bodyText
        });
      }
    } catch (e) {
      console.warn('Error fetching message details for', item.id, e);
    }
  }

  return detailedMessages;
}

/**
 * Send an email through Gmail API on behalf of the authorized user.
 * Note: Caller MUST verify explicit user confirmation prior to invoking this method.
 */
export async function sendGmailMessage(
  accessToken: string,
  payload: SendEmailPayload
): Promise<{ id: string; threadId: string }> {
  const boundary = 'foo_bar_baz_boundary_' + Date.now();

  const emailLines = [
    `To: ${payload.to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(payload.subject)))}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    payload.bodyText,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    payload.bodyHtml || `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">${payload.bodyText.replace(/\n/g, '<br/>')}</div>`,
    '',
    `--${boundary}--`
  ];

  const rawMime = emailLines.join('\r\n');
  const encodedMessage = base64UrlEncode(rawMime);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: encodedMessage
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to send email (${res.status})`);
  }

  return await res.json();
}
