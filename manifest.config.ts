import { defineManifest } from '@crxjs/vite-plugin';

import { TOGGLE_SIDEBAR_COMMAND } from './src/constants';
import packageJson from './package.json';

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = packageJson.version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/);

export default defineManifest(async () => {
  return {
    background: {
      service_worker: 'src/service-worker.ts',
    },
    action: {
      default_title: 'Demo Google Chrome Extension',
    },
    commands: {
      [TOGGLE_SIDEBAR_COMMAND]: {
        description: 'Opens extension in sidebar',
        suggested_key: {
          default: 'Ctrl+Shift+1',
        },
      },
    },
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: [
          './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
          'src/content-scripts.ts',
        ],
      },
    ],
    manifest_version: 3,
    name: packageJson.name,
    permissions: ['browsingData', 'storage'],
    version_name: packageJson.version,
    version: `${major}.${minor}.${patch}.${label}`,
  };
});
