#!/usr/bin/env node

import chalk from 'chalk';

import { LintError } from './errors';
import { getConfig } from './get-config';
import { getBranchName } from './get-branch-name';
import { lintBranchName } from './lint-branch-name';

const RC_FILE_NAME = 'lintbranchname';

(async () => {
  try {
    const [config, branchName] = await Promise.all([
      getConfig(RC_FILE_NAME),
      getBranchName(),
    ]);
    lintBranchName(branchName, config);
  } catch (error: unknown) {
    if (error instanceof LintError) {
      console.log(chalk.whiteBright.bgRedBright.bold(`\n${error.message}\n`));
    } else {
      console.error(error);
    }

    process.exit(1);
  }
})();

