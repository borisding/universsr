// only for production PWA purpose
export default function registerOffline() {
  const runtime = require('offline-plugin/runtime');

  return runtime.install({
    onInstalled() {
      console.info('Your app is ready for offline support.');
    },
    onUpdateReady() {
      runtime.applyUpdate();
    },
    onUpdated() {
      window.location.reload();
    },
    onUpdateFailed() {
      console.log('SW failed to update.');
    }
  });
}
