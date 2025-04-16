import { exec } from 'child_process';

const GIT_GET_CURR_BRANCH_NAME_CMD = 'git branch --show-current';

export const getBranchName = (): Promise<string> => new Promise((resolve, reject) => exec(
  GIT_GET_CURR_BRANCH_NAME_CMD,
  (err, stdout) => err
    ? reject(err)
    : resolve(stdout.trim()),
),
);
