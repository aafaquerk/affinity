// Function to animate counting up to target number
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  const hasSuffix = element.hasAttribute('data-suffix');
  const suffix = hasSuffix ? element.getAttribute('data-suffix') : '';
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Initialize counters when page loads or when elements come into view
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  statNumbers.forEach(element => {
    const target = parseInt(element.getAttribute('data-target'));
    animateCounter(element, target);
  });
}

// Optional: Trigger animation when stats section comes into view
function initCountersOnScroll() {
  const statsGrid = document.querySelector('.stats-grid');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCounters();
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.5 });
  
  if (statsGrid) {
    observer.observe(statsGrid);
  }
}

// Choose one initialization method:

// Method 1: Animate immediately on page load
// document.addEventListener('DOMContentLoaded', initCounters);

// Method 2: Animate when scrolled into view
document.addEventListener('DOMContentLoaded', initCountersOnScroll);


function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

window.addEventListener('load', function() {
    setTimeout(function() {
        document.body.classList.remove('is-preload');
    }, 100);
    createParticles();
});

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 300) {
        header.classList.remove('alt');
    } else {
        header.classList.add('alt');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#header nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = '';
        }
    });
});

// Horizontal scroll navigation for projects section
// Horizontal scroll navigation for projects section
function initHorizontalScroll() {
  const wrapper = document.querySelector('.projects-wrapper');
  const scrollContainer = document.querySelector('.horizontal-scroll');
  
  if (!wrapper || !scrollContainer) return;
  
  // Create navigation buttons
  const leftBtn = document.createElement('button');
  leftBtn.className = 'scroll-btn scroll-btn-left';
  leftBtn.innerHTML = '&#8249;'; // Left arrow
  leftBtn.setAttribute('aria-label', 'Scroll left');
  
  const rightBtn = document.createElement('button');
  rightBtn.className = 'scroll-btn scroll-btn-right';
  rightBtn.innerHTML = '&#8250;'; // Right arrow
  rightBtn.setAttribute('aria-label', 'Scroll right');
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  
  const progressFill = document.createElement('div');
  progressFill.className = 'scroll-progress-fill';
  progressBar.appendChild(progressFill);
  
  // Insert buttons and progress bar
  wrapper.appendChild(leftBtn);
  wrapper.appendChild(rightBtn);
  wrapper.appendChild(progressBar);
  
  // Scroll amount (one card width + gap)
  const getScrollAmount = () => {
    const card = scrollContainer.querySelector('.research-card');
    return card ? card.offsetWidth + 20 : 400; // 20px is the gap
  };
  
  // Scroll functions
  const scrollLeft = () => {
    scrollContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth'
    });
  };
  
  const scrollRight = () => {
    scrollContainer.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth'
    });
  };
  
  // Button click events
  leftBtn.addEventListener('click', scrollLeft);
  rightBtn.addEventListener('click', scrollRight);
  
  // Update button visibility and progress bar based on scroll position
  const updateButtons = () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    // Update buttons
    leftBtn.style.opacity = scrollLeft <= 0 ? '0.3' : '1';
    leftBtn.style.cursor = scrollLeft <= 0 ? 'default' : 'pointer';
    
    rightBtn.style.opacity = scrollLeft >= maxScroll - 1 ? '0.3' : '1';
    rightBtn.style.cursor = scrollLeft >= maxScroll - 1 ? 'default' : 'pointer';
    
    // Update progress bar
    const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    progressFill.style.width = scrollPercentage + '%';
  };
  
  // Listen for scroll events
  scrollContainer.addEventListener('scroll', updateButtons);
  
  // Initial button state
  updateButtons();
  
  // Update on window resize
  window.addEventListener('resize', updateButtons);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter cards
        document.querySelectorAll('.research-card').forEach(card => {
            if (filter === 'all' || card.dataset.category.includes(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHorizontalScroll);

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// Scroll animation for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Tech stack animation observer
const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.tech-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100); // Stagger animation by 100ms
            });
            techObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe each tech category
document.querySelectorAll('.tech-category').forEach(category => {
    techObserver.observe(category);
});

// Mouse-following glow effect for tech items
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        item.style.setProperty('--mouse-x', `${x}%`);
        item.style.setProperty('--mouse-y', `${y}%`);
    });
});
// Tech logo fallback: replace broken remote icons with a local placeholder
function initTechLogoFallback() {
    const placeholderSrc = 'Images/tech-placeholder.svg';
    document.querySelectorAll('img.tech-logo').forEach(img => {
        // Enable native lazy-loading for perf
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        img.addEventListener('error', () => {
            // Prevent infinite loop if placeholder is also missing
            if (img.dataset.broken === 'true') return;
            img.dataset.broken = 'true';
            img.src = placeholderSrc;
            img.removeAttribute('srcset');
            img.style.objectFit = 'contain';
            img.style.background = 'transparent';
            // Keep accessible alt from original; if missing, add a generic one
            if (!img.getAttribute('alt') || img.getAttribute('alt').trim() === '') {
                img.setAttribute('alt', 'Technology');
            }
        }, { once: true });
    });
}
document.addEventListener('DOMContentLoaded', initTechLogoFallback);
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+') || text.includes(')')) {
                    stat.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);


const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, fadeObserverOptions);

document.querySelectorAll('.stat-card, .research-card, .mission-card, .cv-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const banner = document.querySelector('#banner .inner');
    if (banner && scrolled < window.innerHeight) {
        banner.style.transform = `translateY(${scrolled * 0.5}px)`;
        banner.style.opacity = 1 - (scrolled / 600);
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Remove preload
window.addEventListener('load', function() {
    setTimeout(() => document.body.classList.remove('is-preload'), 100);
});

// Fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});