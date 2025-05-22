/*
 * arsehole.ca - A website that looks like it costs $1M but has no purpose
 * JavaScript for animations, charts, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        } catch (error) {
            console.log('Error initializing AOS:', error);
        }
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.padding = '1rem 0';
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // Animation duration in milliseconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Performance Chart
    const performanceChart = document.getElementById('performanceChart');
    if (performanceChart && typeof Chart !== 'undefined') {
        try {
            const ctx = performanceChart.getContext('2d');
            new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Synergy',
                        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Innovation',
                        data: [28, 48, 40, 19, 86, 27, 90, 85, 70, 60, 65, 75],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Disruption',
                        data: [45, 25, 40, 60, 30, 45, 55, 65, 75, 85, 90, 100],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
            });
        } catch (error) {
            console.log('Error initializing performance chart:', error);
            performanceChart.parentNode.innerHTML = '<div class="chart-fallback">Chart visualization unavailable</div>';
        }
    }

    // Distribution Chart
    const distributionChart = document.getElementById('distributionChart');
    if (distributionChart && typeof Chart !== 'undefined') {
        try {
            const ctx = distributionChart.getContext('2d');
            new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Blockchain', 'AI/ML', 'Cloud', 'IoT'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                cutout: '70%'
            }
            });
        } catch (error) {
            console.log('Error initializing distribution chart:', error);
            distributionChart.parentNode.innerHTML = '<div class="chart-fallback">Chart visualization unavailable</div>';
        }
    }

    // Add fallback styles for charts
    const style = document.createElement('style');
    style.textContent = `
        .chart-fallback {
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.05);
            border-radius: 10px;
            color: #666;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);

    // Form submission prevention (for demo purposes)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    this.reset();
                }, 2000);
            }
        });
    });

    // Testimonial slider auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let scrollAmount = 0;
        const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
        const itemWidth = testimonialItems[0].offsetWidth + 32; // Width + gap
        
        setInterval(() => {
            scrollAmount += itemWidth;
            if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.offsetWidth) {
                scrollAmount = 0;
            }
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Random buzzword generator for extra corporate flair
    const buzzwords = [
        'Synergy', 'Blockchain', 'AI-Powered', 'Disruptive', 'Innovative', 
        'Quantum', 'Cloud-Native', 'Paradigm Shift', 'Digital Transformation', 
        'Ecosystem', 'Leverage', 'Scalable', 'Agile', 'Robust', 'Enterprise-Grade',
        'Next-Generation', 'Revolutionary', 'Cutting-Edge', 'State-of-the-Art',
        'Mission-Critical', 'Seamless Integration', 'Turnkey Solution'
    ];

    // Easter egg: Console message
    console.log('%c Welcome to arsehole.ca! ', 'background: #3a0ca3; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Our ' + buzzwords[Math.floor(Math.random() * buzzwords.length)] + ' website uses ' + 
                buzzwords[Math.floor(Math.random() * buzzwords.length)] + ' technology to ' +
                buzzwords[Math.floor(Math.random() * buzzwords.length)] + ' your experience.', 
                'font-size: 12px;');
    console.log('%c Remember: We look like we cost $1M, but we have no actual purpose! ', 'background: #f72585; color: white; font-size: 12px; padding: 5px;');
});
