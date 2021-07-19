#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');


const prompList = [
  {
    type: 'list',
    message: '请选择语言版本：',
    name: 'type',
    choices: [
      {
        key: 'J',
        name: 'Vue2 JavaScript',
        value: 'js',
      },
      {
        key: 'T',
        name: 'Vue2 TypeScript',
        value: 'ts',
      },
      {
        key: 'T3',
        name: 'Vue3',
        value: 'vue3',
      },
    ],
  },
  {
    type: 'confirm',
    message: '是否覆盖已存在的目录？',
    name: 'force',
  },
];

program
  .version(`v${require('./package.json').version}`)
  .usage('<command> [option]');

program.on('--help', () => {
  console.log(
    '\r\n' +
      figlet.textSync('hwx', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      })
  );
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`);
});

program
  .command('init')
  .alias('i')
  .description('hwx-core初始化')
  //.option('-f, --force', '覆盖已存在的目录')
  .action((name, options) => {
    inquirer.prompt(prompList).then((answers) => {
      console.log(answers);
      require('./create.js')('hwx-core', answers);
    });
  });
program.parse(process.argv);
