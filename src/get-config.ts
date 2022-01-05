import { cosmiconfigSync } from 'cosmiconfig';

export default (moduleName: string) => {
    const explorer = cosmiconfigSync(moduleName).search();

    if (!explorer) throw new Error('[BranchNameLint] Config not found');

    return explorer.config;
}