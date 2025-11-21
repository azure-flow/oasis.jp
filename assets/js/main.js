document.addEventListener('DOMContentLoaded', function () {

    // for scroll motion
    const circle = document.getElementById('scroll-circle');
    const line = document.getElementById('scroll-line');

    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - innerHeight;
        const scrollPercent = scrollY / maxScroll;

        const lineHeight = line.offsetHeight;
        const circleHeight = circle.offsetHeight;

        const move = scrollPercent * (lineHeight - circleHeight);

        circle.style.top = `${move}px`;
    });

    // Haumburger Button to open menu on smartphone

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menu_modal = document.getElementById('menu_modal');

    function toggleModal() {
        if (menu_modal.classList.contains('opacity-0')) {
            // open
            menu_modal.classList.remove('pointer-events-none', 'opacity-0');
            menu_modal.classList.add('pointer-events-auto', 'opacity-100');
        } else {
            // close
            menu_modal.classList.add('opacity-0');
            menu_modal.classList.remove('opacity-100', 'pointer-events-auto');
            menu_modal.classList.add('pointer-events-none');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleModal);
    }

    document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !menu_modal.classList.contains('opacity-0')) {
            toggleModal();
        }
    });


    //

    function updateAboutSwiperHeight() {
        const nextSlide = document.querySelector('.top-about-swiper .swiper-slide-next img');
        const container = document.querySelector('.top-about-swiper .swiper-wrapper');
        if (nextSlide && container) {
            const h = nextSlide.offsetHeight;
            container.style.height = h + 'px';
        }
    }

    // Debounce to ensure function runs AFTER window resizing is completed
    window.addEventListener('resize', updateAboutSwiperHeight);

    // Optionally: Also update on DOMContentLoaded for correct initial state
    setTimeout(() => {
        updateAboutSwiperHeight();
    }, 1000)

    const about_swiper = new Swiper(".top-about-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        breakpoints: {
            768: {
                spaceBetween: 16
            },
            1024: {
                spaceBetween: 32
            }
        },
        loop: true,
        speed: 750,
        preloadImages: true,             // Always preload images
        lazy: false,                     // Don't use lazy loading (ensure images load up front)
        watchSlidesProgress: true,       // Helps render partially visible slides, i.e. in offset area
        watchSlidesVisibility: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-slider-next",
            prevEl: ".about-slider-prev",
        },
        // Ensure enough slides are rendered to fill out visible space (right 200px area)
        on: {
            beforeInit: function (swiper) {
                // If you added a right offset to .swiper-wrapper,
                // ensure there are enough slides to cover the empty area.
                // Optionally, you can adjust loopedSlides (uncomment below).
                // This makes Swiper render enough slides for looping and offsets.
                swiper.params.loopAdditionalSlides = 2;
            },
            // Optionally preload extra slides images before transition
            slideNextTransitionStart: function (swiper) {
                const nextIndex = (swiper.activeIndex + 1) % swiper.slides.length;
                const nextSlide = swiper.slides[nextIndex];
                if (nextSlide) {
                    // If image is not yet loaded, trigger load
                    const img = nextSlide.querySelector('img');
                    if (img && img.dataset && img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                }
            },
            click: function (swiper, event) {
                // You can keep or adjust custom click logic if needed
                const clickedSlide = swiper.clickedSlide;
                const activeIndex = swiper.activeIndex;
                const clickedIndex = swiper.slides.indexOf(clickedSlide);
                if (!clickedSlide) return;

                if (clickedIndex === activeIndex) {
                    swiper.slidePrev()
                } else if (clickedIndex - activeIndex === 2) {
                    swiper.slideNext();
                } else if (clickedIndex - activeIndex === 3) {
                    swiper.slideTo(swiper.activeIndex + 2);
                    swiper.params.loopAdditionalSlides = 2;

                }
            }
        }
    });
});