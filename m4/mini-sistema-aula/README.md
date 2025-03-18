# Sistema de Inventário de Jogos

Um sistema de gerenciamento de inventário para jogos, implementado com JavaScript modular.

## Estrutura do Projeto

```typescript
js-course/m4/mini-sistema-aula/
├── css/
│   └── main.css
├── js/
│   ├── classes/
│   │   ├── Item.js
│   │   └── Inventario.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── notification.js
│   │   └── ui.js
│   ├── config.js
│   └── main.js
└── index.html
```

## Características

- Sistema de inventário completo para jogos
- Interface de usuário responsiva
- Gerenciamento de itens (adicionar, remover, equipar)
- Armazenamento local para persistência de dados
- Estatísticas detalhadas do inventário
- Filtragem de itens por tipo

## Como Executar

1. Clone o repositório:

 Faça download da pasta

   ```typescript
   mini-sistema-aula
   ```

2. Navegue até o diretório do projeto:

   ```typescript
   cd /mini-sistema-aula
   ```

3. Abra o arquivo `index.html` em um servidor web local ou usando a extensão Live Server do VSCode

## Módulos do Sistema

### Classes

- **Item.js**: Define a classe para itens do jogo (armas, poções, etc.)
- **Inventario.js**: Gerencia a coleção de itens, seus pesos e capacidades

### Utilitários

- **storage.js**: Gerencia o armazenamento local para persistência de dados
- **notification.js**: Sistema de notificações na interface
- **ui.js**: Funções para gerenciar a interface do usuário

### Configuração

- **config.js**: Armazena configurações globais do sistema
- **main.js**: Arquivo principal que inicializa a aplicação

## Personalização

O sistema é altamente personalizável. Para adicionar novos tipos de itens:

1. Edite o arquivo `config.js`
2. Adicione o novo tipo ao array `TIPOS_ITENS`
3. Defina o valor base para o novo tipo em `VALORES_BASE`
4. Se o novo tipo for equipável, adicione-o ao array `SLOTS_EQUIPAMENTO`

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
