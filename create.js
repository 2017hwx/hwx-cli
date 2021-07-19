const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const Generator = require('./Generator.js');

const createDir = function (src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
    }
    callback(src, dst);
  });
};

const copyDir = function (src, dst) {
  let paths = fs.readdirSync(src);
  paths.forEach((p) => {
    let _src = src + '/' + p;
    let _dst = dst + '/' + p;
    console.log(_src, _dst);
    fs.stat(_src, (err, stats) => {
      if (err) throw err;
      if (stats.isDirectory()) {
        createDir(_src, _dst, copyDir);
      } else if (stats.isFile()) {
        let readStream = fs.createReadStream(_src);
        let writeStream = fs.createWriteStream(_dst);
        readStream.pipe(writeStream);
      }
    });
  });
};

module.exports = async function (name, option) {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  const to = path.join(cwd, name)
  //const  from = path.join(__dirname, 'templates', option.type, name);
  if (fs.existsSync(to)) {
    if (option.force) {
      await fs.remove(to)
    } else {
      console.log(`\r\n ${chalk.blue.bgRed.bold('File is Exist!')}\r\n`);
      return;
    }
  }
  const url = "https://github.com/2017hwx/hwx-core/main"
  const genertor = new Generator(name, to, url)
  genertor.create()
  //copyDir(from, to);
};
