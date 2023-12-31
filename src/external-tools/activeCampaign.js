/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */

const env = import.meta.env;

if (env.VITE_ACTIVE_CAMPAIGN_ENABLED === 'true') {
  (function (e, t, o, n, p, r, i) {
    e.visitorGlobalObjectAlias = n;
    e[e.visitorGlobalObjectAlias] =
      e[e.visitorGlobalObjectAlias] ||
      function () {
        (e[e.visitorGlobalObjectAlias].q = e[e.visitorGlobalObjectAlias].q || []).push(arguments);
      };
    e[e.visitorGlobalObjectAlias].l = new Date().getTime();
    r = t.createElement('script');
    r.src = o;
    r.async = true;
    i = t.getElementsByTagName('script')[0];
    i.parentNode.insertBefore(r, i);
  })(window, document, 'https://diffuser-cdn.app-us1.com/diffuser/diffuser.js', 'vgo');
  window.vgo('setAccount', `${env.VITE_ACTIVE_CAMPAIGN_ACCOUNT_NUMBER}`);
  window.vgo('setTrackByDefault', true);
  window.vgo('process');
}
