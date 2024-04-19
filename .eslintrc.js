module.exports = {
  extends: ['next/core-web-vitals', 'eason', 'jest'],
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      extends: ['next/core-web-vitals', 'eason/typescript', 'jest'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
          },
        ],
      },
    },
  ],
};
