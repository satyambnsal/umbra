import 'webextension-polyfill';

console.log('background loaded');

import { onMessage, sendMessage } from 'webext-bridge/background';
import { runtime, tabs } from 'webextension-polyfill';
import { umbraRequestAccounts } from './handlers/index';

/**
 * Web Connector handlers
 */

onMessage('umbra_requestAccounts', umbraRequestAccounts);

/**
 * Runtime
 */
runtime.onConnect.addListener(async port => {
  if (port.name === 'prompt') {
    port.onDisconnect.addListener(async () => {
      console.log('Port disconnect event occured');
      await chrome.sidePanel.setOptions({
        path: 'index.html',
        enabled: true,
      });
    });
  }
});

runtime.onInstalled.addListener(async ({ reason }) => {
  console.log('On Installed Reason triggered', reason);
  // const provider = await MinaProvider.getInstance()
  // await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  // if (reason === "install") {
  //   if (!E2E_TESTING)
  //     await tabs.create({ url: "https://get.pallad.co/welcome" })
  // }
  // provider.on("pallad_event", async (data) => {
  //   const { permissions } = await chrome.storage.local.get("permissions")
  //   const urls = Object.entries(permissions)
  //     .filter(([_, allowed]) => allowed === "ALLOWED")
  //     .map(([url]) => `${url}/*`)
  //   const allowedTabs = await tabs.query({ url: urls })
  //   for (const tab of allowedTabs) {
  //     await sendMessage("pallad_event", data, `content-script@${tab.id}`)
  //   }
  // })
});
