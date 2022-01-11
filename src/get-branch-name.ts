import { exec } from 'child_process';
import { notGitRepoError } from './errors';

export const getBranchName = (): Promise<string> => new Promise((resolve, reject) => exec(
  'git rev-parse --abbrev-ref HEAD',
  (err, stdout) => err
    ? reject(notGitRepoError)
    : resolve(stdout.trim()),
),
);
