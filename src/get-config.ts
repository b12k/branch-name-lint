import { cosmiconfig } from 'cosmiconfig';

export interface Config {
  pattern: string;
  params: Record<string, string[]>;
  prohibited: string[];
}

const defaultConfig: Config = {
  pattern: '',
  params: {},
  prohibited: [
    'master',
    'main',
    'build',
    'test',
    'wip',
    'ci',
    'release',
  ],
};

export const getConfig = async (moduleName: string) => {
  const explorer = await cosmiconfig(moduleName).search();

  return {
    ...defaultConfig,
    ...explorer?.config as Config,
  };
};
