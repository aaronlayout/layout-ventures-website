// Layout Ventures Website JavaScript - Ultimate Edition

// =============================================
// Page Loader
// =============================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    const body = document.body;

    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading');

        // Trigger text reveal after loader
        setTimeout(() => {
            initTextReveal();
        }, 200);
    }, 800);
});

// =============================================
// Text Reveal Animation
// =============================================
function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.innerHTML;
    const words = text.split(/(<br>|\s+)/).filter(word => word.trim() !== '');

    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'none';

    words.forEach((word, index) => {
        if (word === '<br>') {
            heroTitle.appendChild(document.createElement('br'));
        } else {
            const wrapper = document.createElement('span');
            wrapper.className = 'word-reveal';
            const inner = document.createElement('span');
            inner.textContent = word + ' ';
            inner.style.animationDelay = `${index * 0.05}s`;
            wrapper.appendChild(inner);
            heroTitle.appendChild(wrapper);
        }
    });
}

// =============================================
// Particle Network
// =============================================
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        const hero = document.querySelector('.hero');
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }

    // Initialize
    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateParticles();
        }
    });
}

// =============================================
// Custom Cursor
// =============================================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for outer cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Faster follow for dot
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .pillar-card, .team-member');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach(el => {
        el.style.cursor = 'none';
    });
}

// =============================================
// Page Transitions
// =============================================
const pageTransition = document.querySelector('.page-transition');
const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="fund-announcement.html"]');

internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Don't transition for anchor links on same page
        if (href.includes('#') && !href.startsWith('index.html') && !href.startsWith('fund-announcement.html')) {
            return;
        }

        e.preventDefault();

        if (pageTransition) {
            pageTransition.classList.add('active');

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        } else {
            window.location.href = href;
        }
    });
});

// =============================================
// Scroll Progress Bar
// =============================================
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// =============================================
// Header Scroll Effect
// =============================================
const header = document.querySelector('.header');
let ticking = false;

function updateHeader() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });

// =============================================
// Mobile Menu Toggle
// =============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// =============================================
// Smooth Scrolling for Anchor Links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// Intersection Observer for Scroll Animations
// =============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// =============================================
// Initialize Animations on DOM Ready
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const sections = document.querySelectorAll('.pillars, .portfolio, .team, .contact-cta');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(section);
    });

    // Animate pillar cards with stagger
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        observer.observe(card);
    });

    // Animate portfolio items with stagger
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        const delay = (index % 5) * 0.1;
        item.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        observer.observe(item);
    });

    // Animate team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(40px)';
        member.style.transition = `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`;
        observer.observe(member);
    });

    // Animate contact CTA elements
    const contactElements = document.querySelectorAll('.contact-tagline, .contact-title, .contact-subtitle, .contact-button');
    contactElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add visible class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// =============================================
// 3D Tilt Effect for Cards
// =============================================
const tiltCards = document.querySelectorAll('.pillar-card, .team-member');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// =============================================
// Magnetic Button Effect
// =============================================
const magneticButtons = document.querySelectorAll('.contact-button, .linkedin-link');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// =============================================
// Parallax Effect for Hero Elements
// =============================================
const heroOrbs = document.querySelectorAll('.hero-orb');
const heroRings = document.querySelectorAll('.hero-ring');

let parallaxEnabled = window.matchMedia('(min-width: 769px)').matches;

window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    parallaxEnabled = e.matches;
});

window.addEventListener('scroll', () => {
    if (!parallaxEnabled) return;

    const scrollY = window.pageYOffset;

    heroOrbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate(${Math.sin(scrollY * 0.01) * 20}px, ${scrollY * speed}px) scale(${1 - scrollY * 0.0002})`;
    });

    heroRings.forEach((ring, index) => {
        const speed = 0.02 + (index * 0.01);
        ring.style.transform = `translateY(calc(-50% + ${scrollY * speed}px))`;
    });
}, { passive: true });

// =============================================
// Smooth Number Counter (for future use)
// =============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// =============================================
// Easter Egg: Konami Code
// =============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);

            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);

            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// =============================================
// Performance Optimizations
// =============================================
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--ease-out-expo', 'ease-out');
    document.querySelectorAll('.hero-orb, .hero-ring, .hero-grid').forEach(el => {
        el.style.display = 'none';
    });
    if (canvas) canvas.style.display = 'none';
}

// Respect reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero-orb, .hero-ring').forEach(el => {
        el.style.animation = 'none';
    });
    if (canvas) canvas.style.display = 'none';
}

// =============================================
// Typing Effect for Subtitles (Optional)
// =============================================
function typeWriter(element, text, speed = 30) {
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
