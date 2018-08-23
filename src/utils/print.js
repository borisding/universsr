import chalk from 'chalk';

const print = {
  error(message, code) {
    console.error(chalk.red(`${message}\n`));
    code && process.exit(code);
  },
  info(message, code) {
    console.info(chalk.cyanBright(`${message}\n`));
    code && process.exit(code);
  },
  warn(message, code) {
    console.warn(chalk.yellow(`${message}\n`));
    code && process.exit(code);
  },
  success(message, code) {
    console.log(chalk.green(`${message}\n`));
    code && process.exit(code);
  }
};

export default print;
