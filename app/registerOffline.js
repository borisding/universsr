import * as OfflineRuntime from 'offline-plugin/runtime';

// only for production PWA purpose
export default function registerOffline() {
  return OfflineRuntime.install({
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
