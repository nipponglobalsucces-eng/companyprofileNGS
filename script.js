/* ==========================================================================
   KODE JAVASCRIPT FULL - NIPON GLOBAL SUCCES (ANIMASI BOLAK-BALIK PATEN)
   ========================================================================== */

// 1. SISTEM TRANSISI HYBRID SPA (KLIK MENU DENGAN FADE)

// Menyimpan posisi asli Galeri LPK agar bisa dikembalikan
// ketika user kembali ke Beranda.
let originalGalleryParent = null;
let originalGalleryNextSibling = null;

function showPage(targetId, navElement, event) {
    if(event) event.preventDefault();
    
    const toggleableIds = ['hero', 'stats', 'profile', 'program', 'legalitas', 'struktur', 'sejarah'];

    // Galeri LPK
    const gallery = document.getElementById('galeri-kegiatan');

    // Simpan posisi asli Galeri hanya sekali.
    if (gallery && !originalGalleryParent) {
        originalGalleryParent = gallery.parentNode;
        originalGalleryNextSibling = gallery.nextSibling;
    }

    // Matikan transisi body (FADE OUT)
    document.body.style.opacity = '0';
    
    setTimeout(() => {

        // ==============================================================
        // BERANDA
        // ==============================================================

        if (targetId === 'beranda') {

            toggleableIds.forEach(id => {
                const el = document.getElementById(id);

                if (el) {
                    el.style.display = 'block';
                    el.style.paddingTop = ''; 
                    el.style.minHeight = '';
                }
            });

            // Kembalikan Galeri ke posisi asli HTML
            if (gallery && originalGalleryParent) {
                if (originalGalleryNextSibling) {
                    originalGalleryParent.insertBefore(
                        gallery,
                        originalGalleryNextSibling
                    );
                } else {
                    originalGalleryParent.appendChild(gallery);
                }

                gallery.style.display = 'block';
                gallery.style.paddingTop = '';
                gallery.style.minHeight = '';
            }

        }

        // ==============================================================
        // MENU LAIN
        // ==============================================================

        else {

            /*
             * KHUSUS MENU GALERI LPK
             *
             * Saat klik menu Galeri LPK:
             * - Semua section lain disembunyikan
             * - Galeri ditampilkan sendiri
             * - Galeri diberi padding seperti halaman menu lainnya
             * - Galeri TIDAK dipindahkan ke dirinya sendiri
             */

            if (targetId === 'galeri-kegiatan') {

                toggleableIds.forEach(id => {
                    const el = document.getElementById(id);

                    if (el) {
                        el.style.display = 'none';
                    }
                });

                if (gallery) {
                    gallery.style.display = 'block';
                    gallery.style.paddingTop = '150px';
                    gallery.style.minHeight = '70vh';
                }

            }

            // ==========================================================
            // MENU LAIN SELAIN GALERI
            // ==========================================================

            else {

                toggleableIds.forEach(id => {
                    const el = document.getElementById(id);

                    if (el) {
                        if (id === targetId) {
                            el.style.display = 'block';
                            el.style.paddingTop = '150px'; 
                            el.style.minHeight = '70vh';
                        } else {
                            el.style.display = 'none';
                        }
                    }
                });

                // Saat menu lain dibuka, Galeri selalu diletakkan
                // tepat setelah konten/menu yang sedang dipilih.
                const targetElement = document.getElementById(targetId);

                if (gallery && targetElement) {
                    gallery.style.display = 'block';

                    targetElement.parentNode.insertBefore(
                        gallery,
                        targetElement.nextSibling
                    );
                }
            }
        }
        
        // Reset class animasi agar bisa masuk ulang saat halaman terbuka
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
            el.classList.remove('active');
        });

        // Posisikan scroll kembali ke atas secara instan
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // FADE IN
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
        
    }, 400); 
    
    const navLinks = document.querySelectorAll('.nav-links .nav-item, .btn-nav');
    navLinks.forEach(link => link.classList.remove('active-nav'));
    
    if(navElement) {
        navElement.classList.add('active-nav');
    } else {
        const correspondingNav = document.getElementById('nav-' + targetId);
        if(correspondingNav) correspondingNav.classList.add('active-nav');
    }

    const navMenu = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('mobile-menu');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if(menuToggle) menuToggle.classList.remove('active');
    }
}


// 2. LOGIKA PENUTUPAN VERIFIKASI AWAL (CAPTCHA GATE)
document.addEventListener('DOMContentLoaded', () => {
    const entryVerif = document.getElementById('entry-verification');
    const captchaContainer = document.getElementById('captcha-container');
    const captchaCheckbox = document.getElementById('captcha-checkbox');
    
    if(captchaContainer && entryVerif) {
        document.body.style.overflow = 'hidden';
        
        captchaContainer.addEventListener('click', () => {
            if(captchaCheckbox.classList.contains('loading') || captchaCheckbox.classList.contains('checked')) return;
            
            captchaCheckbox.classList.add('loading');
            
            setTimeout(() => {
                captchaCheckbox.classList.remove('loading');
                captchaCheckbox.classList.add('checked');
                
                setTimeout(() => {
                    entryVerif.classList.add('fade-out');
                    document.body.style.overflow = 'auto'; 
                }, 800);
            }, 1500);
        });
    }
});


