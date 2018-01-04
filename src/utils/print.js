import chalk from 'chalk';

export default {
  error: (message, code, substitution = []) => {
    console.error(chalk.red(`${message}\n`), ...substitution);
    code && process.exit(code);
  },
  info: (message, code, substitution = []) => {
    console.info(chalk.cyanBright(`${message}\n`), ...substitution);
    code && process.exit(code);
  },
  warn: (message, code, substitution = []) => {
    console.warn(chalk.yellow(`${message}\n`), ...substitution);
    code && process.exit(code);
  },
  success: (message, code, substitution = []) => {
    console.log(chalk.green(`${message}\n`), ...substitution);
    code && process.exit(code);
  }
};
