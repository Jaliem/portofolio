// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.name.value;
    const email = this.email.value;
    const subject = this.subject.value;
    const message = this.message.value;
    const contactMethod = document.querySelector('input[name="contact-method"]:checked').value;

    // Log form data (for demonstration purposes)
    console.log('Form submitted!');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Contact Method:', contactMethod);

    // Handle contact method
    if (contactMethod === 'whatsapp') {
        // WhatsApp link (replace 1234567890 with your actual WhatsApp number)
        const whatsappNumber = '+6285156506975';
        const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    } else {
        // Email link
        const mailtoLink = `mailto:jasonliem2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;
        window.location.href = mailtoLink;
    }

    // Clear the form
    this.reset();

    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = 'Thank you for your message. I will get back to you soon!';
    successMessage.classList.remove('hidden');

    // Remove the success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
});

// Add a scroll event listener to change header style on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'var(--secondary-color)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Typing effect for the hero section
const heroText = "Passionate about technology and software development.";
const heroTextElement = document.getElementById('typing-text');
let i = 0;

function typeWriter() {
    if (i < heroText.length) {
        heroTextElement.innerHTML += heroText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start the typing effect when the page loads
window.addEventListener('load', typeWriter);

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize theme based on user preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const barBottom = bar.getBoundingClientRect().bottom;
        if (barTop >= 0 && barBottom <= window.innerHeight) {
            bar.style.width = bar.getAttribute('data-width');
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                img.setAttribute('src', src);
                img.classList.add('fade-in');
                observer.disconnect();
            }
        });
    });

    io.observe(target);
};

lazyImages.forEach(lazyLoad);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero');
    const scrollPosition = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);

        const tooltipRect = tooltip.getBoundingClientRect();
        tooltipElement.style.top = tooltipRect.bottom + 10 + 'px';
        tooltipElement.style.left = tooltipRect.left + (tooltipRect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
    });

    tooltip.addEventListener('mouseleave', () => {
        const tooltipElement = document.querySelector('.tooltip');
        if (tooltipElement) {
            tooltipElement.remove();
        }
    });
});

// Add custom cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Add scroll-to-top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '&uarr;';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add custom styles for the new features
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    }
    .custom-cursor.clicking {
        transform: scale(0.8);
        background-color: var(--primary-color);
    }
    .tooltip {
        position: absolute;
        background-color: var(--secondary-color);
        color: var(--background-color);
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1000;
    }
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--background-color);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        transition: var(--transition);
    }
    .scroll-to-top:hover {
        background-color: var(--secondary-color);
    }
`;
document.head.appendChild(style);
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.getElementById("main-nav")

  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active")

    // Change icon based on menu state
    const icon = this.querySelector("i")
    if (mainNav.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Close menu when a link is clicked
  const navLinks = mainNav.querySelectorAll("a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active")
      menuToggle.querySelector("i").classList.remove("fa-times")
      menuToggle.querySelector("i").classList.add("fa-bars")
    })
  })
})