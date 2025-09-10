
    const images = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex = 0;

    
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        currentIndex = index;
      });
    });

    
    function closeLightbox() {
      lightbox.style.display = 'none';
    }

   
    function changeImage(step) {
      currentIndex = (currentIndex + step + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
    }

   
    function filterImages(category) {
      images.forEach(img => {
        img.style.display = (category === 'all' || img.classList.contains(category)) 
          ? 'block' : 'none';
      });
    }
  
