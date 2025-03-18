/**
 * Arquivo de configurações globais do sistema
 */

const CONFIG = {
    // Capacidade máxima padrão do inventário
    CAPACIDADE_MAX_INVENTARIO: 100,

    // Valores base para cálculo de preço dos itens
    VALORES_BASE: {
        'Arma': 50,
        'Poção': 25,
        'Defesa': 40,
        'Comida': 10,
        'Ferramenta': 30,
        'Outro': 15
    },

    // Tipos de itens disponíveis
    TIPOS_ITENS: ['Arma', 'Poção', 'Defesa', 'Comida', 'Ferramenta', 'Outro'],

    // Slots de equipamento disponíveis
    SLOTS_EQUIPAMENTO: ['Arma', 'Defesa']
};

// Exporta o objeto de configuração
export default CONFIG;
