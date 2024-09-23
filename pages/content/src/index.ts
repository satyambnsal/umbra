console.log('content script loaded');

const site = window.location.hostname;

import { deserializeError } from 'serialize-error';
import { onMessage, sendMessage } from 'webext-bridge/content-script';
import { runtime } from 'webextension-polyfill';

onMessage('umbra_event', async ({ data }) => {
  const umbraEvent = new CustomEvent('umbra_event', {
    detail: data,
  });
  window.dispatchEvent(umbraEvent);
});

const inject = () => {
  if (typeof document === 'undefined') return;
  const script = document.createElement('script');
  script.src = runtime.getURL('/rpc.js');
  script.type = 'module';
  document.documentElement.appendChild(script);
  const channel = new BroadcastChannel('umbra');
  channel.addEventListener('message', async ({ data }) => {
    const origin = window.location.origin;
    const responseChannel = new BroadcastChannel(data.respondAt);
    if (!data.isUmbra) return responseChannel.postMessage({ error: 'Wrong context' });
    let response;
    try {
      const result: any = await sendMessage(data.method, { ...data.payload, origin }, 'background');
      if (result?.error) {
        response = { jsonrpc: '1.0', error: deserializeError(result.error) };
      } else {
        response = { jsonrpc: '1.0', result };
      }
      return responseChannel.postMessage({
        response,
      });
    } catch (error) {
      response = { jsonrpc: '1.0', error };
      return responseChannel.postMessage({
        response,
      });
    }
  });
};

inject();
