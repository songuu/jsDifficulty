/*
 * @Author: songyu
 * @Date: 2021-08-11 20:36:44
 * @LastEditTime: 2021-08-11 20:36:45
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \美洽\test\build\utils.ts
 */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_ORIGIN: string;
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