// 3. FUNGSI MENGGANTI BAHASA DARI DROPDOWN
function setLanguage(langCode, btnText, event) {
    if(event) event.preventDefault();
    
    document.body.classList.remove('lang-en', 'lang-jp');
    if (langCode === 'en') {
        document.body.classList.add('lang-en');
    } else if (langCode === 'jp') {
        document.body.classList.add('lang-jp');
    }

    document.getElementById('current-lang-icon').textContent = btnText;
    
    const dropdown = document.getElementById("langDropdown");
    const arrow = document.getElementById("arrowLang");
    if(dropdown) dropdown.classList.remove('show-lang');
    if(arrow) arrow.classList.remove('rotate-arrow');
    
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('mobile-menu');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if(menuToggle) menuToggle.classList.remove('active');
    }
}


// 4. FUNGSI BUKA/TUTUP KOTAK DROPDOWN SAAT DIKLIK
function toggleLangDropdown(event) {
    event.preventDefault();
    event.stopPropagation(); 
    
    const dropdown = document.getElementById("langDropdown");
    const arrow = document.getElementById("arrowLang");
    
    if(dropdown) dropdown.classList.toggle("show-lang");
    if(arrow) arrow.classList.toggle("rotate-arrow");
}


// 5. FUNGSI BUKA/TUTUP MODAL PROGRAM
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
};


// 6. FUNGSI LIGHTBOX (ZOOM GAMBAR SERTIFIKAT)
window.openLightbox = function(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        const entryVerif = document.getElementById('entry-verification');
        if(entryVerif && !entryVerif.classList.contains('fade-out')) {
            // Biarkan
        } else {
            document.body.style.overflow = 'auto';
        }
    }
};


// 7. KLIK DI LUAR ELEMEN UNTUK MENUTUP POP-UP/DROPDOWN
window.onclick = function(event) {
    if (!event.target.closest('.dropdown-lang')) {
        const dropdown = document.getElementById("langDropdown");
        const arrow = document.getElementById("arrowLang");
        if (dropdown && dropdown.classList.contains('show-lang')) {
            dropdown.classList.remove('show-lang');
            if(arrow) arrow.classList.remove('rotate-arrow');
        }
    }

    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        const entryVerif = document.getElementById('entry-verification');
        if(entryVerif && !entryVerif.classList.contains('fade-out')) {
            // Biarkan
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    if (event.target.id === 'lightbox') {
        closeLightbox();
    }
};


// 8. FUNGSI PRELOADER (DURASI 3 DETIK)
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(function() {
            preloader.classList.add('fade-out');
        }, 3000); 
    }
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if(preloader && !preloader.classList.contains('fade-out')) {
        setTimeout(function() {
            preloader.classList.add('fade-out');
        }, 3000);
    }
});


// 9. LOGIKA UTAMA SAAT HALAMAN SELESAI DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if(navbar) navbar.classList.add('scrolled');
        } else {
            if(navbar) navbar.classList.remove('scrolled');
        }

        if(scrollProgress) {
            let scrollTotal = document.body.scrollHeight - window.innerHeight;
            let scrollValue = (window.scrollY / scrollTotal) * 100;
            scrollProgress.style.width = scrollValue + '%';
        }
    });

    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-item, .btn-nav').forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if(menuToggle) menuToggle.classList.remove('active');
            }
        });
    });

    // --- SCROLLSPY PINTAR ---
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute("id");
            }
        });
        document.querySelectorAll(".nav-links a.nav-item").forEach(a => {
            a.classList.remove("active-nav");
            if (a.getAttribute("href") === "#" + current) {
                a.classList.add("active-nav");
            }
        });
    });

    // --- INTERSECTION OBSERVER (KUNCI ANIMASI BOLAK-BALIK PATEN) ---
    const revealOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px 0px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                if (entry.target.classList.contains('stats-container')) {
                    triggerCounters(entry.target);
                }
            } else {
                // Cabut class active agar bisa diulang
                entry.target.classList.remove("active");
                if (entry.target.classList.contains('stats-container')) {
                    resetCounters(entry.target);
                }
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Fungsi Penghitung Angka ---
    function triggerCounters(container) {
        if (container.dataset.animating === 'true') return;
        container.dataset.animating = 'true';
        
        const counters = container.querySelectorAll('.stat-number');
        const duration = 2000; 

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const startTime = performance.now();
            
            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                
                counter.innerText = Math.ceil(easeProgress * target);
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(updateCount);
        });
    }

    // --- Fungsi Reset Angka ke '0' saat keluar layar ---
    function resetCounters(container) {
        container.dataset.animating = 'false';
        const counters = container.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            counter.innerText = '0';
        });
    }
    
    // --- FUNGSI WA ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('fname').value.trim();
            const age = document.getElementById('fage').value.trim();
            const phone = document.getElementById('fphone').value.trim();
            const subjectElement = document.getElementById('fsubject');
            const subject = subjectElement.options[subjectElement.selectedIndex].text;
            const message = document.getElementById('fmessage').value.trim();
            
            if(name === "" || age === "" || phone === "" || message === "") {
                alert("Mohon lengkapi semua kolom dengan benar sebelum mengirim pesan.");
                return; 
            }

            const waNumber = "628216161602"; 
            
            const waText = `Halo Admin NIPON GLOBAL SUCCES,%0A%0ASaya berminat untuk mendaftar / bertanya informasi.%0A%0A*Nama:* ${name}%0A*Usia:* ${age} Tahun%0A*No. WA:* ${phone}%0A*Minat Program:* ${subject}%0A%0A*Pesan / Riwayat Pendidikan:*%0A${message}%0A%0AMohon arahannya. Terima kasih.`;

            window.open(
                `https://wa.me/${waNumber}?text=${waText}`,
                '_blank'
            );
        });
    }
});
