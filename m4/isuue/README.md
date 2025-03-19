# Manipulação de JSON em JavaScript

Este módulo apresenta exemplos práticos de manipulação de JSON em JavaScript, abordando desde conceitos básicos até implementações mais avançadas com classes.

## Conceitos Abordados

- Serialização e desserialização de JSON
- Validação de estruturas JSON
- Tratamento de erros
- Processamento de arrays em JSON
- Implementação de classes com métodos de serialização/desserialização

## Estrutura dos Exemplos

### Problema 1: Manipulação Básica de JSON
- Serialização de objetos para JSON
- Desserialização básica com tratamento de erros
- Testes com JSON válido e inválido

### Problema 2: Validação de Estrutura JSON
- Validação de propriedades obrigatórias
- Verificação de tipos de dados
- Tratamento estruturado de erros

### Problema 3: Processamento de Arrays JSON
- Trabalho com arrays dentro de objetos JSON
- Métodos de array (map, filter, reduce) para processar dados JSON
- Validação de estruturas mais complexas

### Problema 4: Classes e Serialização (Contexto Futebol)
- Implementação de classe com métodos de instância e estáticos
- Serialização e desserialização orientada a objetos
- Validação com tratamento de erros

### Problema 5: Classes e Serialização (Contexto Música)
- Padrões de projeto para trabalho com JSON em classes
- Formatação e exibição de dados específicos
- Validação robusta de tipos e estruturas

## Como Executar

1. Navegue até a pasta do problema desejado (problema1, problema2, etc.)
2. Execute o arquivo app.js usando Node.js:
   ```
   node app.js
   ```
3. Observe os resultados no console

## Exercícios Práticos

### Exercício 1: Modificação
Escolha um dos exemplos e adicione novas propriedades ao objeto principal. Ajuste as funções de validação para considerar essas novas propriedades.

### Exercício 2: Tratamento de Erros Avançado
Melhore o tratamento de erros de um dos problemas, adicionando verificações mais específicas e mensagens de erro mais descritivas.

### Exercício 3: Nova Implementação
Crie uma nova classe seguindo o padrão dos problemas 4 e 5, mas usando um contexto diferente (ex: produtos, filmes, jogos).

## Dicas Importantes

- JSON é uma string, não um objeto JavaScript
- Use try/catch ao trabalhar com JSON.parse() para evitar erros críticos
- Sempre valide a estrutura do JSON antes de acessar propriedades
- Para objetos complexos, considere criar classes com métodos especializados
