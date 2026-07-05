/* =====================================================
   BARQ HUB - JavaScript Functionality
   Premium Business Website with Particles.js
   ===================================================== */

// -------------------- Preloader --------------------
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 1500);
});

// -------------------- Particles.js Configuration --------------------
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#0066FF', '#00d4ff', '#a855f7']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0066FF',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// -------------------- Custom Cursor --------------------
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, select');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// -------------------- Mobile Menu Toggle --------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// -------------------- Navbar Scroll Effect --------------------
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// -------------------- Active Nav Link Highlighting --------------------
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// -------------------- Scroll Animations --------------------
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 50);
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// -------------------- Counter Animation --------------------
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// -------------------- Smooth Scroll for Anchor Links --------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// -------------------- Contact Form to WhatsApp --------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;

        // Validate
        if (!name || !phone || !service) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Build WhatsApp message
        const message = `Hello BarqHub4U,
My Name is ${name}
My Phone is ${phone}
I need ${service}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp URL
        const whatsappURL = `https://wa.me/917045399255?text=${encodedMessage}`;

        // Show success notification
        showNotification('Redirecting to WhatsApp...', 'success');

        // Open WhatsApp after a brief delay
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 500);

        // Reset form
        contactForm.reset();
    });
}

// -------------------- Notification System --------------------
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00c853' : type === 'error' ? '#ff5252' : '#0066FF'};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease forwards;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after delay
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// -------------------- Typing Effect for Hero (Optional Enhancement) --------------------
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// -------------------- Parallax Effect on Scroll --------------------
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');

    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// -------------------- Add Ripple Effect to Buttons --------------------
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// -------------------- Magnetic Button Effect --------------------
document.querySelectorAll('.btn-glow').forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// -------------------- Card Tilt Effect --------------------
document.querySelectorAll('.service-card, .feature-card, .highlight-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// -------------------- Year Update in Footer --------------------
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
}

// -------------------- Form Input Animation --------------------
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// -------------------- Testimonials Slider --------------------
(function () {
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');

    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    let autoSlideInterval;
    const autoSlideDelay = 4000;

    function getCards() {
        return slider.querySelectorAll('.testimonial-card');
    }

    function getVisibleCount() {
        const w = window.innerWidth;
        if (w <= 480) return 1;
        if (w <= 768) return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    function getMaxIndex() {
        const cards = getCards();
        return Math.max(0, cards.length - getVisibleCount());
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        const max = getMaxIndex();
        for (let i = 0; i <= max; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const cards = getCards();
        if (cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 30; // card width + gap
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        const max = getMaxIndex();
        currentIndex = Math.max(0, Math.min(index, max));
        updateSlider();
    }

    function nextSlide() {
        const max = getMaxIndex();
        currentIndex = currentIndex >= max ? 0 : currentIndex + 1;
        updateSlider();
    }

    function prevSlide() {
        const max = getMaxIndex();
        currentIndex = currentIndex <= 0 ? max : currentIndex - 1;
        updateSlider();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Responsive recalc
    window.addEventListener('resize', () => {
        if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
        buildDots();
        updateSlider();
    });

    // Load saved reviews from localStorage
    function loadSavedReviews() {
        const saved = localStorage.getItem('barqhub4u_reviews');
        if (saved) {
            try {
                const reviews = JSON.parse(saved);
                reviews.forEach(review => addReviewCard(review, false));
            } catch (e) { /* ignore corrupt data */ }
        }
    }

    // Create and append a review card
    function addReviewCard(review, save = true) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';

        const initials = review.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        const starsHTML = Array.from({ length: 5 }, (_, i) =>
            `<i class="fas fa-star" style="color: ${i < review.rating ? 'var(--warning)' : 'rgba(255,255,255,0.15)'}"></i>`
        ).join('');

        card.innerHTML = `
            <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
            <div class="stars">${starsHTML}</div>
            <p>"${review.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${initials}</div>
                <div class="author-info">
                    <h4>${review.name}</h4>
                    <span>${review.role || 'Customer'}</span>
                </div>
            </div>
        `;

        slider.appendChild(card);

        if (save) {
            const saved = localStorage.getItem('barqhub4u_reviews');
            const reviews = saved ? JSON.parse(saved) : [];
            reviews.push(review);
            localStorage.setItem('barqhub4u_reviews', JSON.stringify(reviews));
        }

        // Rebuild dots and update
        buildDots();
        updateSlider();
    }

    // Expose addReviewCard globally for the form
    window.addReviewToSlider = addReviewCard;

    loadSavedReviews();
    buildDots();
    updateSlider();
    startAutoSlide();
})();

// -------------------- Review Form + Star Rating --------------------
(function () {
    const form = document.getElementById('reviewForm');
    const starsContainer = document.getElementById('starRatingInput');
    const ratingText = document.getElementById('ratingText');

    if (!form || !starsContainer) return;

    let selectedRating = 0;
    const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    const stars = starsContainer.querySelectorAll('i');

    function highlightStars(count) {
        stars.forEach((star, i) => {
            star.classList.toggle('hovered', i < count);
        });
    }

    function setRating(count) {
        selectedRating = count;
        stars.forEach((star, i) => {
            star.classList.toggle('selected', i < count);
            star.classList.remove('hovered');
        });
        if (ratingText) ratingText.textContent = ratingLabels[count] || 'Select your rating';
    }

    stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
            if (ratingText) ratingText.textContent = ratingLabels[rating];
        });

        star.addEventListener('mouseleave', function () {
            highlightStars(0);
            if (ratingText) ratingText.textContent = selectedRating ? ratingLabels[selectedRating] : 'Select your rating';
        });

        star.addEventListener('click', function () {
            setRating(parseInt(this.dataset.rating));
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('reviewName').value.trim();
        const role = document.getElementById('reviewRole').value.trim();
        const text = document.getElementById('reviewText').value.trim();

        if (!name || !text) {
            showNotification('Please fill in your name and review', 'error');
            return;
        }

        if (selectedRating === 0) {
            showNotification('Please select a star rating', 'error');
            return;
        }

        // Add the review card to the slider
        if (typeof window.addReviewToSlider === 'function') {
            window.addReviewToSlider({
                name,
                role,
                text,
                rating: selectedRating
            });
        }

        showNotification('Thank you for your review! ⭐', 'success');

        // Reset form
        form.reset();
        setRating(0);
    });
})();

// -------------------- Console Message --------------------
console.log('%c⚡ BarqHub4U - Complete Electrical Solutions', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with passion for electrical excellence', 'color: #F4C430; font-size: 14px;');
