module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@/app': './src/app',
            '@/shared': './src/shared',
            '@/features': './src/features',
            '@/lib': './src/lib',
            '@/config': './src/config',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/services': './src/services',
            '@/store': './src/store',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/constants': './src/constants',
          },
        },
      ],
    ],
  };
};
