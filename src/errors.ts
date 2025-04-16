export class LintError extends Error {
  constructor(message: string) {
    super(`[BranchNameLint] ${message}`);
  }
}
export const branchProtectedError = new LintError('Branch ":branchName:" is protected');
export const branchNamePatternError = new LintError('Branch name ":branchName:" doesnt match the pattern');
