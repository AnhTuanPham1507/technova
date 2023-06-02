import { getConfig, getNumberConfig } from '../common/utils';

export default {
  host: getConfig('REDIS_HOST'),
  port: getNumberConfig('REDIS_PORT'),
  password: getConfig('REDIS_PASSWORD'),
  ttl: getNumberConfig('REDIS_TTL', 300),
};
