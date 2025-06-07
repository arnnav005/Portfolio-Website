document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close hamburger menu on click if open
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
    const numElements = 50; // Number of floating elements

    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Randomize initial position and size
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`; // Start anywhere on the screen initially
        const size = Math.random() * 3 + 1; // Size between 1px and 4px
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;

        // Randomize animation duration and delay
        element.style.animationDuration = `${Math.random() * 10 + 5}s`; // 5 to 15 seconds
        element.style.animationDelay = `${Math.random() * 5}s`; // 0 to 5 seconds delay

        floatingElementsContainer.appendChild(element);
    }

    // Intersection Observer for fade-in animations on sections
    const faders = document.querySelectorAll('section');
    const appearOptions = {
        threshold: 0.2, // When 20% of the section is in view
        rootMargin: "0px 0px -50px 0px" // Start animating a bit before it enters full view
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                appearOnScroll.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Initialize EmailJS with your Public Key
    // Make sure you have this script tag in your HTML:
    // <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    emailjs.init("5__FfUE1mSlcRnTxA"); // YOUR PUBLIC KEY GOES HERE

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            formStatus.style.display = 'none'; // Hide previous status
            formStatus.classList.remove('success', 'error'); // Clear previous styles
            formStatus.textContent = ''; // Clear previous message

            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = true; // Disable button to prevent multiple submissions
            submitBtn.textContent = 'Sending...'; // Change button text

            // Use your provided Service ID and Template ID
            emailjs.sendForm('service_e0ug0wg', 'template_dj6jeec', this)
                .then(() => {
                    formStatus.textContent = 'Thank you for reaching out to me, I will reply soon.';
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block';
                    contactForm.reset(); // Clear the form fields
                }, (error) => {
                    console.error('EmailJS Failed:', error);
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                    formStatus.classList.add('error');
                    formStatus.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.disabled = false; // Re-enable button
                    submitBtn.textContent = 'Send Message'; // Restore button text
                    // Hide the status message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.textContent = '';
                        formStatus.classList.remove('success', 'error');
                    }, 5000);
                });
        });
    }
});