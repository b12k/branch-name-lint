import chalk from 'chalk';

export const printError = (message: string) => console
  .log(chalk
    .whiteBright
    .bgRedBright
    .bold(`\n${message}\n`),
  );
