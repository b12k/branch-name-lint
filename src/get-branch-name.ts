import { exec } from 'child_process';

export const getBranchName = (): Promise<string> => new Promise((resolve, reject) => exec(
  'git rev-parse --abbrev-ref HEAD',
  (err, stdout) => err
    ? reject(err)
    : resolve(stdout.trim()),
),
);
