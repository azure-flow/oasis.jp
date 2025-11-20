document.addEventListener('DOMContentLoaded', function () {

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

    const about_swiper = new Swiper(".top-about-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        breakpoints: {
            768: {
                spaceBetween: 32
            }
        },
        loop: true,
        speed: 1600,  // <-- now works for next + prev
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-slider-next",
            prevEl: ".about-slider-prev",
        },

        on: {
            click: function (swiper, event) {
                const clickedSlide = swiper.clickedSlide;
                const activeIndex = swiper.activeIndex;
                if (!clickedSlide) return;

                const clickedIndex = swiper.slides.indexOf(clickedSlide);

                if (activeIndex === clickedIndex && (clickedIndex === 0 || clickedIndex === 1)) {
                    swiper.navigation.prevEl.click();
                } else if (
                    (activeIndex === 0 && clickedIndex == 2) ||
                    (activeIndex === 1 && clickedIndex == 3)
                ) {
                    swiper.navigation.nextEl.click();
                }
            }
        }
    });
});