/* =====================================================
   MENÚ MÓVIL
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");
    }

});


/* =====================================================
   CERRAR MENÚ AL HACER CLICK
===================================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


/* =====================================================
   BOTÓN VOLVER ARRIBA
===================================================== */

const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        btnTop.classList.add("show");

    } else {

        btnTop.classList.remove("show");

    }

});


btnTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   CONTADORES
===================================================== */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));


        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

                return;
            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        };


        updateCounter();

    });

}


const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

                statsObserver.disconnect();

            }

        },

        {
            threshold: 0.3
        }

    );


statsObserver.observe(statsSection);


/* =====================================================
   TESTIMONIOS
===================================================== */

const testimonials =
    document.querySelectorAll(".testimonial");

const dots =
    document.querySelectorAll(".dot");

const prevButton =
    document.getElementById("prevTestimonial");

const nextButton =
    document.getElementById("nextTestimonial");

let currentTestimonial = 0;


function showTestimonial(index) {

    testimonials.forEach(testimonial => {

        testimonial.classList.remove("active");

    });


    dots.forEach(dot => {

        dot.classList.remove("active");

    });


    testimonials[index].classList.add("active");

    dots[index].classList.add("active");

    currentTestimonial = index;

}


nextButton.addEventListener("click", () => {

    let next =
        currentTestimonial + 1;

    if (next >= testimonials.length) {
        next = 0;
    }

    showTestimonial(next);

});


prevButton.addEventListener("click", () => {

    let previous =
        currentTestimonial - 1;

    if (previous < 0) {
        previous = testimonials.length - 1;
    }

    showTestimonial(previous);

});


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showTestimonial(index);

    });

});


/* =====================================================
   CAMBIO AUTOMÁTICO DE TESTIMONIOS
===================================================== */

setInterval(() => {

    let next =
        currentTestimonial + 1;

    if (next >= testimonials.length) {
        next = 0;
    }

    showTestimonial(next);

}, 5000);


/* =====================================================
   FORMULARIO → WHATSAPP
===================================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const nombre =
        document.getElementById("nombre").value.trim();

    const telefono =
        document.getElementById("telefono").value.trim();

    const servicio =
        document.getElementById("servicio").value;

    const mensaje =
        document.getElementById("mensaje").value.trim();


    if (!nombre ||
        !telefono ||
        !servicio ||
        !mensaje) {

        alert(
            "Por favor completa todos los campos."
        );

        return;
    }


    const texto =

        `Hola, soy ${nombre}.%0A%0A` +

        `📱 Teléfono: ${telefono}%0A` +

        `🔧 Servicio: ${servicio}%0A%0A` +

        `💻 Problema:%0A${mensaje}`;


    /*
       IMPORTANTE:
       Cambia este número por tu número real.

       Formato:
       57 + número

       Ejemplo:
       573001234567
    */

    const numeroWhatsApp =
        "573123154810";


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${texto}`;


    window.open(url, "_blank");

});


/* =====================================================
   MODO OSCURO
===================================================== */

const darkModeToggle =
    document.getElementById("darkModeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    updateThemeButton();

}


function updateThemeButton() {

    const icon =
        darkModeToggle.querySelector("i");

    const text =
        darkModeToggle.querySelector("span");


    if (document.body.classList.contains("dark-mode")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        text.textContent = "Modo claro";

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        text.textContent = "Modo oscuro";

    }

}


darkModeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }


    updateThemeButton();

});


/* =====================================================
   EFECTO HEADER AL HACER SCROLL
===================================================== */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(15, 23, 42, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});