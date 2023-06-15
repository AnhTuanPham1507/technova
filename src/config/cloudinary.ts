import { getConfig } from '../common/utils';

export default {
  name: getConfig('CLOUDINARY_NAME'),
  apiKey: getConfig('CLOUDINARY_API_KEY'),
  apiSecret: getConfig('CLOUDINARY_API_SECRET'),
};
