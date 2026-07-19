document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form submission
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = reservationForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;

            // Extract form inputs
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;

            submitBtn.textContent = 'Confirming...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Use absolute path if accessed via local file:// protocol, otherwise use relative path
            const apiOrigin = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

            fetch(`${apiOrigin}/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, date, guests })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save reservation');
                }
                return response.json();
            })
            .then(data => {
                submitBtn.textContent = 'Reservation Confirmed!';
                submitBtn.style.backgroundColor = '#4caf50';
                submitBtn.style.color = '#fff';
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    reservationForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting reservation:', error);
                submitBtn.textContent = 'Failed to Connect';
                submitBtn.style.backgroundColor = '#d32f2f';
                submitBtn.style.color = '#fff';
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }

    // Smooth reveal animation for menu cards (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s`;
        observer.observe(card);
    });
});
