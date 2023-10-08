import { runtime } from 'webextension-polyfill';

import './main';
import { DEMO_CHROME_EXT_HTML_STYLES, DEMO_CHROME_EXT_ID, TOGGLE_SIDEBAR_EVENT } from './constants';

console.log('CONTENT SCRIPTS INJECTED');

export const toggleRootHTMLStyles = (): void => {
  const stylesInDOM = document.getElementById(DEMO_CHROME_EXT_HTML_STYLES);

  if (!stylesInDOM) {
    const styles = document.createElement('style');
    styles.id = DEMO_CHROME_EXT_HTML_STYLES;

    styles.innerHTML = `
      html {
        width: calc(100% - 600px) !important;
      }
    `;

    document.head.appendChild(styles);

    return;
  }

  stylesInDOM.remove();
};

export const toggleSidebar = () => {
  const root = document.getElementById(DEMO_CHROME_EXT_ID);
  root?.classList.toggle('demoChromeExtHidden');
};

runtime.onMessage.addListener((request: Record<string, unknown>) => {
  switch (request.type) {
    case TOGGLE_SIDEBAR_EVENT:
      toggleRootHTMLStyles();
      toggleSidebar();
      break;
  }

  return true;
});
