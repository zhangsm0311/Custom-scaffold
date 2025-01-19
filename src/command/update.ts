import chalk from 'chalk';
import ora from 'ora';
import process from 'child_process';


const spinner = ora({
    text: "zhangsm-cli正在更新....",
    spinner: {
        interval: 100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => {
            return chalk.blue(item);
        })
    }
});
export function update() {
    spinner.start();
    process.exec('npm install zhangsm-cli@latest -g',(error) => {
         spinner.stop();
         if(!error){
            console.log(chalk.green('更新成功'));
         }else{
            console.log(chalk.red(error));
            
         }
    })
}