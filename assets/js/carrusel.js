
const slides = document.querySelectorAll('.carousel-item');
let currentSlide = 0;

document.getElementById('prev-slide').addEventListener('click', () => {
    slides[currentSlide].classList.add('hidden');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.remove('hidden');
});

document.getElementById('next-slide').addEventListener('click', () => {
    slides[currentSlide].classList.add('hidden');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.remove('hidden');
});