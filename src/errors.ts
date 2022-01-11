export class LintError extends Error {
  constructor(message: string) {
    super(`[BranchNameLint] ${message}`);
  }
}

export const notGitRepoError = new LintError('Not a git repository');
export const branchProtectedError = new LintError('Protected branch');
export const branchNamePatternError = new LintError('Branch name doesnt match the pattern');
