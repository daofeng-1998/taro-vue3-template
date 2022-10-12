module.exports = {
    extends: '@antfu',
    rules: {
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-console': 'off',
        'vue/html-indent': ['error', 4],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/indent': ['error', 4],
        // 'indent': ['error', 4],
        'semi': ['error', 'always'],
        'prefer-promise-reject-errors': 'off',
        'no-debugger': 'warn',
        'no-restricted-syntax': 'off',
    },
};
