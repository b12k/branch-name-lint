import { cosmiconfig } from 'cosmiconfig';

export interface Config {
  pattern: string;
  params: Record<string, string | string[]>;
  protected: string[];
}

const defaultConfig: Config = {
  pattern: ':type/:name',
  params: {
    type: [],
    name: [],
  },
  protected: ['master', 'ci', 'release'],
};

export const getConfig = async (moduleName: string) => {
  const explorer = await cosmiconfig(moduleName).search();

  return {
    ...defaultConfig,
    ...explorer?.config as Config,
  };
};
