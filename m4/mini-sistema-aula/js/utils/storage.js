import Item from '../classes/Item.js';

/**
 * Salva dados do inventário no localStorage
 * @param {Array} items - Itens do inventário
 * @param {Object} config - Configurações do inventário
 */
export function salvarInventario(items, config) {
    try {
        localStorage.setItem('inventario', JSON.stringify(items));
        localStorage.setItem('inventarioConfig', JSON.stringify(config));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
}

/**
 * Carrega dados do inventário do localStorage
 * @returns {Object} Objeto contendo itens e configurações
 */
export function carregarInventario() {
    try {
        const dados = localStorage.getItem('inventario');
        const config = localStorage.getItem('inventarioConfig');
        let items = [];

        if (dados) {
            const itensCarregados = JSON.parse(dados);
            items = itensCarregados.map(i => Object.assign(new Item(), i));
        }

        let configObj = {};
        if (config) {
            configObj = JSON.parse(config);
        }

        return { items, config: configObj };
    } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
        return { items: [], config: null };
    }
}
