#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
// const prompList = [
// 	{
// 		type:'input',
// 		message:'姓名',
// 		name:'name'
// 	},{
// 		type:'input',
// 		message:'手机号',
// 		name:'phone',
// 		validate:val=>{
// 			if(val.match(/\d{11}/g)){
// 				return true
// 			}
// 			return '请输入11位数字'
// 		}
// 	},{
// 		type:'confirm',
// 		message:'是否参加本次考核？',
// 		name:'assess',
// 		prefix:'前缀'
// 	},{
// 		type:'confirm',
// 		message:'是否同意本次考核须知？',
// 		name:'notice',
// 		suffix:'后缀',
// 		when:answers=>{
// 			return answers.assess
// 		}
// 	},{
// 		type:'list',
// 		message:'欢迎来到本次考核，请选择学历：',
// 		name:'eductionBg',
// 		choices:[
// 			"大专",
// 			"本科",
// 			"本科以上"
// 		],
// 		filter:val=>{//将选择的内容后面加学历
// 			return val+'学历'
// 		}
// 	},{
// 		type:'rawlist',
// 		message:'请选择你爱玩的游戏：',
// 		name:'game',
// 		choices:[
// 			"LOL",
// 			"DOTA",
// 			"PUBG"
// 		]
// 	},{
// 		type:'expand',
// 			message:'请选择你喜欢的水果：',
// 			name:'fruit',
// 			choices: [
// 			{
// 				key: "a",
// 				name: "Apple",
// 				value: "apple"
// 			},
// 			{
// 				key: "O",
// 				name: "Orange",
// 				value: "orange"
// 			},
// 			{
// 				key: "p",
// 				name: "Pear",
// 				value: "pear"
// 			}
// 		]
// 	},{
// 		type:'checkbox',
// 		message:'请选择你喜欢的颜色：',
// 		name:'color',
// 		choices:[
// 			{
// 				name: "red"
// 			},
// 			new inquirer.Separator(), // 添加分隔符
// 			{
// 				name: "blur",
// 				checked: true // 默认选中
// 			},
// 			{
// 				name: "green"
// 			},
// 			new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
// 			{
// 				name: "yellow"
// 			}
// 		]
// 	},{
// 		type:'password',
// 		message:'请输入你的游戏密码：',
// 		name:'pwd'
// 	}
// ]

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
        value: 'ts3',
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
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

program.on('--help', () => {
  // 使用 figlet 绘制 Logo
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
  // 新增说明信息
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
