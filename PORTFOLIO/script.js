const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

// Toggle mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close menu after clicking a navigation link
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        navItems.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

// Highlight the active section while scrolling
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-20% 0px -60% 0px"
        }
    );

    sections.forEach((section) => observer.observe(section));
}

// Automatically update copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();