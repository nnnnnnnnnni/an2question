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

  public static moveFile(destPath: string, originPath: string): Promise<void> {
    return new Promise((reslove, reject) => {
      fs.rename(originPath, destPath, err => {
        if(err) {
          reject(err)
        } else {
          reslove()
        }
      })
    })
  }

  /**
   * @param files 上传上来的文件数组
   * @param folderName 保存的文件夹名称
   * @returns 
   */
  public static async HandleUpload(files: any, folderName: string) {
    return new Promise((reslove, reject) => {
      const folder = path.resolve(config.publicStatic, folderName);
      const newFiles: { name: string; path: string }[] = [];
      files.map((file: any) => {
        const fileNameArr = file.name.split('.');
        const newFileName = `${fileNameArr[0]}.${Math.random()*10000000000}.${Utils.randomString(10)}.${new Date().getTime()}.${fileNameArr[1]}`
        const destFilePath = path.resolve(folder, newFileName);
        fs.access(folder, async (err) => {
          if (err) {
            fs.mkdir(folder, async (err) => {
              if (err) {
                return reject(err);
              } else {
                await Utils.moveFile(destFilePath, file.path);
                newFiles.push({name: fileNameArr[0], path: path.join(`/${folderName}`, newFileName)});
                if(newFiles.length == files.length) {
                  reslove(newFiles)
                }
              }
            });
          } else {
            await Utils.moveFile(destFilePath, file.path);
            newFiles.push({name: fileNameArr[0], path: path.join(`/${folderName}`, newFileName)});
            if(newFiles.length == files.length) {
              reslove(newFiles)
            }
          }
        });
      });
    });
  }
}
