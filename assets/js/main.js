document.addEventListener('DOMContentLoaded', function () {
    // Parallax

    if (window.simpleParallax) {
        new simpleParallax(document.querySelectorAll('.parallax-img'), {
            orientation: 'up',
            scale: 1.3,
            delay: 2,
            transition: 'cubic-bezier(0,0,0,1)'
        });
    }

    // Fixed Background - Only when section is in viewport (for all parallax sections)
    (function () {
        const sections = document.querySelectorAll('.parallax-section');
        if (!sections.length) return;

        function update() {
            sections.forEach(section => {
                const bgs = section.querySelectorAll('.parallax-bg');
                if (!bgs.length) return;

                const rect = section.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;

                bgs.forEach(bg => {
                    if (isInView) {
                        bg.classList.remove('absolute');
                        bg.classList.add('fixed', 'bg-fixed');
                    } else {
                        bg.classList.remove('fixed', 'bg-fixed');
                        bg.classList.add('absolute');
                    }
                });
            });
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        update();
    })();

    // Haumburger Button to open menu on smartphone

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainModal = document.getElementById('mainModal');
    const mainModalPanel = document.getElementById('mainModalPanel');
    const closeMainModalBtn = document.getElementById('closeMainModalBtn');

    function openModal() {
        mainModal.classList.remove('pointer-events-none', 'opacity-0');
        mainModal.classList.add('pointer-events-auto', 'opacity-100');
        mainModalPanel.classList.remove('-translate-y-full');
        mainModalPanel.classList.add('translate-y-0');
    }
    function closeModal() {
        mainModal.classList.add('opacity-0');
        mainModal.classList.remove('opacity-100', 'pointer-events-auto');
        mainModal.classList.add('pointer-events-none');
        mainModalPanel.classList.add('-translate-y-full');
        mainModalPanel.classList.remove('translate-y-0');

        document.body.style.overflow = '';
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openModal);
    }

    if (closeMainModalBtn) {
        closeMainModalBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !mainModal.classList.contains('opacity-0')) {
            closeModal();
        }
    });

    // Our experience category swiper

    var swiper = new Swiper(".exp_swiper", {
        slidesPerView: 3,
        spaceBetween: 25,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        speed: 2000, // Slow transition between slides to 2 seconds
        breakpoints: {
            // when window width is >= 0px (smartphone)
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1
            },
            // when window width is >= 768px (md size, and up)
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    });


    // featured Swiper with vertical thumbs swiper 

    var featuredThumbsSwiper = new Swiper(".featured-thumbs-swiper", {
        direction: window.innerWidth < 768 ? 'horizontal' : 'vertical',
        spaceBetween: 10,
        slidesPerView: 4,
        slidesPerGroup: 4,
        loop: true,
        // loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    var featuredSwiper = new Swiper(".featured-swiper", {
        spaceBetween: 10,
        slidesPerView: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        speed: 2000,
        pagination: {
            el: '.featured-swiper .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        thumbs: {
            swiper: featuredThumbsSwiper,
        },
    });

    var featured_thumbsContainer = document.getElementById("featuredThumbsContainer");

    if (featured_thumbsContainer) {

        // Get all thumbnail slides and images
        var thumbSlides = featured_thumbsContainer.querySelectorAll(".swiper-slide");

        // Get the Swiper instance for the main slider
        var mainSwiper = null;
        if (window.featuredSwiper) {
            mainSwiper = window.featuredSwiper;
        } else if (window.Swiper && document.querySelector('.featured-swiper').swiper) {
            mainSwiper = document.querySelector('.featured-swiper').swiper;
        }

        thumbSlides.forEach(function (slide) {
            // Mouse enter/hover event to trigger slide change
            slide.addEventListener("mouseenter", function () {
                var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
                if (mainSwiper && typeof mainSwiper.slideTo === "function") {
                    mainSwiper.slideTo(slideIndex);
                }
            });

            // Click event to trigger slide change
            slide.addEventListener("click", function () {
                var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
                if (mainSwiper && typeof mainSwiper.slideTo === "function") {
                    mainSwiper.slideTo(slideIndex);
                }
            });

            // Accessibility: allow Enter/Space to trigger
            slide.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
                    if (mainSwiper && typeof mainSwiper.slideTo === "function") {
                        mainSwiper.slideTo(slideIndex);
                    }
                }
            });
        });
    }

    // Double Thumbnail slider

    var experiencesThumbsSwiper = new Swiper(".experiences-thumbs-swiper", {
        spaceBetween: 10,
        slidesPerView: 3,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        grid: {
            rows: 2,
            fill: 'row',
        },
    });


    var experiencesSwiper = new Swiper(".experiences-swiper", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.experiences-swiper-container .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        speed: 1000,
        thumbs: {
            swiper: experiencesThumbsSwiper,
        },
    });

    var experience_thumbsContainer = document.getElementById("experiencesThumbsContainer");

    if (experience_thumbsContainer) {

        // Get all thumbnail slides and images
        var thumbSlides = experience_thumbsContainer.querySelectorAll(".swiper-slide");

        // Get the Swiper instance for the main slider
        var mainSwiper = null;
        if (window.featuredSwiper) {
            mainSwiper = window.featuredSwiper;
        } else if (window.Swiper && document.querySelector('.experiences-swiper').swiper) {
            mainSwiper = document.querySelector('.experiences-swiper').swiper;
        }

        thumbSlides.forEach(function (slide) {
            // Mouse enter/hover event to trigger slide change
            slide.addEventListener("mouseenter", function () {
                var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
                if (mainSwiper && typeof mainSwiper.slideTo === "function") {
                    mainSwiper.slideTo(slideIndex);
                }
            });

            // Click event to trigger slide change
            slide.addEventListener("click", function () {
                var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
                if (mainSwiper && typeof mainSwiper.slideTo === "function") {
                    mainSwiper.slideTo(slideIndex);
                }
            });

            // Accessibility: allow Enter/Space to trigger
            slide.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
                    if (mainSwiper && typeof mainSwiper.slideTo === "function") {
                        mainSwiper.slideTo(slideIndex);
                    }
                }
            });
        });
    }

    if (typeof AOS !== 'undefined' && AOS.init) {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: false,
            mirror: false
        });
    }
});