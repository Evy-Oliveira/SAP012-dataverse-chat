
export function error() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `<section class="erro-view">
  <h1 class="erro-h1">Opsss!</h1>
  <figure class="erro-img"><img src="assets/error.anya.jpg" alt="imagem de Anya Forger com expressão de choro"></figure>
  <p class="erro-p">Desculpe, não encontramos essa página!</p>
  <button class="erro-inicio">Voltar ao inicio</button>
  </section>`;

  viewEl.querySelector('.erro-inicio').addEventListener('click', () => {
    window.location.href = window.location.origin + '/';

  });

  return viewEl;
}