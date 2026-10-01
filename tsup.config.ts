import { defineConfig } from 'tsup'

export default defineConfig([
  {
    // Module build for bundlers and Node: index.js, index.cjs and their type declarations
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    target: 'es2017',
    dts: true,
    sourcemap: true,
  },
  {
    // <script> tag build that defines window.pv, plus the stylesheet
    entry: { 'parallax-vanilla': 'src/global.ts' },
    format: ['iife'],
    outExtension: () => ({ js: '.js' }),
    target: 'es2017',
    minify: true,
    sourcemap: true,
  },
])
