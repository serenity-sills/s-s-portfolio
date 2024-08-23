/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
       let top = window.scrollY;
       let offset = sec.offsetTop - 150;
       let height = sec.offsetHeight;
       let id = sec.getAttribute('id');

       if(top >= offset && top < offset + height) {
        navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); 
        });
       }
    });

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/
ScrollReveal({
    reset: true,
    distance: '80px', 
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact-form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
   strings: ['Frontend Developer', 'Graphic Designer'],
   typeSpeed: 100,
   backSpeed: 100,
   backDelay: 1000,
   loop: true
});

/*==================== Clear contact form and redirect after submission ====================*/
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    
    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            const popup = document.getElementById('popup');
            popup.classList.add('show'); // Show the custom pop-up
            this.reset(); // Clear the form fields
            setTimeout(function() {
                popup.classList.remove('show'); // Hide the pop-up after 1 second
                window.location.href = "#home"; // Redirect to home section
            }, 1000); // Adjust the delay if needed
        } else {
            alert("There was a problem with your submission. Please try again.");
        }
    }).catch(error => {
        alert("There was a problem with your submission. Please try again.");
    });
});
