import { join } from 'path';

import { getConfig, getNumberConfig } from '../common/utils';

export default {
  type: getConfig('DB_TYPE', 'postgres'),
  host: getConfig('DB_HOST', 'localhost'),
  port: getNumberConfig('DB_PORT', 5432),
  database: getConfig('DB_NAME'),
  username: getConfig('DB_APP_USER'),
  password: getConfig('DB_APP_PASS'),
  charset: 'utf8',
  entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
  synchronize: false,
  logging: getConfig('DB_LOGGING', 'error'),
  caPath: getConfig('DB_CA_PATH', ''),
};
