export const parser = '@typescript-eslint/parser';
export const plugins = ['@typescript-eslint'];
export const rules = {
    'indent': ['error', 2], // Utiliser une indentation de 2 espaces
    'quotes': ['error', 'single'], // Utiliser des guillemets simples
    'semi': ['error', 'always'], // Toujours utiliser un point-virgule à la fin des déclarations
    'comma-dangle': ['error', 'always-multiline'],
};
  