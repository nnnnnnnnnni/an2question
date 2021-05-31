export interface IConfig {
  environment: "development" | "production";
  prot: number;
  publicStatic: string;
  uploadStatic: string;
  jwtOrSession: {
    name: string;
    alg: string;
    secret: string;
    time: number;
    authFunc: 'cookie' | 'jwt'
  };
  mongo: {
    host: string;
    port: number;
    name: string;
    pass?: string;
  };
  redis?: {
    host: string;
    port: number;
    pass?: string;
  };
}
