import { match } from 'path-to-regexp';
import { Config } from './get-config';
import {
  branchProtectedError,
  branchNamePatternError,
} from './errors';

export const lintBranchName = (branchName: string, config: Config): boolean => {
  if (config.protected.includes(branchName)) throw branchProtectedError;

  let path = config.pattern;
  Object
    .keys(config.params)
    .forEach((key: string) => {
      let values = config.params[key];

      if (!values) return;
      if (typeof values === 'string') values = [values];

      path = path.replace(`:${key}`, `:${key}(${values.join('|')})`);
    });

  console.log(path);

  const branch = match(path, { decode: decodeURIComponent })(branchName);

  if (!branch) throw branchNamePatternError;

  return true;
};
