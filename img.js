const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;
let images = [];

galleryItems.forEach((item, index) => {
  const img = item.querySelector('img');
  images.push(img.src);

  item.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(images[currentIndex]);
  });
});

function openLightbox(src) {
  lightbox.classList.add('show');
  lightboxImg.src = src;
}

function closeLightbox() {
  lightbox.classList.remove('show');
}

closeBtn.addEventListener('click', closeLightbox);

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
});

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

// Filter logic
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    galleryItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
const uploadInput = document.getElementById('uploadInput');

uploadInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);

  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target.result;

      // Create new gallery item
      const newItem = document.createElement('div');
      newItem.classList.add('gallery-item', 'uploaded');
      const newImg = document.createElement('img');
      newImg.src = src;
      newImg.alt = "Uploaded Image";

      newItem.appendChild(newImg);
      document.querySelector('.gallery').appendChild(newItem);

      // Add to image array
      images.push(src);
      const thisIndex = images.length - 1;

      // Add lightbox functionality
      newItem.addEventListener('click', () => {
        currentIndex = thisIndex;
        openLightbox(images[currentIndex]);
      });
    };

    reader.readAsDataURL(file);
  });

  uploadInput.value = "";
});
let zoomLevel = 1;
const lightboxImage = document.getElementById('lightbox-img');

const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetZoomBtn = document.getElementById('resetZoom');

zoomInBtn.addEventListener('click', () => {
  zoomLevel += 0.2;
  updateZoom();
});

zoomOutBtn.addEventListener('click', () => {
  zoomLevel = Math.max(0.2, zoomLevel - 0.2);
  updateZoom();
});

resetZoomBtn.addEventListener('click', () => {
  zoomLevel = 1;
  updateZoom();
});

function updateZoom() {
  lightboxImage.style.transform = `scale(${zoomLevel})`;
}

// Scroll to zoom
lightboxImage.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    zoomLevel += 0.1;
  } else {
    zoomLevel = Math.max(0.2, zoomLevel - 0.1);
  }
  updateZoom();
});

// Reset zoom when lightbox is closed
function closeLightbox() {
  lightbox.classList.remove('show');
  zoomLevel = 1;
  updateZoom();
}
