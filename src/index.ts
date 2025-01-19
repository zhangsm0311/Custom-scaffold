import { Command } from 'commander';
import { version } from '../package.json'
import { create } from './command/create';
import { update } from './command/update';

const program = new Command("zhang-cli");  //命令行指令的名称
program.version(version, '-v, --version');  //版本信息

program
    .command('update')
    .description("更新脚手架——zhangsm-cli")
    .action(async () => {
        await update()
    })

program
    .command('create')
    .description('创建一个新项目')
    .argument('[name]', '项目名称')
    .action(async (dirName) => {
        create(dirName);
    });

program.parse(); 