module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipo de commit
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'docs', // Documentação
        'style', // Formatação (sem mudança de código)
        'refactor', // Refatoração de código
        'perf', // Melhoria de performance
        'test', // Adição/correção de testes
        'build', // Sistema de build
        'ci', // Integração contínua
        'chore', // Tarefas de manutenção
        'revert', // Reversão de commit
      ],
    ],
    // Tamanho do subject
    'subject-max-length': [2, 'always', 100],
    'subject-min-length': [2, 'always', 3],
    // Case
    'subject-case': [2, 'always', 'sentence-case'],
    // Linha em branco após o subject
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    // Tamanho da linha
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
};
