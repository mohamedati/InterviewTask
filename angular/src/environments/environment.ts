 import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44342/',
  redirectUri: baseUrl,
  clientId: 'InterViewTask_App',
  responseType: 'code',
  scope: 'offline_access InterViewTask',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    name: 'MyProjectName',
    logoUrl: 'assets/icon.svg',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44342',
      rootNamespace: 'Acme.InterViewTask',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
