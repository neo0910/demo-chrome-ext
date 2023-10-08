import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { DEMO_CHROME_EXT_ID } from './constants';
import App from './App.tsx';

export const root = document.createElement('div');
root.id = DEMO_CHROME_EXT_ID;
root.classList.add('demoChromeExtHidden');
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
