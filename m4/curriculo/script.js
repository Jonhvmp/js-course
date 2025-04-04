document.addEventListener('DOMContentLoaded', function() {
    // Elemento do currículo que será exportado
    const curriculumElement = document.getElementById('curriculum');

    // Botão de download
    const downloadButton = document.getElementById('download-pdf');

    // Seletor de tamanho de papel
    const paperSizeSelect = document.getElementById('paper-size');

    // Configurações padrão para exportação do PDF
    let pdfOptions = {
        margin: [10, 10],
        filename: 'curriculo-jonh-alex.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    // Função para exportar o currículo como PDF
    function exportToPDF() {
        // Atualiza o formato do papel com base na seleção
        pdfOptions.jsPDF.format = paperSizeSelect.value;

        // Mostrar um feedback visual de que o PDF está sendo gerado
        downloadButton.disabled = true;
        downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';

        // Pequeno timeout para garantir que o feedback visual apareça
        setTimeout(() => {
            // Gerar o PDF
            html2pdf()
                .set(pdfOptions)
                .from(curriculumElement)
                .save()
                .then(() => {
                    // Restaurar o botão após a conclusão
                    downloadButton.disabled = false;
                    downloadButton.innerHTML = '<i class="fas fa-file-pdf"></i> Exportar para PDF';
                })
                .catch(error => {
                    console.error('Erro ao gerar PDF:', error);
                    downloadButton.disabled = false;
                    downloadButton.innerHTML = '<i class="fas fa-file-pdf"></i> Exportar para PDF';
                    alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
                });
        }, 100);
    }

    // Adicionar evento de clique ao botão de download
    downloadButton.addEventListener('click', exportToPDF);

    // Função para ajustar o conteúdo para tamanhos de papel diferentes
    paperSizeSelect.addEventListener('change', function() {
        if (this.value === 'letter') {
            curriculumElement.style.maxWidth = '216mm'; // Largura do papel Letter
        } else {
            curriculumElement.style.maxWidth = '210mm'; // Largura do papel A4
        }
    });

    // Adicionar dicas interativas
    const tooltips = [
        { message: "Clique no botão 'Exportar para PDF' para baixar seu currículo como PDF." },
        { message: "Você pode escolher entre formatos de papel A4 ou Carta para melhor adequação." },
        { message: "O currículo foi otimizado para impressão profissional." }
    ];

    // Função para mostrar dicas
    function showRandomTooltip() {
        const randomIndex = Math.floor(Math.random() * tooltips.length);
        const tooltip = tooltips[randomIndex];

        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltip.message;
        tooltipElement.style.position = 'fixed';
        tooltipElement.style.bottom = '20px';
        tooltipElement.style.right = '20px';
        tooltipElement.style.background = '#3f51b5';
        tooltipElement.style.color = 'white';
        tooltipElement.style.padding = '10px 15px';
        tooltipElement.style.borderRadius = '4px';
        tooltipElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        tooltipElement.style.zIndex = '1000';
        tooltipElement.style.maxWidth = '300px';

        document.body.appendChild(tooltipElement);

        setTimeout(() => {
            tooltipElement.style.opacity = '0';
            tooltipElement.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                document.body.removeChild(tooltipElement);
            }, 500);
        }, 4000);
    }

    // Mostrar dica após carregar a página
    setTimeout(showRandomTooltip, 2000);
});
