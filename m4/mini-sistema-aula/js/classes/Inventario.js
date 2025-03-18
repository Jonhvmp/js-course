import Item from './Item.js';
import CONFIG from '../config.js';
import { salvarInventario, carregarInventario } from '../utils/storage.js';

/**
 * Classe que gerencia o inventário de itens
 */
class Inventario {
    /**
     * Cria um novo inventário
     * @param {number} capacidadeMaxima - Capacidade máxima de peso do inventário
     */
    constructor(capacidadeMaxima = CONFIG.CAPACIDADE_MAX_INVENTARIO) {
        this.items = [];
        this.capacidadeMaxima = capacidadeMaxima;
        this.itensEquipados = {};

        // Inicializa os slots de equipamento vazios
        CONFIG.SLOTS_EQUIPAMENTO.forEach(slot => {
            this.itensEquipados[slot] = null;
        });

        this.carregarDoLocalStorage();
    }

    /**
     * Adiciona um item ao inventário
     * @param {Item} item - Item a ser adicionado
     * @returns {boolean} true se o item foi adicionado, false se ultrapassou a capacidade
     */
    addItem(item) {
        if (!(item instanceof Item)) {
            throw new Error('O objeto não é uma instância válida de Item');
        }

        if (!this.podeAdicionarItem(item)) {
            return false;
        }

        this.items.push(item);
        this.salvarNoLocalStorage();
        return true;
    }

    /**
     * Remove um item do inventário pelo ID
     * @param {string} id - ID do item a ser removido
     * @returns {boolean} true se o item foi removido, false caso contrário
     */
    removeItemById(id) {
        const tamanhoAnterior = this.items.length;
        this.items = this.items.filter(item => item.id !== id);

        const removido = tamanhoAnterior > this.items.length;
        if (removido) {
            this.salvarNoLocalStorage();
        }

        return removido;
    }

    /**
     * Remove um item do inventário pelo nome
     * @param {string} nomeItem - Nome do item a ser removido
     * @returns {boolean} true se o item foi removido, false caso contrário
     */
    removeItem(nomeItem) {
        const tamanhoAnterior = this.items.length;
        this.items = this.items.filter(item => item.nome !== nomeItem);

        const removido = tamanhoAnterior > this.items.length;
        if (removido) {
            this.salvarNoLocalStorage();
        }

        return removido;
    }

    /**
     * Lista todos os itens do inventário
     * @returns {Array} Array com todos os itens
     */
    listItems() {
        return this.items;
    }

    /**
     * Busca um item por ID
     * @param {string} id - ID do item
     * @returns {Item|null} O item encontrado ou null
     */
    findItemById(id) {
        return this.items.find(item => item.id === id) || null;
    }

    /**
     * Busca itens por tipo
     * @param {string} tipo - Tipo do item
     * @returns {Array} Array com os itens do tipo especificado
     */
    findItemsByType(tipo) {
        if (!tipo) {
            return this.items;
        }
        return this.items.filter(item => item.tipo === tipo);
    }

    /**
     * Calcula o peso total do inventário
     * @returns {number} Peso total
     */
    totalWeight() {
        return this.items.reduce((total, item) => total + item.peso, 0);
    }

    /**
     * Verifica se adicionar um item excederá a capacidade máxima do inventário
     * @param {Item} item - Item a ser avaliado
     * @returns {boolean} true se o item puder ser adicionado, false caso contrário
     */
    podeAdicionarItem(item) {
        return this.totalWeight() + item.peso <= this.capacidadeMaxima;
    }

    /**
     * Calcula o espaço livre no inventário
     * @returns {number} Espaço livre em unidades de peso
     */
    espacoLivre() {
        return Math.max(0, this.capacidadeMaxima - this.totalWeight());
    }

    /**
     * Equipa um item ao personagem
     * @param {string} itemId - ID do item a ser equipado
     * @returns {boolean} true se o item foi equipado, false caso contrário
     */
    equiparItem(itemId) {
        const item = this.findItemById(itemId);

        if (!item || !item.isEquipavel()) {
            return false;
        }

        // Desequipa o item atual se houver um
        if (this.itensEquipados[item.tipo]) {
            this.itensEquipados[item.tipo] = null;
        }

        this.itensEquipados[item.tipo] = itemId;
        this.salvarNoLocalStorage();
        return true;
    }

    /**
     * Desequipa um item do personagem
     * @param {string} tipo - Tipo do item a ser desequipado
     * @returns {boolean} true se o item foi desequipado, false caso contrário
     */
    desequiparItem(tipo) {
        if (!this.itensEquipados[tipo]) {
            return false;
        }

        this.itensEquipados[tipo] = null;
        this.salvarNoLocalStorage();
        return true;
    }

    /**
     * Verifica se um item está equipado
     * @param {string} itemId - ID do item
     * @returns {boolean} true se o item está equipado, false caso contrário
     */
    itemEstaEquipado(itemId) {
        return Object.values(this.itensEquipados).includes(itemId);
    }

    /**
     * Calcula o valor total do inventário
     * @returns {number} Valor total
     */
    valorTotal() {
        return this.items.reduce((total, item) => total + item.calcularValor(), 0);
    }

    /**
     * Calcula estatísticas do inventário
     * @returns {Object} Objeto com estatísticas
     */
    calcularEstatisticas() {
        const porTipo = {};
        let itemMaisPesado = null;
        let itemMaisCaro = null;

        this.items.forEach(item => {
            // Contagem por tipo
            porTipo[item.tipo] = (porTipo[item.tipo] || 0) + 1;

            // Item mais pesado
            if (!itemMaisPesado || item.peso > itemMaisPesado.peso) {
                itemMaisPesado = item;
            }

            // Item mais caro
            const valorItem = item.calcularValor();
            if (!itemMaisCaro || valorItem > itemMaisCaro.valor) {
                itemMaisCaro = {
                    item: item,
                    valor: valorItem
                };
            }
        });

        return {
            totalItens: this.items.length,
            pesoTotal: this.totalWeight(),
            espacoUtilizado: (this.totalWeight() / this.capacidadeMaxima) * 100,
            distribuicaoPorTipo: porTipo,
            itemMaisPesado: itemMaisPesado,
            itemMaisCaro: itemMaisCaro?.item,
            valorTotal: this.valorTotal()
        };
    }

    /**
     * Salva o inventário no localStorage
     */
    salvarNoLocalStorage() {
        salvarInventario(this.items, {
            capacidadeMaxima: this.capacidadeMaxima,
            itensEquipados: this.itensEquipados
        });
    }

    /**
     * Carrega o inventário do localStorage
     */
    carregarDoLocalStorage() {
        const { items, config } = carregarInventario();

        if (items && items.length) {
            this.items = items;
        }

        if (config) {
            this.capacidadeMaxima = config.capacidadeMaxima || CONFIG.CAPACIDADE_MAX_INVENTARIO;
            this.itensEquipados = config.itensEquipados || {};

            // Garante que todos os slots existam
            CONFIG.SLOTS_EQUIPAMENTO.forEach(slot => {
                if (this.itensEquipados[slot] === undefined) {
                    this.itensEquipados[slot] = null;
                }
            });
        }
    }

    /**
     * Limpa todo o inventário
     */
    limparInventario() {
        this.items = [];
        CONFIG.SLOTS_EQUIPAMENTO.forEach(slot => {
            this.itensEquipados[slot] = null;
        });
        this.salvarNoLocalStorage();
    }
}

export default Inventario;
