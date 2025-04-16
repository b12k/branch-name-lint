export const parseArguments = () => process
  .argv
  .slice(2)
  .filter((arg) => arg.startsWith('--'))
  .map((arg) => arg.replace('--', ''))
  .reduce<Record<string, string>>((acc, next) => {
  const [key, value] = next.split('=');
  if (key && value) acc[key] = value;
  return acc;
}, {});