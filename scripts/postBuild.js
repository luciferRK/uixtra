import path from 'path';
import fs from 'fs-extra';

const packagePath = process.cwd();
const distPath = path.join(packagePath, './dist');

const writeJson = (targetPath, obj) =>
  fs.writeFile(targetPath, JSON.stringify(obj, null, 2), 'utf8');

const logger = {
  info: (message) => console.log('INFO: ', message),
  error: (message) => console.error('ERROR: ', message),
  warning: (message) => console.warn('WARNING: ', message),
};

async function createPackageJson() {
  const packageData = await fs.readFile(
    path.resolve(packagePath, './package.json'),
    'utf8',
  );
  const { scripts, devDependencies, ...restPackageContent } =
    JSON.parse(packageData);
  const newPackageData = {
    ...restPackageContent,
    private: false,
    main: './index.cjs',
    module: './index.esm.js',
    types: './index.d.ts',
  };

  const targetPath = path.resolve(distPath, './package.json');

  await writeJson(targetPath, newPackageData);
  logger.info(`Created package.json in ${targetPath}`);
}

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(distPath, path.basename(file));
  await fs.copy(sourcePath, targetPath);
  logger.info(`Copied ${sourcePath} to ${targetPath}`);
}

async function copyFolder(folderName) {
  const sourcePath = path.resolve(packagePath, folderName);
  const targetPath = path.resolve(distPath, folderName);
  try {
    fs.cpSync(sourcePath, targetPath, { recursive: true });
    logger.info(`Copied ${sourcePath} to ${targetPath}`);
  } catch (err) {
    logger.error(`Something went wrong while copying ${folderName} - ${err}`);
  }
}

async function run() {
  try {
    await createPackageJson();
    await includeFileInBuild('./README.md');
    await includeFileInBuild('./versions.md');
    await includeFileInBuild('./LICENSE');
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

run();
