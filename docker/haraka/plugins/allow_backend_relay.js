'use strict';

/** Allow trusted Docker/internal clients to relay outbound mail. */
exports.register = function () {
  this.register_hook('connect', 'mark_trusted_relay');
};

exports.mark_trusted_relay = function (next, connection) {
  const ip = connection?.remote?.ip || '';
  const trustedPrefixes = ['127.', '10.', '172.16.', '172.17.', '172.18.', '172.19.', '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.', '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.', '192.168.'];
  if (trustedPrefixes.some((p) => ip.startsWith(p))) {
    connection.relaying = true;
    this.loginfo(`trusted relay enabled for ${ip}`);
  }
  next();
};
