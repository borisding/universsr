import colors from 'colors';

// simple print colorful consoles util for universal usage
const print = {
  error(message, code) {
    console.error(colors.red(`${message}\n`));
    code && process && process.exit(code);
  },
  info(message, code) {
    console.info(colors.cyan(`${message}\n`));
    code && process && process.exit(code);
  },
  warn(message, code) {
    console.warn(colors.yellow(`${message}\n`));
    code && process && process.exit(code);
  },
  success(message, code) {
    console.log(colors.green(`${message}\n`));
    code && process && process.exit(code);
  }
};

export default print;
