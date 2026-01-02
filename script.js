const track = document.querySelector('.carousel-track');
let cards = Array.from(document.querySelectorAll('.card'));
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let isDragging = false;
let startX = 0;
let currentTranslate = 0;

function updateCarousel() {
  cards.forEach(card => card.classList.remove('active'));
  cards[1].classList.add('active');
}

function next() {
  track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  cards.push(cards.shift());
  render();
  
  setTimeout(() => {
    track.style.transition = 'transform 0.3s ease';
  }, 500);
}

function prev() {
  track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  cards.unshift(cards.pop());
  render();
  
  setTimeout(() => {
    track.style.transition = 'transform 0.3s ease';
  }, 500);
}

function render() {
  track.innerHTML = '';
  cards.forEach(card => track.appendChild(card));
  updateCarousel();
}

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

// Drag com mouse
track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  track.style.transition = 'none';
});

track.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const diff = e.clientX - startX;
  if (Math.abs(diff) > 5) {
    currentTranslate = diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
});

track.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  
  const diff = e.clientX - startX;
  track.style.transition = 'transform 0.3s ease';
  
  if (diff < -60) next();
  else if (diff > 60) prev();
  else {
    track.style.transform = 'translateX(0)';
  }
  
  isDragging = false;
  currentTranslate = 0;
  track.style.transform = 'translateX(0)';
});

track.addEventListener('mouseleave', () => {
  if (isDragging) {
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = 'translateX(0)';
    isDragging = false;
    currentTranslate = 0;
  }
});

// Suporte touch
track.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  track.style.transition = 'none';
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  
  const diff = e.touches[0].clientX - startX;
  if (Math.abs(diff) > 5) {
    currentTranslate = diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
});

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  
  const diff = e.changedTouches[0].clientX - startX;
  track.style.transition = 'transform 0.3s ease';
  
  if (diff < -60) next();
  if (diff > 60) prev();
  
  isDragging = false;
  currentTranslate = 0;
  track.style.transform = 'translateX(0)';
});

// Inicial
render();