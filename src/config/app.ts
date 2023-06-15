import { getConfig, getNumberConfig } from '../common/utils';

export default {
  host: getConfig('APP_HOST', '127.0.0.1'),
  port: getNumberConfig('APP_PORT', 3000),
  appEnv: getConfig('APP_ENV', 'development'),
  appMode: getConfig('APP_MODE', 'web'),
  enableDocument: getConfig('APP_ENABLE_DOCUMENTATION', true),
  timezone: getConfig('APP_TZ', 'UTC'),
  corsOrigins: getConfig('APP_CORS_ORIGINS'),
  jwtSecretKey: getConfig('APP_JWT_SECRET_KEY'),
  jwtExpiresIn: getConfig('APP_JWT_EXPIRES_IN')
};
