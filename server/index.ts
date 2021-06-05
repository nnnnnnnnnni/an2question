import Koa, { Context, Next } from "koa";
import { config } from "./config";
import { IConfig } from "./interface/config";
import { IRoute } from "./interface/route";
import CRouter from "./router/index";
import koaBody from "koa-body";
import koaStaic from "koa-static";
import cors from "koa2-cors";
import Router from "koa-router";
import mongoose from "mongoose";
import redis from "ioredis";
import Logger from "./logs";
import koaSession from "koa-session";
import { Redis } from "ioredis";
const allRouter = new CRouter();
const koaRouter = new Router<any, Context>();

export default class App {
  public app: Koa;
  public redisClient: Redis;
  private config: IConfig;
  constructor(config: IConfig) {
    this.app = new Koa();
    this.config = config;
    if (this.config.redis) {
      this.redisClient = this.redisConnect();
    }
    this.errorHandler();
    this.dbConnect();
    this.initializeMiddlewares();
    this.initializeRoutes(allRouter.getAllRoutes());
  }

  private initializeMiddlewares() {
    // 日志中间件
    this.app.use(Logger.infoLog);
    // 注册 解析
    this.app.use(
      koaBody({
        multipart: true,
        strict: false,
        formidable: {
          keepExtensions: true,
          uploadDir: this.config.uploadStatic,
          maxFieldsSize: 1024 * 1024 * 50
        },
      })
    );
    // 注册静态文件地址
    this.app.use(koaStaic(this.config.publicStatic));
    // 注册跨域
    this.app.use(
      cors({
        origin: "*",
      })
    );
    // 注册 session认证
    this.app.use(
      koaSession(
        {
          key: this.config.jwtOrSession.name,
          maxAge: this.config.jwtOrSession.time,
          overwrite: true,
          httpOnly: true,
          signed: false,
          renew: false,
          // secure: true,
        },
        this.app
      )
    );
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.map((route) => {
      if (route.methods == "GET") {
        koaRouter.get(route.path, ...route.Middlewares);
      } else if (route.methods == "POST") {
        koaRouter.post(route.path, ...route.Middlewares);
      } else if (route.methods == "PUT") {
        koaRouter.put(route.path, ...route.Middlewares);
      } else if (route.methods == "DELETE") {
        koaRouter.delete(route.path, ...route.Middlewares);
      } else {
        Logger.log("APP", `Invalid Restful Request: [methds: ${route.methods} path: ${route.path}]`, "info");
      }
    });
    this.app.use(koaRouter.routes()).use(koaRouter.allowedMethods());
  }

  private dbConnect() {
    mongoose
      .connect(`mongodb://${this.config.mongo.host}:${this.config.mongo.port}/${this.config.mongo.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        Logger.log("MONGO", `mongodb://${this.config.mongo.host}:${this.config.mongo.port}/${this.config.mongo.name} 已连接`, "info", true, false);
      })
      .catch((err) => {
        Logger.log("MONGO", `mongoose连接异常: ${err}`, "error");
      });
    mongoose.connection.on("disconnected", () => {
      Logger.log("MONGO", `数据库已经断开连接`, "info");
    });
  }

  private redisConnect() {
    const redisConnect = new redis(this.config.redis);
    redisConnect.connect(() => {
      this.app.context.redis = redisConnect;
      Logger.log("REDIS", `redis://${this.config.redis?.host}:${this.config.redis?.port} 已连接`, "info", true, false);
    });
    redisConnect.monitor().then((monitor) => {
      monitor.on("monitor", (_time, args, source, database) => {
        Logger.log("REDIS", `${source} ${args} ${database}`, "info", false, true);
      });
    });
    return redisConnect;
  }

  private errorHandler() {
    this.app.on("error", (err: Error, ctx: Context) => {
      Logger.log("APP", err.stack, "error");
      ctx.body = { code: 0, message: "服务器错误", data: {}, timestamp: new Date().getTime() };
    });
  }

  public start(cb?: Function) {
    this.app.listen(this.config.prot, () => {
      Logger.log("APP", `app start at port: ${this.config.prot}`, "info", true, false);
      if (cb != undefined) cb();
    });
  }
}

export const Server = new App(config);
Server.start();
