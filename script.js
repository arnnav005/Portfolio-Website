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

    // Contact form submission status message
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        var form = this;
        var status = document.getElementById('formStatus');
        form.addEventListener('reset', function() {
            status.textContent = "Thank you for reaching out! I'll reply soon.";
            status.className = "success";
        });
    });
});

