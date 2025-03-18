import Item from './classes/Item.js';
import Inventario from './classes/Inventario.js';
import CONFIG from './config.js';
import { exibirNotificacao } from './utils/notification.js';
import { atualizarEstatisticas, renderizarItens, exibirEstatisticasAvancadas, gerenciarModalItem } from './utils/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização
    const inventario = new Inventario(CONFIG.CAPACIDADE_MAX_INVENTARIO);

    // Referências aos elementos do DOM
    const itemForm = document.getElementById('item-form');
    const filterType = document.getElementById('filter-type');

    /**
     * Atualiza a exibição do inventário
     */
    const atualizarInventario = () => {
        const tipoFiltrado = filterType.value;
        const itensFiltrados = inventario.findItemsByType(tipoFiltrado);
        renderizarItens(itensFiltrados, inventario);
        atualizarEstatisticas(inventario);
        exibirEstatisticasAvancadas(inventario);
    };

    // Configuração do gerenciador de modal
    gerenciarModalItem(inventario);

    // Event Listeners
    // Formulário para adicionar um novo item
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('item-name').value;
        const descricao = document.getElementById('item-description').value;
        const tipo = document.getElementById('item-type').value;
        const peso = document.getElementById('item-weight').value;

        const novoItem = new Item(nome, descricao, tipo, peso);

        // Verifica se tem espaço no inventário
        if (!inventario.podeAdicionarItem(novoItem)) {
            exibirNotificacao(`Não há espaço suficiente no inventário! (${inventario.espacoLivre().toFixed(1)} restante)`, true);
            return;
        }

        inventario.addItem(novoItem);

        // Limpa o formulário
        itemForm.reset();
        document.getElementById('item-weight').value = '1';

        // Atualiza a exibição
        atualizarInventario();

        // Notificação de sucesso
        exibirNotificacao(`Item "${nome}" adicionado com sucesso!`);
    });

    // Filtro por tipo
    filterType.addEventListener('change', atualizarInventario);

    // Atualizar inventário em resposta a eventos do modal
    document.addEventListener('atualizar-inventario', atualizarInventario);

    // Adicionar botão de limpar inventário
    const adicionarBotaoLimpar = () => {
        const inventoryContainer = document.querySelector('.inventory-container h2');
        if (!inventoryContainer) return;

        // Verifica se o botão já existe
        if (inventoryContainer.querySelector('.clear-btn')) return;

        const limparBtn = document.createElement('button');
        limparBtn.className = 'btn btn-danger clear-btn';
        limparBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Limpar Inventário';
        limparBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todo o inventário? Esta ação não pode ser desfeita.')) {
                inventario.limparInventario();
                atualizarInventario();
                exibirNotificacao('O inventário foi limpo com sucesso!');
            }
        });

        inventoryContainer.appendChild(limparBtn);
    };

    // Adicionar detecção de tamanho de tela para responsividade
    const verificarResponsividade = () => {
        const isMobile = window.innerWidth <= 576;
        document.body.classList.toggle('mobile-view', isMobile);

        // Ajuste para modal em dispositivos móveis
        const modal = document.getElementById('item-details-modal');
        if (modal && modal.style.display === 'block') {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxWidth = isMobile ? '95%' : '500px';
            }
        }
    };

    // Lidar com redimensionamento da janela
    window.addEventListener('resize', verificarResponsividade);

    // Garantir que o modal funcione bem em dispositivos móveis
    const modal = document.getElementById('item-details-modal');
    if (modal && 'ontouchstart' in window) {
        modal.addEventListener('touchstart', (e) => {
            if (e.target === modal) {
                const event = new CustomEvent('fechar-modal');
                document.dispatchEvent(event);
            }
        });
    }

    // Inicialização da interface
    adicionarBotaoLimpar();
    verificarResponsividade();
    atualizarInventario();

    // Adicionar alguns itens de exemplo se o inventário estiver vazio
    if (inventario.items.length === 0) {
        const itensIniciais = [
            new Item(
                "Espada de Aço",
                "Uma lâmina afiada que causa dano médio.",
                "Arma",
                3.5
            ),
            new Item(
                "Poção de Cura",
                "Recupera 50 pontos de vida quando consumida.",
                "Poção",
                0.5
            ),
            new Item(
                "Escudo de Carvalho",
                "Um escudo resistente que oferece proteção média.",
                "Defesa",
                5
            ),
            new Item(
                "Pão",
                "Um pão rústico que alivia um pouco a fome.",
                "Comida",
                0.3
            ),
            new Item(
                "Picareta",
                "Utilizada para minerar recursos.",
                "Ferramenta",
                4.2
            ),
            new Item(
                "Amuleto de Sorte",
                "Dizem que traz sorte para quem o possuir.",
                "Outro",
                0.2
            )
        ];

        itensIniciais.forEach(item => {
            inventario.addItem(item);
        });

        atualizarInventario();
    }
});
