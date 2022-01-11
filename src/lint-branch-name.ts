import { match } from 'path-to-regexp';
import { Config } from './get-config';
import {
  branchProtectedError,
  branchNamePatternError,
} from './errors';

export const lintBranchName = (branchName: string, config: Config): boolean => {
  let { pattern } = config;
  const { params, prohibited } = config;

  if (prohibited.includes(branchName)) throw branchProtectedError;
  if (!pattern) return true;

  if (params) {
    Object
      .keys(params)
      .forEach((key: string) => {
        let values = params[key];

        if (!values) return;
        if (typeof values === 'string') values = [values];

        pattern = pattern.replace(`:${key}`, `:${key}(${values.join('|')})`);
      });
  }

  const branch = match(pattern, { decode: decodeURIComponent })(branchName);

  if (!branch) throw branchNamePatternError;

  return true;
};
