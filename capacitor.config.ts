import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.knowmylabs.app',
  appName: 'KnowMyLabs',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
