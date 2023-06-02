import { getNumberConfig } from '../common/utils';

export default {
  ttl: getNumberConfig('APP_RATE_LIMIT_TTL'),
  max: getNumberConfig('APP_RATE_LIMIT_MAX'),
};
