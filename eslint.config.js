import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'test/css'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['scripts/**/*.js'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly', URL: 'readonly' } },
  }
)
