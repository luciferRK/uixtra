import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import typescript2 from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getComponentsFolders } from './scripts/buildUtils';
import path from 'path';

const packageJson = require('./package.json');

const commonPlugins = () => [
  PeerDepsExternalPlugin(),
  resolve(),
  commonjs(),
  postcss({
    extensions: ['.scss', '.sass', '.css'],
    sourceMap: true,
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
      },
      {
        file: `dist/components/${folder}/index.cjs.js`,
        exports: 'named',
        format: 'cjs',
        banner: "'use client';",
      },
    ],
    plugins: [
      ...commonPlugins,
      typescript2({
        tsconfig: './tsconfigForComp.json',
        useTsconfigDeclarationDir: true,
      }),
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/components/${folder}`,
          private: true,
          main: './index.cjs.js',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/components/${folder}/`,
      }),
    ],
    external: (id) => !(path.isAbsolute(id) || id.startsWith('.')),
  };
}

export default [
  //Build all components in ./components/*
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
      },
      {
        file: 'dist/components/index.cjs.js',
        format: 'cjs',
        exports: 'named',
        banner: `'use client';`,
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
          main: './index.cjs.js',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/components`,
      }),
    ],
    external: (id) => !(path.isAbsolute(id) || id.startsWith('.')),
  },
  {
    input: './utils/index.ts',
    output: [
      {
        file: 'dist/utils/index.esm.js',
        format: 'esm',
        exports: 'named',
        banner: `'use client';`,
      },
      {
        file: 'dist/utils/index.cjs.js',
        format: 'cjs',
        exports: 'named',
        banner: `'use client';`,
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
          main: './index.cjs.js',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/utils`,
      }),
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
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        exports: 'named',
        banner: `'use client';`,
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
    ],
    external: (id) => !(path.isAbsolute(id) || id.startsWith('.')),
  },
];
