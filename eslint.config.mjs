import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    typescript: true,
    formatters: true,
    type: 'lib',
  },
  {
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  {
    files: ['**/**/*.yml'],
    rules: {
      'yaml/plain-scalar': 'off',
      'yaml/indent': 'off',
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'app/**/*.tsx', '**/*.tsx'],
    rules: {
      'ts/explicit-function-return-type': 'off',
      'ts/no-use-before-define': 'off',
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'style/indent': ['error', 2],
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'warn',
      'style/max-len': ['error', { code: 120, tabWidth: 4 }],
      'unused-imports/no-unused-imports': 'error',
      'no-console': 'off',
      'perfectionist/sort-objects': ['error', {
        type: 'line-length',
        order: 'asc',
      }],
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          ignoreCase: false,
          newlinesBetween: 'never',
          groups: [
          ],
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          ignoreAlias: false,
          ignoreCase: true,
          specialCharacters: 'keep',
          groupKind: 'mixed',
          partitionByNewLine: false,
          partitionByComment: false,
        },
      ],
    },
  },
)
