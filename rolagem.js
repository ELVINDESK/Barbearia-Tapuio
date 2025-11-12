
// Rolagem suave personalizada com efeito mais lento (cinematográfico)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const destinoId = this.getAttribute('href');

    // Ignora links vazios
    if (destinoId === '#' || destinoId === '') return;

    const destino = document.querySelector(destinoId);
    if (!destino) return;

    e.preventDefault();

    const header = document.querySelector('#header');
    const headerAltura = header ? header.offsetHeight : 0;
    const alvo = destino.offsetTop - headerAltura;

    scrollSuave(alvo, 1200); // 1200 = duração em ms (1.2 segundos)
  });
});

// Função que cria uma animação de rolagem personalizada
function scrollSuave(alvo, duracao) {
  const inicio = window.pageYOffset;
  const distancia = alvo - inicio;
  let inicioTempo = null;

  function animarScroll(tempoAtual) {
    if (!inicioTempo) inicioTempo = tempoAtual;
    const tempoPassado = tempoAtual - inicioTempo;
    const progresso = Math.min(tempoPassado / duracao, 1);

    // Função de aceleração (easeInOutCubic)
    const ease = progresso < 0.5
      ? 4 * progresso * progresso * progresso
      : (progresso - 1) * (2 * progresso - 2) * (2 * progresso - 2) + 1;

    window.scrollTo(0, inicio + distancia * ease);

    if (tempoPassado < duracao) {
      requestAnimationFrame(animarScroll);
    }
  }

  requestAnimationFrame(animarScroll);
}
