import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { dts } from 'rollup-plugin-dts';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getComponentsFolders } from './scripts/buildUtils';
import path from 'path';

const packageJson = require('./package.json');

const minify = () =>
  terser({
    format: {
      comments: false,
    },
  });

const commonPlugins = () => [
  PeerDepsExternalPlugin(),
  resolve(),
  commonjs(),
  postcss({
    extensions: ['.scss', '.sass', '.css'],
    sourceMap: true,
    minimize: true,
  }),
];

// Returns rollup configuration for a given component
function configForComponent(commonPlugins = [], folder) {
  return {
    input: `./components/${folder}/index.ts`,
    output: [
      {
        file: `dist/components/${folder}/index.esm.js`,
        exports: 'named',
        format: 'esm',
        banner: "'use client';",
        sourcemap: true,
      },
      {
        file: `dist/components/${folder}/index.cjs`,
        exports: 'named',
        format: 'cjs',
        banner: "'use client';",
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins,
      typescript2({
        tsconfig: './tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            rootDir: 'components',
            lib: ['dom', 'esnext'],
            declaration: false,
            declarationMap: false,
          },
          exclude: ['node_modules', 'dist', './index.ts', 'utils'],
        },
        useTsconfigDeclarationDir: false,
        clean: true,
      }),
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/components/${folder}`,
          private: true,
          main: './index.cjs',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/components/${folder}/`,
      }),
      minify(),
    ],
    external: (id) => !(path.isAbsolute(id) || id.startsWith('.')),
  };
}

//Creating .d.ts file for each component
function dtsForComponent(folder) {
  return {
    input: `./components/${folder}/index.ts`,
    output: [
      {
        file: `dist/components/${folder}/index.d.ts`,
        format: 'esm',
      },
    ],
    plugins: [dts()],
    external: (id) =>
      id.endsWith('.scss') || !(path.isAbsolute(id) || id.startsWith('.')),
  };
}

//Creating .d.ts file for other mentioned path starting with /
function dtsForOther(pathForFolder) {
  return {
    input: `.${pathForFolder}/index.ts`,
    output: [
      {
        file: `dist${pathForFolder}/index.d.ts`,
        format: 'esm',
      },
    ],
    plugins: [dts()],
    external: (id) =>
      id.endsWith('.scss') || !(path.isAbsolute(id) || id.startsWith('.')),
  };
}

export default [
  ...getComponentsFolders('./components').map((folder) =>
    configForComponent(commonPlugins(), folder),
  ),
  {
    input: './components/index.ts',
    output: [
      {
        file: 'dist/components/index.esm.js',
        format: 'esm',
        exports: 'named',
        banner: `'use client';`,
        sourcemap: true,
      },
      {
        file: 'dist/components/index.cjs',
        format: 'cjs',
        exports: 'named',
        banner: `'use client';`,
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          rootDir: 'components',
        },
      }),
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/components`,
          private: true,
          main: './index.cjs',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/components`,
      }),
      minify(),
    ],
    external: (id) => {
      if (!(path.isAbsolute(id) || id.startsWith('.'))) return true;
      if (id === './components/index.ts') return false;
      if (id.startsWith('./')) {
        return true;
      }
      return false;
    },
  },
  {
    input: './utils/index.ts',
    output: [
      {
        file: 'dist/utils/index.esm.js',
        format: 'esm',
        exports: 'named',
        banner: `'use client';`,
        sourcemap: true,
      },
      {
        file: 'dist/utils/index.cjs',
        format: 'cjs',
        exports: 'named',
        banner: `'use client';`,
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          rootDir: 'utils',
        },
      }),
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/utils`,
          private: true,
          main: './index.cjs',
          module: './index.esm.js',
          types: './index.d.ts',
        },
        outputFolder: `dist/utils`,
      }),
      minify(),
    ],
    external: [/node_modules/],
  },
  {
    input: './index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        exports: 'named',
        banner: `'use client';`,
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        exports: 'named',
        banner: `'use client';`,
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          rootDir: '',
        },
      }),
      minify(),
    ],
    external: (id) => {
      if (!(path.isAbsolute(id) || id.startsWith('.'))) return true;

      if (
        id === './components' ||
        id === './components/index' ||
        id === './utils' ||
        id === './utils/index' ||
        id.startsWith('./components/') ||
        id.startsWith('./utils/')
      ) {
        return true;
      }
      return false;
    },
  },
  //Creating .d.ts file for All components individually, index.ts, utils/index.ts and root index.ts
  ...getComponentsFolders('./components').map((folder) =>
    dtsForComponent(folder),
  ),
  dtsForOther('/components'),
  dtsForOther('/utils'),
  dtsForOther(''),
];
