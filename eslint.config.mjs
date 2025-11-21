import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
        rules: {
            'react/display-name': 0,
            'react-hooks/exhaustive-deps': 0,
            'react/no-unescaped-entities': 0,
            'react/no-children-prop': 0,
            '@next/next/no-img-element': 0,
            '@typescript-eslint/no-explicit-any': 0

        }
    }
];

export default eslintConfig;
