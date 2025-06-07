document.addEventListener('DOMContentLoaded', () => {
    // EmailJS Init
    emailjs.init("5__FfUE1mSlcRnTxA");

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });

            if (document.querySelector('.nav-links').classList.contains('active')) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Floating animation dots
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

    // Section fade-in animation
    const faders = document.querySelectorAll('section');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Contact Form with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            formStatus.style.display = 'none';
            formStatus.classList.remove('success', 'error');
            formStatus.textContent = '';

            emailjs.sendForm('service_e0ug0wg', 'template_dj6jeec', this)
                .then(() => {
                    formStatus.textContent = '✅ Thank you! Your message has been sent.';
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block';
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    formStatus.textContent = '❌ Failed to send. Please try again.';
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
