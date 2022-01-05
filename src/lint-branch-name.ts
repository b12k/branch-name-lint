import { getBranchName } from './get-branch-name';

type Config = {
  template: string,
}

export default async (config: Config) => {
  const branchName = await getBranchName();
  console.log(config, branchName);
  return true;
}