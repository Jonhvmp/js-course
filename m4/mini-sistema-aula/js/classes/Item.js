import CONFIG from '../config.js';

/**
 * Classe que representa um item do jogo
 */
class Item {
    /**
     * Cria uma instância de Item
     * @param {string} nome - Nome do item
     * @param {string} descricao - Descrição do item
     * @param {string} tipo - Tipo do item (ex: "Arma", "Poção", "Defesa")
     * @param {number} peso - Peso do item
     */
    constructor(nome, descricao, tipo, peso) {
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
        this.peso = parseFloat(peso);
        this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Retorna os detalhes do item em formato de string
     * @returns {string} String com os detalhes do item
     */
    getDetalhes() {
        return `
            Item: ${this.nome}
            Descrição: ${this.descricao}
            Tipo: ${this.tipo}
            Peso: ${this.peso}
        `;
    }

    /**
     * Verifica se o item é equipável
     * @returns {boolean} true se o item puder ser equipado
     */
    isEquipavel() {
        return CONFIG.SLOTS_EQUIPAMENTO.includes(this.tipo);
    }

    /**
     * Calcula o valor do item baseado no seu tipo e peso
     * @returns {number} O valor calculado do item
     */
    calcularValor() {
        return Math.round(CONFIG.VALORES_BASE[this.tipo] * this.peso);
    }
}

export default Item;
