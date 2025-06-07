document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (document.querySelector('.nav-links').classList.contains('active')) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Animate floating elements in Hero Section
    const floatingElementsContainer = document.querySelector('.floating-elements');
    const numElements = 50;

    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.animationDuration = `${Math.random() * 10 + 5}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        floatingElementsContainer.appendChild(element);
    }

    // Intersection Observer for fade-in animations on sections
    const faders = document.querySelectorAll('section');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // EmailJS Setup
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        if (typeof emailjs === 'undefined') {
            console.warn("EmailJS SDK not loaded. Make sure to include it in your HTML.");
            window.emailjs = {
                sendForm: (serviceId, templateId, form, userId) => {
                    return new Promise((resolve, reject) => {
                        console.log("Mock EmailJS.sendForm:", { serviceId, templateId, form, userId });
                        setTimeout(() => {
                            Math.random() > 0.1 ? resolve({ status: 200 }) : reject({ status: 500 });
                        }, 1000);
                    });
                }
            };
        } else {
            // Initialize with your Public Key
            emailjs.init("5__FfUE1mSlcRnTxA");
        }

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            formStatus.style.display = 'none';
            formStatus.classList.remove('success', 'error');
            formStatus.textContent = '';

            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs.sendForm('service_e0ug0wg', 'template_dj6jeec', this)
                .then(() => {
                    formStatus.textContent = 'Thank you for reaching out to me, I will reply soon.';
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block';
                    contactForm.reset();
                }, (error) => {
                    console.error('EmailJS Failed:', error);
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                    formStatus.classList.add('error');
                    formStatus.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.textContent = '';
                        formStatus.classList.remove('success', 'error');
                    }, 5000);
                });
        });
    }
});
