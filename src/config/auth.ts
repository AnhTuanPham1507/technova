import { getConfig } from '../common/utils';

export default {
  jwtPrivateKey: getConfig('JWT_PRIVATE_KEY'),
  jwtExpirationTime: getConfig('JWT_EXPIRATION_TIME'),
  jwtRefreshKey: getConfig('JWT_REFRESH_KEY'),
};
