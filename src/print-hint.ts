import chalk from 'chalk';

import { Config } from './get-config';
import * as errors from './errors';

const gray = (message: string) => chalk.gray.bold(message);
const white = (message: string) => chalk.white(message);
const green = (message: string) => chalk.greenBright(message);

export const printHint = (error: errors.LintError, config: Config) => {
  const { pattern, params, prohibited } = config;
  const paramKeys = Object.keys(params);
  switch (true) {
    case error === errors.branchProtectedError:
      console.log(white('Prohibited branch names:'));
      console.log(green(`  ${prohibited.join(', ')}`));
      break;
    case error === errors.branchNamePatternError:
      console.log(gray('Branch name'));
      console.log(white('  pattern:'), green(`${pattern}`));
      if (paramKeys.length) {
        console.log(gray('Name params'));
        paramKeys.forEach((key) => {
          console.log(white(`  ${key}:`), green(`${params[key]?.join(', ')}`));
        });
      }
      break;
  }
};
