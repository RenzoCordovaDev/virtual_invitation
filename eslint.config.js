import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    plugins: {
      // eslint-plugin-react-hooks aún exporta sus configs en formato legacy
      // (plugins como array de strings), incompatible con flat config — se
      // registra el plugin a mano y se reutilizan solo sus reglas.
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs['recommended-latest'].rules,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
)
