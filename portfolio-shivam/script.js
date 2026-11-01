document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks      = document.getElementById("navLinks");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.toggle("ph-list");
        icon.classList.toggle("ph-x");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = mobileMenuBtn.querySelector("i");
            icon.classList.add("ph-list");
            icon.classList.remove("ph-x");
        });
    });

    // 2. Sticky Navbar
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // 3. Scroll Reveal
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Certificate Modal
    const modal      = document.getElementById("imageModal");
    const modalImg   = document.getElementById("modalImg");
    const closeBtn   = document.querySelector(".modal-close");
    const modalCapt  = document.getElementById("modalCaption");

    document.querySelectorAll(".view-cert-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.getAttribute("data-cert");
            if (modalCapt) {
                modalCapt.textContent = this.getAttribute("data-title") || "Certificate of Completion";
            }
        });
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    if (modal)    modal.onclick    = e => { if (e.target !== modalImg) modal.style.display = "none"; };
    document.addEventListener("keydown", e => { if (e.key === "Escape") modal.style.display = "none"; });

});

