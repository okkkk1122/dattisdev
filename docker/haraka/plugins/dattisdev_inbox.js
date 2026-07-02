'use strict';

const http = require('http');
const { URL } = require('url');

exports.register = function () {
  this.register_hook('data', 'enable_body_parse');
  this.register_hook('data_post', 'capture_message');
  this.register_hook('queue', 'forward_to_api');
};

exports.enable_body_parse = function (next, connection) {
  connection.transaction.parse_body = true;
  next();
};

function extractBody(txn) {
  if (txn.notes.raw_body) return txn.notes.raw_body;
  const body = txn.body;
  if (!body) return '';
  if (body.bodytext) return body.bodytext;
  const parts = [];
  const walk = (node) => {
    if (node.bodytext) parts.push(node.bodytext);
    if (node.children?.length) node.children.forEach(walk);
  };
  walk(body);
  return parts.join('\n');
}

exports.capture_message = function (next, connection) {
  connection.transaction.notes.raw_body = extractBody(connection.transaction);
  next();
};

exports.forward_to_api = function (next, connection) {
  const txn = connection.transaction;
  const plugin = this;

  const mailDomain = (process.env.MAIL_DOMAIN || 'dattisdev.ir').toLowerCase();
  const localDomains = new Set([mailDomain, 'localhost']);
  const recipients = txn.rcpt_to || [];
  const localOnly =
    recipients.length > 0 &&
    recipients.every((r) => localDomains.has((r.host || '').toLowerCase()));

  if (!localOnly) {
    return next();
  }

  const apiUrl = process.env.HARAKA_INBOUND_URL || 'http://backend:3001/api/email/inbound';
  const secret = process.env.HARAKA_INBOUND_SECRET || 'change-me-inbound-secret';

  if (!apiUrl) {
    plugin.logerror('dattisdev_inbox: api_url not configured');
    return next(plugin.denydisconnect('mail service unavailable'));
  }

  const payload = JSON.stringify({
    secret,
    from: txn.mail_from?.address?.() || '',
    to: (txn.rcpt_to || []).map((r) => r.address()),
    subject: txn.header?.get('subject') || '(no subject)',
    body: extractBody(txn),
    receivedAt: new Date().toISOString(),
  });

  let parsed;
  try {
    parsed = new URL(apiUrl);
  } catch (err) {
    plugin.logerror(`dattisdev_inbox: invalid api_url — ${err.message}`);
    return next(plugin.denydisconnect('mail service unavailable'));
  }

  const req = http.request(
    {
      hostname: parsed.hostname,
      port: parsed.port || 80,
      path: `${parsed.pathname}${parsed.search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 15000,
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          plugin.loginfo(`dattisdev_inbox: stored — ${txn.header?.get('subject')}`);
          return next(OK);
        }
        plugin.logerror(`dattisdev_inbox: API ${res.statusCode} — ${data}`);
        return next(plugin.denydisconnect('temporarily unavailable'));
      });
    },
  );

  req.on('error', (err) => {
    plugin.logerror(`dattisdev_inbox: request failed — ${err.message}`);
    next(plugin.denydisconnect('temporarily unavailable'));
  });

  req.write(payload);
  req.end();
};
