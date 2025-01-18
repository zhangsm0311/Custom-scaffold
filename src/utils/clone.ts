import simpleGit, { SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';


const logger = createLogger({
    spinner: {
        interval: 100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => {
            return chalk.green(item);
        })
    }
});

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 根目录
    binary: 'git',
    maxConcurrentProcesses: 6, // 最大并发进程数
}


export const clone = async (url: string, projectName: string, options: string[]) => {
    const git = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, projectName, options), '代码下载中.....', {
            estimate: 7000 // 预估下载时间
        })
        console.log(chalk.green('代码下载成功'));
        console.log(chalk.green('========请使用npm install 安装依赖========'));

    } catch (e) {
        console.error(chalk.red('代码下载失败'));
        console.log(e);
    }

}