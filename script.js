// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Animate numbers on scroll
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number, .mmr-value');    

    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateNumber = () => {
            if (current < target) {
                current += increment;
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };

        // Check if element is in viewport
        const elementTop = number.getBoundingClientRect().top;
        const elementBottom = number.getBoundingClientRect().bottom;
        const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);

        if (isVisible && number.textContent === '0') {
            updateNumber();
        }
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items
document.addEventListener('DOMContentLoaded', () => {
    const crimeCards = document.querySelectorAll('.crime-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const statItems = document.querySelectorAll('.stat-item');

    [...crimeCards, ...timelineItems, ...statItems].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Animate numbers when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    const mmrCounter = document.querySelector('.mmr-value');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numberObserver.observe(statsSection);
    numberObserver.observe(mmrCounter);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add hover sound effect (simulated with visual feedback)
const crimeCards = document.querySelectorAll('.crime-card');
crimeCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'shake 0.5s';
    });

    card.addEventListener('animationend', () => {
        card.style.animation = '';
    });
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);