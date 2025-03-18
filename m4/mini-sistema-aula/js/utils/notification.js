/**
 * Exibe uma notificação temporária
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {boolean} isError - Se verdadeiro, usa estilo de erro
 */
export function exibirNotificacao(mensagem, isError = false) {
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
}
