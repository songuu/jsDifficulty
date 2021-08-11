const execSync = require('child_process').execSync;
// eslint-disable-next-line import/no-extraneous-dependencies
const CLIEngine = require('eslint').CLIEngine;

const lintExtList = ['.js', '.jsx', '.ts', '.tsx'];
const prettierExtList = [...lintExtList, '.less', '.json', '.css'];
const cli = new CLIEngine();

let results;

try {
    execSync(`git add .`, { encoding: 'utf-8' });
    results = execSync(`git status -s`, { encoding: 'utf-8' });
} catch (e) {
    console.error(e.message);
    process.exit(1);
}

if (results) {
    const statusStr = results.trim();
    const statusList = statusStr.split('\n');
    const lintList = [];
    const prettierList = [];
    // eslint-disable-next-line no-useless-escape
    const reg = /\.[^\.]+$/;
    statusList.forEach(status => {
        if (status.startsWith('A') || status.startsWith('M') || status.startsWith('T')) {
            const ext = reg.exec(status)[0];
            const filePath = status
                .replace(/^M\s+/i, '')
                .replace(/^A\s+/i, '')
                .replace(/^T\s+/i, '');
            if (lintExtList.includes(ext)) {
                lintList.push(filePath);
            }
            if (prettierExtList.includes(ext)) {
                prettierList.push(filePath);
            }
        }
        // 如果是修改文件名称
        if (status.startsWith('R')) {
            const fileList = status.split(' -> ');
            if (fileList.length) {
                const filePath = fileList[1];
                const ext = reg.exec(filePath)[0];
                if (lintExtList.includes(ext)) {
                    lintList.push(filePath);
                }
                if (prettierExtList.includes(ext)) {
                    prettierList.push(filePath);
                }
            }
        }
    });
    if (prettierList.length) {
        console.log('prettier ...');
        try {
            execSync(`prettier --write ${prettierList.join(' ')}`);
            execSync(`git add .`, { encoding: 'utf-8' });
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }

    if (lintList.length) {
        try {
            console.log('lint ...');
            const cliResult = cli.executeOnFiles(lintList);
            if (cliResult.errorCount) {
                const resultList = cliResult.results;
                console.error(`${cliResult.errorCount} 个错误！`);
                resultList.forEach(result => {
                    const { messages, filePath, errorCount } = result;
                    if (errorCount > 0 && messages.length) {
                        console.error(`文件：${filePath}`);
                        messages.forEach(message => {
                            const { ruleId, message: messageStr, line, column } = message;
                            console.error(
                                `${line}行 ${column}列 错误消息：${messageStr} 触发规则：${ruleId}`
                            );
                        });
                    }
                });
                process.exit(1);
            }
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}

process.exit(0);
