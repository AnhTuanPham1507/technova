import { getConfig } from '../common/utils';

export default {
    domain: getConfig('MOMO_DOMAIN'),
    partnerCode: getConfig('MOMO_PARTNER_CODE'),
    accessKey: getConfig('MOMO_ACCESS_KEY'),
    secretKey: getConfig('MOMO_SECRET_KEY'),
    ipnUrl: getConfig('MOMO_IPN_URL'),
    redirectUrl: getConfig('MOMO_REDIRECT_URL')
};
