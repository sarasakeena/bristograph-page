/* ==========================================================================
   CAFFE ARABICA - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- STICKY HEADER & NAV SCROLL ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- SCROLL ANIMATIONS (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger initial animations for elements already in view (like hero section)
    setTimeout(() => {
        const heroAnimates = document.querySelectorAll('.hero .animate-up');
        heroAnimates.forEach(el => el.classList.add('visible'));
    }, 100);


    // --- TESTIMONIAL CAROUSEL ---
    const slides = document.querySelectorAll('.review-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let carouselInterval;

    function showSlide(index) {
        // Handle wrapping
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Update classes
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event Listeners for buttons
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    // Auto rotate every 5 seconds
    function startInterval() {
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(carouselInterval);
        startInterval();
    }

    if (slides.length > 0) {
        startInterval();
    }


    // --- FORM SUBMISSIONS (Simulated) ---
    
    // Reservation Form
    const resForm = document.getElementById('reservationForm');
    const resSuccess = document.getElementById('res-success');
    
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call
            const btn = resForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                resForm.reset();
                resSuccess.classList.remove('hidden');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    resSuccess.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
                contactSuccess.classList.remove('hidden');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    contactSuccess.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }
});
