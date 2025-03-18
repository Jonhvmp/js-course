import { exibirNotificacao } from './notification.js';

/**
 * Gerencia o modal de detalhes do item
 * @param {Inventario} inventario - O inventário
 */
export function gerenciarModalItem(inventario) {
    const modal = document.getElementById('item-details-modal');
    if (!modal) return;

    const modalItemName = document.getElementById('modal-item-name');
    const modalItemDescription = document.getElementById('modal-item-description');
    const modalItemType = document.getElementById('modal-item-type');
    const modalItemWeight = document.getElementById('modal-item-weight');
    const modalDeleteBtn = document.getElementById('modal-delete-btn');
    const closeModal = modal.querySelector('.close');

    let itemSelecionado = null;

    // Função para abrir o modal
    function abrirModal(item) {
        itemSelecionado = item;

        const itemEquipado = inventario.itemEstaEquipado(item.id);
        const podeSerEquipado = item.isEquipavel();

        modalItemName.textContent = item.nome;
        modalItemDescription.textContent = item.descricao;
        modalItemType.textContent = item.tipo;
        modalItemWeight.textContent = `${item.peso.toFixed(1)} kg`;

        // Limpa os detalhes adicionais anteriores
        const detalhesAntigos = document.querySelectorAll('.modal-details p:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))');
        detalhesAntigos.forEach(p => p.remove());

        // Limpa botões existentes exceto o de remover
        const botoesAntigos = modal.querySelectorAll('.btn:not(#modal-delete-btn)');
        botoesAntigos.forEach(btn => btn.remove());

        // Adiciona valor do item
        const valorItem = item.calcularValor();
        const valorEl = document.createElement('p');
        valorEl.innerHTML = `<strong>Valor:</strong> <span>${valorItem} <i class="fas fa-coins"></i></span>`;
        document.querySelector('.modal-details').appendChild(valorEl);

        // Se o item puder ser equipado, adiciona o botão apropriado
        if (podeSerEquipado) {
            const equipBtn = document.createElement('button');
            equipBtn.className = `btn ${itemEquipado ? 'btn-warning' : 'btn-success'}`;
            equipBtn.innerHTML = itemEquipado ?
                '<i class="fas fa-times-circle"></i> Desequipar' :
                '<i class="fas fa-shield-alt"></i> Equipar';

            equipBtn.addEventListener('click', () => {
                if (itemEquipado) {
                    inventario.desequiparItem(item.tipo);
                    exibirNotificacao(`Item "${item.nome}" foi desequipado.`);
                } else {
                    inventario.equiparItem(item.id);
                    exibirNotificacao(`Item "${item.nome}" foi equipado.`);
                }
                fecharModal();
                const event = new CustomEvent('atualizar-inventario');
                document.dispatchEvent(event);
            });

            // Insere antes do botão de remover
            modalDeleteBtn.parentNode.insertBefore(equipBtn, modalDeleteBtn);
        }

        modal.style.display = 'block';

        // Adiciona classe para animação
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            itemSelecionado = null;
        }, 300);
    }

    // Event listener para abrir modal com evento customizado
    document.addEventListener('abrir-modal-item', (event) => {
        const item = inventario.findItemById(event.detail.itemId);
        if (item) {
            abrirModal(item);
        }
    });

    // Event listener para fechar modal com evento customizado
    document.addEventListener('fechar-modal', () => {
        fecharModal();
    });

    // Botão de fechar modal
    closeModal.addEventListener('click', fecharModal);

    // Clicar fora do modal para fechar
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Botão de deletar item
    modalDeleteBtn.addEventListener('click', () => {
        if (!itemSelecionado) return;

        const nomeItem = itemSelecionado.nome;
        inventario.removeItemById(itemSelecionado.id);
        fecharModal();

        const event = new CustomEvent('atualizar-inventario');
        document.dispatchEvent(event);

        // Notificação de remoção
        exibirNotificacao(`Item "${nomeItem}" removido do inventário.`);
    });
}

/**
 * Atualiza as estatísticas de inventário
 * @param {Inventario} inventario - O inventário
 */
export function atualizarEstatisticas(inventario) {
    const pesoTotal = inventario.totalWeight();
    const capacidadeMaxima = inventario.capacidadeMaxima;
    const porcentagemUsada = (pesoTotal / capacidadeMaxima) * 100;

    const totalWeightElement = document.getElementById('total-weight');
    const totalItemsElement = document.getElementById('total-items');

    if (totalWeightElement) {
        totalWeightElement.textContent = `${pesoTotal.toFixed(1)} / ${capacidadeMaxima}`;
        totalWeightElement.title = `${porcentagemUsada.toFixed(1)}% da capacidade utilizada`;

        // Atualiza a cor baseado na capacidade
        if (porcentagemUsada > 90) {
            totalWeightElement.style.color = 'var(--danger)';
        } else if (porcentagemUsada > 70) {
            totalWeightElement.style.color = 'var(--warning)';
        } else {
            totalWeightElement.style.color = '';
        }
    }

    if (totalItemsElement) {
        totalItemsElement.textContent = inventario.items.length;
    }

    // Adicionar barra de progresso ao header se não existir
    let progressBar = document.querySelector('.weight-progress');
    if (!progressBar) {
        const statsContainer = document.querySelector('.stats .stat-item:first-child');
        if (statsContainer) {
            progressBar = document.createElement('div');
            progressBar.className = 'weight-progress';
            progressBar.innerHTML = '<div class="weight-progress-bar"></div>';
            statsContainer.appendChild(progressBar);
        }
    }

    // Atualiza a barra de progresso
    if (progressBar) {
        const progressBarFill = progressBar.querySelector('.weight-progress-bar');
        if (progressBarFill) {
            progressBarFill.style.width = `${Math.min(100, porcentagemUsada)}%`;

            if (porcentagemUsada > 90) {
                progressBarFill.style.backgroundColor = 'var(--danger)';
            } else if (porcentagemUsada > 70) {
                progressBarFill.style.backgroundColor = 'var(--warning)';
            } else {
                progressBarFill.style.backgroundColor = 'var(--success)';
            }
        }
    }
}

