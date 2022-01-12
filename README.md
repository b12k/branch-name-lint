<!-- markdownlint-disable -->

# **<center>Branch Name Lint</center>**

<center>
  <img src="./logo.png" alt="BranchNameLint">
  <p>Flexible git branch naming convention checker with some extra validating features</p>
  <a href="https://codeclimate.com/github/b12k/branch-name-lint/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/90a30843ffa0d0410003/maintainability">
  </a>
</center>

<!-- markdownlint-enable -->

## Usage

### Globally

```shell
> npm install branch-name-lint -g
> branch-name-lint
```

### As development dependency

```shell
> npm install branch-name-lint -D
> npm set-script lint:branch-name "branch-name-lint"
```

### Git hook

```shell
> npm install branch-name-lint simple-git-hooks -D
> npm set-script lint:branch-name "branch-name-lint"
```

`package.json`

```json
{
  "simple-git-hooks": {
    "pre-push": "npm run lint:branch-name"
  }
}
```

### No install

```shell
> npx branch-name-lint
```

## Configuration

### Config interface

```typescript
interface Config {
  pattern: string;
  params: Record<string, string[]>;
  prohibited: string[];
}
```

### User provided configuration

Under the hood **BranchNameLint** uses [cosmicconfig](https://www.npmjs.com/package/cosmiconfig)
to load its configuration.

You can create one of the following:

- `branchnamelint` property in the `package.json` file
- Extensionless "rc file" in `.json` or `.yaml` format
  - `.branchnamelintrc`
- "rc file" with `.json` or `.yaml` extensions
  - `.branchnamelintrc.json`
  - `.branchnamelintrc.yaml`
- "rc file" with `.js` extension
  - `.branchnamelintrc.js`
- ".config.js" file
  - `branchnamelint.config.js`

> don't forget to do `module.exports = {...}` in `.js` config files

**BranchNameLint** will merge found configuration with its defaults.

### Default configuration

```javascript
module.exports = {
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
```

### Linting

**BranchNameLint** uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
to check if branch name matches the `pattern` provided in config.

Firstly branch name will be checked if its `prohibited` or not. On the next step,
if `params` are provided, `pattern` parts will be modified/populated using
respective keys. For example:

```text
(default configuration)
:type/:name => :type(feature|fix|misc|docs)/:name([a-z0-9-]+)
```

Please refer to [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
docs for advanced patterns.

## Configuration recipes

### Only check for protected branches

```typescript
module.exports = {
  pattern: '', // or other falsy value: undefined | 0 | null | false
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
```

### Dot-separated username & issue id

`b12k.fix/example-branch-description/lbn-12345`

```typescript
module.exports = {
  pattern: ':username.:type/:desc/:issue',
  params: {
    type: [
      'feature',
      'fix',
      'misc',
      'docs',
    ],
    issue: ['lbn-[a-z0-9-]+'],
  },
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
```

### Scopes for monorepo

`feature/my-awesome-app/yet-another-great-feature`

```text
(imaginary monorepo structure)
root/
    apps/
        my-awesome-app
        another-great-app
    libs/
        very-useful-lib
        shared-lib
    .branchnamelintrc.js
```

```typescript
const fs = require('fs');

const readDirectories = (path) => fs
  .readdirSync(path, { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map(({ name }) => name);

module.exports = {
  pattern: ':type/:scope/:description',
  params: {
    type: [
      'feature',
      'fix',
      'misc',
      'docs',
    ],
    scope: readDirectories('./apps')
  },
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
```
