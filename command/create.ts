import { input, select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import fs from 'fs-extra';
import path from 'path';


export interface TemplateInfo {
    name: string, // 模板名称
    downloadUrl: string, // 模板下载地址
    description: string, // 模板描述
    branch: string, // 分支
}

export const templates: Map<string, TemplateInfo> = new Map([
    ['vite-Vue3-TypeScirpt-Template', {
        name: 'vite-Vue3-TypeScirpt-Template',
        downloadUrl: 'git@gitee.com:sohucw/admin-pro.git',
        description: 'vue3技术栈开发 ',
        branch: 'dev11'
    }],
    ['vite-Temp', {
        name: 'vite-Vue3-TypeScirpt-Template',
        downloadUrl: 'https://gitee.com/zhang-saimeng/zhang-cli.git',
        description: 'vue3技术栈开发 ',
        branch: 'master'
    }]
])

export function isOverwrite (fileName: string) {
    console.warn(`${fileName}文件夹已存在`);
    return select({
        message: '是否覆盖？',
        choices: [
            { name: '覆盖', value: true },
            { name: '取消', value: false }
        ]
    })
    
}


export async function create(projectName?: string) {
    //初始化模板列表
    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
        const [name, info] = item;
        return {
            name,
            description: info.description,
            value: name
        }
    })
    if (!projectName) {
        projectName = await input({ message: '请输入项目名称：' })
    }

    const filePath = path.resolve(process.cwd(), projectName);
    if(fs.existsSync(filePath)){
        const run = await isOverwrite(projectName);
        if(run){
            await fs.remove(filePath); //删除重复的文件夹
        }else{
            return;
        }
    }


    const templateName = await select({
        message: '请选择模板：',
        choices: templateList
    })

    const info = templates.get(templateName);

    if (info) {
        clone(info.downloadUrl, projectName, ['-b', info.branch]);
    }

}