/**
 * Renderiza os itens do inventário na interface
 * @param {Array} items - Array de itens a serem exibidos
 * @param {Inventario} inventario - O inventário
 */
export function renderizarItens(items, inventario) {
    const inventoryList = document.getElementById('inventory-list');
    if (!inventoryList) return;

    // Limpa a lista atual
    inventoryList.innerHTML = '';

    if (items.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'Seu inventário está vazio. Adicione itens!';
        inventoryList.appendChild(emptyMessage);
        return;
    }

    // Adiciona cada item à lista
    items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'item-card';
        itemEl.dataset.id = item.id;

        // Verifica se o item está equipado
        const equipado = inventario.itemEstaEquipado(item.id);
        if (equipado) {
            itemEl.classList.add('equipado');
        }

        const valorItem = item.calcularValor();
        const podeSerEquipado = item.isEquipavel();

        itemEl.innerHTML = `
            <h3>${item.nome} ${equipado ? '<i class="fas fa-check-circle equipado-icon"></i>' : ''}</h3>
            <span class="item-type type-${item.tipo}">${item.tipo}</span>
            <div class="item-weight">${item.peso.toFixed(1)}</div>
            <div class="item-description">${item.descricao}</div>
            ${podeSerEquipado ? '<div class="item-equip-flag"><i class="fas fa-shield-alt"></i></div>' : ''}
            <div class="item-value">${valorItem} <i class="fas fa-coins"></i></div>
        `;

        // Adiciona evento para abrir modal ao clicar
        itemEl.addEventListener('click', () => {
            const event = new CustomEvent('abrir-modal-item', {
                detail: { itemId: item.id }
            });
            document.dispatchEvent(event);
        });

        inventoryList.appendChild(itemEl);
    });
}

/**
 * Exibe estatísticas avançadas do inventário
 * @param {Inventario} inventario - O inventário
 */
export function exibirEstatisticasAvancadas(inventario) {
    // Verificar se o elemento de estatísticas avançadas existe ou criar um
    let statsSection = document.getElementById('advanced-stats');
    if (!statsSection) {
        const inventarioContainer = document.querySelector('.inventory-container');
        if (!inventarioContainer) return;

        statsSection = document.createElement('div');
        statsSection.id = 'advanced-stats';
        statsSection.className = 'advanced-stats';

        // Adiciona após o container de inventário
        inventarioContainer.appendChild(statsSection);
    }

    // Obter estatísticas atualizadas
    const stats = inventario.calcularEstatisticas();

    // Constrói o conteúdo HTML
    let statHtml = '<h3>Estatísticas do Inventário</h3>';
    statHtml += '<div class="stat-grid">';

    // Valor total
    statHtml += `
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-coins"></i></div>
            <div class="stat-value">${stats.valorTotal}</div>
            <div class="stat-label">Valor Total</div>
        </div>
    `;

    // Espaço utilizado
    statHtml += `
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-percentage"></i></div>
            <div class="stat-value">${stats.espacoUtilizada?.toFixed(1) || 0}%</div>
            <div class="stat-label">Capacidade Utilizada</div>
        </div>
    `;

    // Item mais pesado
    if (stats.itemMaisPesado) {
        statHtml += `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-weight-hanging"></i></div>
                <div class="stat-value">${stats.itemMaisPesado.nome}</div>
                <div class="stat-label">Item Mais Pesado (${stats.itemMaisPesado.peso.toFixed(1)})</div>
            </div>
        `;
    }

    // Item mais caro
    if (stats.itemMaisCaro) {
        statHtml += `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-gem"></i></div>
                <div class="stat-value">${stats.itemMaisCaro.nome}</div>
                <div class="stat-label">Item Mais Valioso (${stats.itemMaisCaro.calcularValor()})</div>
            </div>
        `;
    }

    statHtml += '</div>';

    // Distribuição por tipo
    if (Object.keys(stats.distribuicaoPorTipo || {}).length > 0) {
        statHtml += '<h4>Composição do Inventário</h4>';
        statHtml += '<div class="type-distribution">';

        Object.entries(stats.distribuicaoPorTipo).forEach(([tipo, quantidade]) => {
            const porcentagem = (quantidade / stats.totalItens) * 100;
            statHtml += `
                <div class="type-bar">
                    <div class="type-label">${tipo}</div>
                    <div class="type-bar-container">
                        <div class="type-bar-fill type-${tipo}" style="width: ${porcentagem}%">
                            <span>${quantidade}</span>
                        </div>
                    </div>
                    <div class="type-percentage">${porcentagem.toFixed(1)}%</div>
                </div>
            `;
        });

        statHtml += '</div>';
    }

    // Atualiza o conteúdo
    statsSection.innerHTML = statHtml;
}
