// only for production PWA purpose
// using `require` to avoid runtime message (https://goo.gl/2Ca7NO) in development
export default function registerOffline() {
  const OfflineRuntime = require('offline-plugin/runtime');
  OfflineRuntime.install({
    onInstalled() {
      console.info('App is ready for offline usage.');
    },
    onUpdateReady() {
      OfflineRuntime.applyUpdate();
    },
    onUpdated() {
      // force browser to reload upon update
      window.location.reload();
    },
    onUpdateFailed() {
      console.log('Service Worker failed to update.');
    }
  });
}
