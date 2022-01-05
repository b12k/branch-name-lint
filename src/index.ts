import getConfig from './get-config';
import lintBranchName from './lint-branch-name';

const MODULE_NAME = 'branchnamelint';

(async () => {
  try {
    await lintBranchName(getConfig(MODULE_NAME));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

