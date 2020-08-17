/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const chalk = require('chalk');

function log(...args) {
  console.log(
    chalk.bold(chalk.gray(`[${new Date().toISOString()}]:`)),
    ...args
  );
}

module.exports = (req, _res, next) => {
  log(
    chalk.green('NEW REQUEST')
  );
  next();
};
