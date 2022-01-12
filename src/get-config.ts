import { cosmiconfig } from 'cosmiconfig';

export interface Config {
  pattern: string;
  params: Record<string, string[]>;
  prohibited: string[];
}

const defaultConfig: Config = {
  pattern: ':type/:name',
  params: {
    type: [
      'fix',
      'docs',
      'misc',
      'improve',
      'introduce',
    ],
    name: ['[a-z0-9-]+'],
  },
  prohibited: [
    'ci',
    'wip',
    'main',
    'test',
    'build',
    'master',
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
