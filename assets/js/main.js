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
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateAboutSwiperHeight();
        }, 500);
    });

    // Optionally: Also update on DOMContentLoaded for correct initial state
    setTimeout(() => {
        updateAboutSwiperHeight();
    }, 500)

    const about_swiper = new Swiper(".top-about-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
        speed: 750,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-slider-next",
            prevEl: ".about-slider-prev",
        },
        loopedSlides: document.querySelectorAll('.top-about-swiper .swiper-slide').length,
        on: {
            beforeInit: function (swiper) {
                swiper.params.loopAdditionalSlides = 2;
            },
            click: function (swiper, event) {
                const clickedSlide = swiper.clickedSlide;
                const activeIndex = swiper.activeIndex;
                const clickedIndex = swiper.slides.indexOf(clickedSlide);
                if (!clickedSlide) return;

                if (clickedIndex === activeIndex) {
                    swiper.slidePrev()
                } else if (clickedIndex - activeIndex === 2 || clickedIndex - activeIndex === 3) {
                    swiper.slideNext();
                }
            }
        }
    });

    about_swiper.slidePrev();
});