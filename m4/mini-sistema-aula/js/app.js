document.addEventListener('DOMContentLoaded', () => {
    // Inicialização
    const inventario = new Inventario(100); // Capacidade máxima de 100 unidades
    let itemSelecionado = null;

    // Referências aos elementos do DOM
    const itemForm = document.getElementById('item-form');
    const inventoryList = document.getElementById('inventory-list');
    const filterType = document.getElementById('filter-type');
    const totalWeightElement = document.getElementById('total-weight');
    const totalItemsElement = document.getElementById('total-items');

    // Elementos do modal
    const modal = document.getElementById('item-details-modal');
    const modalItemName = document.getElementById('modal-item-name');
    const modalItemDescription = document.getElementById('modal-item-description');
    const modalItemType = document.getElementById('modal-item-type');
    const modalItemWeight = document.getElementById('modal-item-weight');
    const modalDeleteBtn = document.getElementById('modal-delete-btn');
    const closeModal = document.querySelector('.close');

    /**
     * Atualiza os displays estatísticos
     */
    const atualizarEstatisticas = () => {
        const pesoTotal = inventario.totalWeight();
        const capacidadeMaxima = inventario.capacidadeMaxima;
        const porcentagemUsada = (pesoTotal / capacidadeMaxima) * 100;

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

        totalItemsElement.textContent = inventario.items.length;

        // Adicionar barra de progresso ao header se não existir
        let progressBar = document.querySelector('.weight-progress');
        if (!progressBar) {
            const statsContainer = document.querySelector('.stats .stat-item:first-child');
            progressBar = document.createElement('div');
            progressBar.className = 'weight-progress';
            progressBar.innerHTML = '<div class="weight-progress-bar"></div>';
            statsContainer.appendChild(progressBar);
        }

        // Atualiza a barra de progresso
        const progressBarFill = progressBar.querySelector('.weight-progress-bar');
        progressBarFill.style.width = `${Math.min(100, porcentagemUsada)}%`;

        if (porcentagemUsada > 90) {
            progressBarFill.style.backgroundColor = 'var(--danger)';
        } else if (porcentagemUsada > 70) {
            progressBarFill.style.backgroundColor = 'var(--warning)';
        } else {
            progressBarFill.style.backgroundColor = 'var(--success)';
        }
    };

    /**
     * Renderiza os itens do inventário na interface
     * @param {Array} items - Array de itens a serem exibidos
     */
    const renderizarItens = (items) => {
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

            // Adiciona acessibilidade e feedback tátil para dispositivos móveis
            itemEl.setAttribute('role', 'button');
            itemEl.setAttribute('aria-label', `Item ${item.nome}, tipo ${item.tipo}, peso ${item.peso.toFixed(1)}`);

            // Adiciona suporte para eventos de toque
            itemEl.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });

            itemEl.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });

            itemEl.addEventListener('click', () => abrirModal(item));
            inventoryList.appendChild(itemEl);
        });
    };

    /**
     * Atualiza a exibição do inventário
     */
    const atualizarInventario = () => {
        const tipoFiltrado = filterType.value;
        const itensFiltrados = inventario.findItemsByType(tipoFiltrado);
        renderizarItens(itensFiltrados);
        atualizarEstatisticas();
        exibirEstatisticasAvancadas();
    };

    /**
     * Exibe estatísticas avançadas do inventário
     */
    const exibirEstatisticasAvancadas = () => {
        // Verificar se o elemento de estatísticas avançadas existe ou criar um
        let statsSection = document.getElementById('advanced-stats');
        if (!statsSection) {
            statsSection = document.createElement('div');
            statsSection.id = 'advanced-stats';
            statsSection.className = 'advanced-stats';

            // Adiciona após o container de inventário
            document.querySelector('.inventory-container').appendChild(statsSection);
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
                <div class="stat-value">${stats.espacoUtilizado.toFixed(1)}%</div>
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
        if (Object.keys(stats.distribuicaoPorTipo).length > 0) {
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

        // Adiciona responsividade à visualização de stats
        const isMobile = window.innerWidth <= 576;

        // Adapta a visualização para telas menores
        if (isMobile) {
            // Simplifica as estatísticas em telas muito pequenas
            if (stats.totalItens > 10) {
                // Limita o número de barras de tipo em telas pequenas
                const tiposPrincipais = Object.entries(stats.distribuicaoPorTipo)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3);

                const outrosTipos = Object.entries(stats.distribuicaoPorTipo)
                    .sort((a, b) => b[1] - a[1])
                    .slice(3);

                if (outrosTipos.length > 0) {
                    const outrosQuantidade = outrosTipos.reduce((total, item) => total + item[1], 0);
                    const tiposAtualizados = Object.fromEntries(tiposPrincipais);
                    tiposAtualizados['Outros'] = outrosQuantidade;
                    stats.distribuicaoPorTipo = tiposAtualizados;
                }
            }
        }

        // Atualiza o conteúdo
        statsSection.innerHTML = statHtml;
    };

    /**
     * Abre o modal com os detalhes do item
     * @param {Item} item - Item a ser mostrado no modal
     */
    const abrirModal = (item) => {
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
                atualizarInventario();
            });

            // Insere antes do botão de remover
            modalDeleteBtn.parentNode.insertBefore(equipBtn, modalDeleteBtn);
        }

        modal.style.display = 'block';

        // Adiciona classe para animação
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    };

    /**
     * Fecha o modal de detalhes do item
     */
    const fecharModal = () => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        itemSelecionado = null;
    };

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

    // Botão de remover item no modal
    modalDeleteBtn.addEventListener('click', () => {
        if (!itemSelecionado) return;

        const nomeItem = itemSelecionado.nome;
        inventario.removeItemById(itemSelecionado.id);
        fecharModal();
        atualizarInventario();

        // Notificação de remoção
        exibirNotificacao(`Item "${nomeItem}" removido do inventário.`);
    });

    // Fechar modal
    closeModal.addEventListener('click', fecharModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Adicionar botão de limpar inventário
    const adicionarBotaoLimpar = () => {
        const inventoryContainer = document.querySelector('.inventory-container h2');

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

    /**
     * Exibe uma notificação temporária
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {boolean} isError - Se verdadeiro, usa estilo de erro
     */
    const exibirNotificacao = (mensagem, isError = false) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        if (isError) notification.classList.add('notification-error');
        notification.textContent = mensagem;

        document.body.appendChild(notification);

        // Estilo da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: isError ? 'rgba(244, 67, 54, 0.9)' : 'rgba(78, 84, 200, 0.9)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            zIndex: '1000',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.3s ease'
        });

        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';

            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    // Adicionar detecção de tamanho de tela para responsividade
    const verificarResponsividade = () => {
        const isMobile = window.innerWidth <= 576;
        document.body.classList.toggle('mobile-view', isMobile);

        // Ajuste para mobile
        if (modal.style.display === 'block') {
            modal.querySelector('.modal-content').style.maxWidth = isMobile ? '95%' : '500px';
        }
    };

    // Lidar com redimensionamento da janela
    window.addEventListener('resize', verificarResponsividade);

    // Garantir que o modal funcione bem em dispositivos móveis
    if ('ontouchstart' in window) {
        modal.addEventListener('touchstart', (e) => {
            if (e.target === modal) {
                fecharModal();
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
