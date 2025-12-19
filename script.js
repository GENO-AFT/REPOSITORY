// script.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const headerContent = document.querySelector('.header-content');

    menuToggle.addEventListener('click', () => {
        headerContent.classList.toggle('menu-active');
    });

    // --- Navigation View Toggle Logic (SPA behavior) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const viewHome = document.getElementById('view-home');
    const viewJoin = document.getElementById('view-join');
    const viewServices = document.getElementById('view-services');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get target (home, services, or join)
            const target = link.getAttribute('data-target');
            
            // If it's a view switching link
            if(target) {
                e.preventDefault();
                
                // Scroll to top
                window.scrollTo(0,0);

                // Hide all views first
                viewHome.style.display = 'none';
                viewJoin.style.display = 'none';
                viewServices.style.display = 'none';

                // Show the selected view
                if(target === 'home') {
                    viewHome.style.display = 'block';
                } else if(target === 'services') {
                    viewServices.style.display = 'block';
                } else if(target === 'join') {
                    viewJoin.style.display = 'flex';
                }

                // Close mobile menu if open
                headerContent.classList.remove('menu-active');
            }
        });
    });

    // --- Existing Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const currentNum = document.getElementById('current-slide-num');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Check if elements exist before running slider logic (prevents errors on other pages)
    if(slides.length > 0) {
        function updateSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            progressDots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            progressDots[index].classList.add('active');
            
            currentNum.textContent = `0${index + 1}`;
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            updateSlide(currentSlide);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        let slideInterval = setInterval(nextSlide, 6000);
        
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSection.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 6000));
    }

    // Service Card Animation (for both home and services pages)
    const serviceCards = document.querySelectorAll('.service-card');
    const expandedServiceCards = document.querySelectorAll('.service-card.expanded');
    
    // Combine both types of service cards
    const allServiceCards = [...serviceCards, ...expandedServiceCards];
    
    if(allServiceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        allServiceCards.forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    }
});