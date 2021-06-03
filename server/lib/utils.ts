import { config } from "../config";
import crypto from "crypto";
import { TCode, IResponse } from "interface/response";
import path from "path";
import fs from "fs";

export default class Utils {
  public static isEmail(mail: string) {
    return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail);
  }
  public static isPhone(phone: string) {
    return /\d{3}-\d{8}|\d{4}-\{7,8}/.test(phone);
  }

  public static randomChar(): string {
    const chars = "123456780ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456780";
    const length = chars.length;
    return chars[Number((Math.random() * (length - 1)).toFixed())];
  }

  public static randomString(len = 16) {
    return crypto.randomBytes(len).toString("base64").replace(new RegExp("[`~%!@#^+-=''?~！@#￥……&——‘”“'？*()（），,。.、]", "g"), this.randomChar());
  }

  /**
   * 统一生成 response 的方法
   */
  public static generateResponse(code: TCode, message: string, data = {}): IResponse {
    return {
      code,
      message,
      data,
      timestamp: new Date().getTime(),
    };
  }

  public static async moveFile(destPath: string, originPath: string) {

  }

  public static async HandleUpload(files: any, folderName: string) {
    return new Promise((reslove, reject) => {
      const newFiles: { name: string; path: string }[] = [];
      files.map((file: any) => {
        const folder = path.resolve(config.publicStatic, folderName);
        fs.access(folder, (err) => {
          if (err) {
            fs.mkdir(folder, (err) => {
              if (err) {
                return reject(err);
              } else {
                Utils.moveFile(folder, file.path);
              }
            });
          } else {
            Utils.moveFile(folder, file.path);
          }
        });
      });
    });
  }
}
