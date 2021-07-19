// lib/Generator.js
const util = require('util')
const path = require('path')
const ora = require('ora')
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk');
const { nodeModules } = require('./lib/down-git-repo.js');
// 添加加载动画
// 添加加载动画
async function wrapLoading(fn, message, ...args) {
    console.log(...args)
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();

    try {
        // 执行传入方法 fn
        const result = await fn(...args);
        // 状态为修改为成功
        spinner.succeed();
        return result;
    } catch (error) {
        // 状态为修改为失败
        spinner.fail('Request failed, refetch ...')
    }
}


class Generator {
    constructor(name, targetDir, url) {
        this.requestUrl = url
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
        // 对 download-git-repo 进行 promise 化改造
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    async create() {
        // await wrapLoading(
        //     this.gitdown(), // 远程下载方法
        //     'waiting download template', // 加载提示信息
        //     this.requestUrl, // 参数1: 下载地址
        //     path.resolve(process.cwd(), this.targetDir)
        //     , { clone: false }) // 参数2: 创建位置
        nodeModules()([this.requestUrl])
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    }
}

module.exports = Generator;
