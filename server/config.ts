import { IConfig } from "./interface/config";
import path from 'path';

export const config: IConfig = {
  environment: 'development',
  prot: 3001,
  localStatic: path.resolve(__dirname, 'public'),
  mongo: {
    host: '127.0.0.1',
    port: 27017,
    name: 'ys'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    pass: '',
  },
  jwtOrSession: {
    name: 'ys-sid',
    alg: 'sha256',
    secret: 'YS_COOKIE_SECRET',
    time: 1000 * 60 * 60 * 12,
    authFunc: 'cookie',
  }
}