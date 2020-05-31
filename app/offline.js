import runtime from 'offline-plugin/runtime';

// only for production PWA purpose
export default function registerOffline() {
  return runtime.install({
    onInstalled() {
      console.info('App is ready for offline usage.');
    },
    onUpdateReady() {
      runtime.applyUpdate();
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
