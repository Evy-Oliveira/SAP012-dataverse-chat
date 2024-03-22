//modal chave api
export const closeApiKeyModal = (fromOverlay = false) => {
    const modal = document.querySelector("#modal-apikey");
    modal.style.display = "none";
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        document.body.removeChild(overlay); // Remover o overlay quando o modal for fechado
    }
    if (!fromOverlay) {
        const goTo = modal.dataset.goTo;
        if (goTo !== "") {
            goToChat(goTo);
        }
    }
}

export const openApiKeyModal = (goToHref = '') => {
    const modal = document.querySelector("#modal-apikey");
    modal.dataset.goTo = goToHref;
    modal.style.display = "flex";
    const overlay = document.createElement('div');// Criar e adicionar o elemento de fundo transparente
    overlay.classList.add('modal-overlay');
    document.body.appendChild(overlay);

    // Adicionar um evento de clique ao overlay para fechar o modal
    overlay.addEventListener('click', () => {
        closeApiKeyModal(true);
    });
}
