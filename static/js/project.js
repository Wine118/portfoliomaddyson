const numProjects = 1;

const slidesCount = [15];

const projectSlides = {};

for (let p=1; p<= numProjects; p++) {
    projectSlides[p] = [];
    const slideNum = slidesCount[p - 1];

    for (let s= 1; s<= slideNum; s++){
        projectSlides[p].push(`static/images/project${p}/Slide${s}.JPG`);
    }
}


document.querySelectorAll(".project-gallery").forEach(gallery => {
   const projectId = gallery.dataset.project;
   const slides = projectSlides[projectId];
   let currentIndex = 0;
   
   const imgElement = gallery.querySelector(".project-gallery-img");
   const prevBtn = gallery.querySelector(".prev");
   const nextBtn = gallery.querySelector(".next");

   function showImage(index){
    imgElement.src = slides[index];
   }

   prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showImage(currentIndex);
   });

   nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showImage(currentIndex);
   });

//    Open fullscreen lightbox on image click
   imgElement.addEventListener("click", 
                                () => openLightbox(projectId, currentIndex));


   showImage(currentIndex);
});



// ==== Fullscreen Lightbox Logic ===

const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
const closeBtn = lightbox.querySelector(".close");
lightbox.style.zIndex = 1100;
let activeProject = null;
let activeIndex = 0;

function openLightbox(projectId,index){
    activeProject = projectId;
    activeIndex = index;
    lightbox.style.display = "flex";
    showLightboxImage();
}

function showLightboxImage() {
    const slides = projectSlides[activeProject];
    lightboxImg.src = slides[activeIndex];
}

lightboxPrev.addEventListener("click", () => {
    const slides = projectSlides[activeProject];
    activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    showLightboxImage();
});

lightboxNext.addEventListener("click", () => {
    const slides = projectSlides[activeProject];
    activeIndex = (activeIndex + 1) % slides.length;
    showLightboxImage();
});

closeBtn.addEventListener("click", () => lightbox.style.display = "none");

lightbox.addEventListener("click", e => {
    if(e.target === lightbox) lightbox.style.display = "none";
});

document.addEventListener("keydown", e => {
    if(!lightbox.style.display || lightbox.style.display === "none") return;

    switch(e.key) {
        case "Escape":
            lightbox.style.display = "none";
            break;
        case "ArrowLeft":
            const slidesPrev = projectSlides[activeProject];
            activeIndex = (activeIndex - 1 + slidesPrev.length) % slidesPrev.length;
            showLightboxImage();
            break;
        case "ArrowRight":
            const slidesNext = projectSlides[activeProject];
            activeIndex = (activeIndex + 1) % slidesNext.length;
            showLightboxImage();
            break;
    }
});

