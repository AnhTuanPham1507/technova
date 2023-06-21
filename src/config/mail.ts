import { getConfig } from '../common/utils';

export default {
    host: getConfig('MAIL_HOST'),
    port: getConfig('MAIL_PORT'),
    user: getConfig('MAIL_USER'),
    password: getConfig('MAIL_PASSWORD'),
    redirectUrl: getConfig('MAIL_REDIRECT_URL')
};
