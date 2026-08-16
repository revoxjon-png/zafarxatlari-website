// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                updateActiveLink(href);
            }
        }
    });
});

// Update active link on scroll
function updateActiveLink(href) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="${href}"]`)?.classList.add('active');
}

// Window scroll event to update active link
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    if (currentSection) {
        updateActiveLink(`#${currentSection}`);
    }
});

// Calculate price based on distance and weight
function calculatePrice() {
    const distance = document.getElementById('distance').value;
    const weight = document.getElementById('weight').value;

    if (!distance || !weight) {
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    let basePrice = 0;

    switch (distance) {
        case '5':
            basePrice = 5000;
            break;
        case '10':
            basePrice = 8000;
            break;
        case '15':
            basePrice = 12000;
            break;
        case '20':
            basePrice = 15000;
            break;
        case '25':
            basePrice = 20000;
            break;
        default:
            basePrice = 5000;
    }

    // Add extra charge for weight (500 so'm per kg)
    const weightCharge = weight * 500;
    const totalPrice = basePrice + weightCharge;

    document.getElementById('totalPrice').textContent = totalPrice.toLocaleString('uz-UZ');
}

// Order now function
function orderNow() {
    const distance = document.getElementById('distance').value;
    const weight = document.getElementById('weight').value;

    if (!distance || !weight) {
        alert('Iltimos, masofani va vazni tanlang!');
        return;
    }

    const totalPrice = document.getElementById('totalPrice').textContent;
    const message = `Salom! Men ${weight}kg vozda ${distance}km masofaga yetkazib berish buyurtma qilishni xohlayapman. Jami summa: ${totalPrice} so'm.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Open Telegram
    window.open(`https://t.me/zafarxatlari?start=${encodedMessage}`, '_blank');
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    // Create message for Telegram
    const telegramMessage = `Yangi buyurtma:\n\nIsm: ${name}\nTelefon: ${phone}\nEmail: ${email}\nXabar: ${message}`;
    const encodedMessage = encodeURIComponent(telegramMessage);

    // Send to Telegram
    window.open(`https://t.me/zafarxatlari?start=${encodedMessage}`, '_blank');

    // Reset form
    form.reset();
    alert('Xabaringiz yuborildi! Tez orada sizga javoab beramiz.');
}

// Add some animation to service cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Analytics tracking (optional - add your own tracking code)
console.log('Zafarxatlari.uz veb-sayt yuklandi');
