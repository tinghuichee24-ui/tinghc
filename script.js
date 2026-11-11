
document.querySelectorAll("[data-carousel]").forEach((carousel) => {

    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let currentIndex = 0;
    let autoPlay;

    // Create one dot for each photo
    slides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.classList.add("carousel-dot");
        dot.setAttribute("aria-label", "Go to photo " + (index + 1));

        dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoPlay();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    // Display the selected photo
    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    // Previous photo
    prevButton.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        restartAutoPlay();
    });

    // Next photo
    nextButton.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        restartAutoPlay();
    });

    // Automatic photo changing
    function startAutoPlay() {
        autoPlay = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
    }

    // Restart timer after manual clicking
    function restartAutoPlay() {
        clearInterval(autoPlay);
        startAutoPlay();
    }

    // Pause when mouse is over the carousel
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoPlay);
    });

    carousel.addEventListener("mouseleave", () => {
        restartAutoPlay();
    });

    // Show the first photo
    showSlide(0);
    startAutoPlay();

});
