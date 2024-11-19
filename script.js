// Seleciona os elementos
const giftContainer = document.getElementById("gift-container");
const gift = document.getElementById("gift");
const carouselContainer = document.getElementById("carousel-container");
const happyMessage = document.getElementById("happy-message");
const faryEffect = document.getElementById("fary-effect");
const wowAudio = document.getElementById("wow-audio");
const audioPlayer = document.getElementById('audio-player');
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const videoSlide = document.getElementById("video-carousel");

let currentSlide = 0;
let isDragging = false;
let startX = 0;
const totalSlides = slides.length;

// Remove o presente e exibe o carrossel
gift.addEventListener("click", () => {
    faryEffect.play(); // Toca o som
    setTimeout(() => {
        giftContainer.remove(); // Remove o presente do DOM
        carouselContainer.style.visibility = "visible"; // Mostra o carrossel
        carouselContainer.style.opacity = "1";
        showAudioPlayer(); // Exibe o player de áudio
    }, 500);
});

// Mostra o player de áudio e inicia a música
function showAudioPlayer() {
    audioPlayer.style.display = 'block'; // Exibe o player de áudio
    audioPlayer.play(); // Toca a música automaticamente
}

// Define a largura dos slides
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});

// Atualiza a posição do carrossel
function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Verifica se o slide atual é o vídeo
    if (slides[currentSlide].tagName === "VIDEO") {
        videoSlide.play().catch(error => {
            console.error("Erro ao reproduzir o vídeo:", error);
        });

        // Pausa o áudio quando o vídeo começa a tocar
        videoSlide.addEventListener('play', () => {
            audioPlayer.pause();
        });

        // Retoma o áudio quando o vídeo termina
        videoSlide.addEventListener('ended', () => {
            nextSlide(); // Avança para o próximo slide
            audioPlayer.play();
        });
    } else {
        videoSlide.pause(); // Garante que o vídeo esteja pausado
    }
}

// Avança para o próximo slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    } else {
        showBirthdayMessage(); // Exibe a mensagem de aniversário
    }
}
function startEmojiRain() {
    const happyMessage = document.getElementById("happy-message");

    // Lista de emojis que você deseja usar
    const emojis = ['🎉', '✨', '💖', '🎁', '🎂', '🔥', '🥳', '🍀', '🌈'];

    // Função para criar e animar um emoji
    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // Posiciona o emoji aleatoriamente dentro do happy-message
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        emoji.style.animationDuration = `${Math.random() * 2 + 3}s`; // Entre 3 e 5 segundos

        happyMessage.appendChild(emoji);

        // Remove o emoji após a animação
        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }

    // Cria emojis continuamente
    const intervalId = setInterval(createEmoji, 200); // Cria um emoji a cada 200ms

    // Para a chuva de emojis após 10 segundos
    setTimeout(() => {
        clearInterval(intervalId);
    }, 10000); // 10 segundos
}

// Exibe a mensagem de aniversário
function showBirthdayMessage() {
    carouselContainer.style.display = "none"; // Esconde o carrossel
    happyMessage.style.display = "block"; // Mostra a mensagem de aniversário
    wowAudio.play(); // Toca o som "WOW"
    startEmojiRain();
}

// Implementa a funcionalidade de arrasto
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX; // Posição inicial do mouse
    track.style.transition = 'none'; // Remove a transição durante o arrasto
});

track.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        if (deltaX > 100) {
            currentSlide = Math.max(0, currentSlide - 1); // Volta para o slide anterior
            startX = e.clientX;
            updateCarousel();
        } else if (deltaX < -100) {
            currentSlide = Math.min(totalSlides - 1, currentSlide + 1); // Vai para o próximo slide
            startX = e.clientX;
            updateCarousel();
        }
    }
});

track.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.transition = 'transform 0.3s ease-in-out'; // Restaura a transição
});

track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.transition = 'transform 0.3s ease-in-out'; // Restaura a transição
});

// Adiciona a funcionalidade de clique
track.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides; // Avança para o próximo slide
    updateCarousel();
});

// Inicia o carrossel na posição inicial
updateCarousel();
