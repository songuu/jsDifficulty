#! /usr/bin/env node

// 可以运行的脚本

// 通过http启动一个服务 基于koa
const createServer = require("../index")
createServer().listen(4000, () => {
    console.log("服务启动在4000端口")
})