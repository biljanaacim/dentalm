// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('ftco-navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HERO SLIDER =====
(function() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  
  setInterval(function() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
})();

// ===== FADE IN ANIMATION =====
function handleFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(function(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 50) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleFadeIn);
window.addEventListener('load', handleFadeIn);

// ===== ACTIVE NAV LINK =====
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-item');
  navLinks.forEach(function(item) {
    item.classList.remove('active');
    const link = item.querySelector('.nav-link');
    if (link && link.getAttribute('href') === currentPage) {
      item.classList.add('active');
    }
  });
})();

// ===== MOBILE HAMBURGER MENU - Close when clicking a link =====
$(document).ready(function() {
  // Ovo zatvara meni kada se klikne na link (važno za mobilni)
  $('.navbar-nav .nav-link').on('click', function() {
    if (window.innerWidth <= 991) {
      $('#ftco-nav').collapse('hide');
    }
  });
});

// ===== GALLERY MODAL (za 3 synergy slike) =====
// ===== GALLERY MODAL - radi na index.html i gallery.html =====
$(document).ready(function() {
  // Pronalazi sve gallery-item elemente na stranici
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return;

  // Prikuplja sve src slike
  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return img ? img.src : '';
  }).filter(src => src !== '');

  let currentIndex = 0;

  const modalImage = document.getElementById('modal-image');
  const galleryModal = $('#galleryModal');

  function showModal(index) {
    if (!modalImage || !galleryModal) return;
    currentIndex = index;
    modalImage.src = images[currentIndex];
    galleryModal.modal('show');
  }

  // Klik na bilo koju sliku u galeriji
  galleryItems.forEach((item, index) => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
      showModal(index);
    });
  });

  // Strelica levo
  const prevBtn = document.getElementById('modal-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImage.src = images[currentIndex];
    });
  }

  // Strelica desno
  const nextBtn = document.getElementById('modal-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      modalImage.src = images[currentIndex];
    });
  }

  // Bonus: zatvaranje modal-a kad se klikne na sliku (opciono)
  if (modalImage) {
    modalImage.addEventListener('click', function(e) {
      e.stopPropagation(); // sprečava zatvaranje ako klikneš direktno na sliku
    });
  }
});