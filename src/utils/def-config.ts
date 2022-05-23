import { IQRConfig } from '../interfaces/QReactor';

/** Default QReactor initialization options */
const qrDefConfig: IQRConfig = {
  port: 4000,
  cors: false,
  session: {
    secret: 'l0lk3k',
    resave: true,
    saveUninitialized: true,
  },
};

export default qrDefConfig;
