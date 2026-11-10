const track = document.querySelector('.track');
const slides = document.querySelectorAll('.slide');
const dotsBox = document.querySelector('.dots');
const viewport = document.querySelector('.viewport');
let index = 0, timer;

slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', () => { goTo(i); restart(); });
    dotsBox.appendChild(d);
});
const dots = document.querySelectorAll('.dot');

function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, n) => d.setAttribute('aria-selected', n === index));
}
function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 4000);
}

// geser dengan sentuhan / mouse
let startX = 0;
viewport.addEventListener('pointerdown', e => startX = e.clientX);
viewport.addEventListener('pointerup', e => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) { goTo(index + (dx < 0 ? 1 : -1)); restart(); }
});

goTo(0);
restart();