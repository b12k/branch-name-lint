#!/usr/bin/env node

import { LintError } from './errors';
import { getConfig } from './get-config';
import { printHint } from './print-hint';
import { printError } from './print-error';
import { getBranchName } from './get-branch-name';
import { lintBranchName } from './lint-branch-name';
import { parseArguments } from './parse-arguments';

const RC_FILE_NAME = 'branchnamelint';

const main = async () => {
  const { name } = parseArguments();
  const [config, branchName] = await Promise.all([
    getConfig(RC_FILE_NAME),
    name || getBranchName(),
  ]);

  try {
    lintBranchName(branchName, config);
  } catch (error: unknown) {
    if (!(error instanceof LintError)) throw error;

    printError(error.message.replace(':branchName:', branchName));
    printHint(error, config);
    process.exit(1);
  }
};

main().catch((error) => {
  printError('[LintBranchName] Unhandled error occurred');
  throw error;
});

