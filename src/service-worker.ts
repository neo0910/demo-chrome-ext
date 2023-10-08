import { commands, tabs } from 'webextension-polyfill';

import { TOGGLE_SIDEBAR_COMMAND, TOGGLE_SIDEBAR_EVENT } from './constants';

console.log('SERVICE-WORKER STARTED');

export const sendToggleSidebarEvent = async (): Promise<void> => {
  const [currentTab] = await tabs.query({ active: true, currentWindow: true });

  if (!currentTab.id) return;

  tabs.sendMessage(currentTab.id, {
    type: TOGGLE_SIDEBAR_EVENT,
  });
};

commands.onCommand.addListener((command: string): void => {
  switch (command) {
    case TOGGLE_SIDEBAR_COMMAND:
      sendToggleSidebarEvent();
      break;
  }
});
