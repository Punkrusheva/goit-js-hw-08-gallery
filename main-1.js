import imageRef from "./gallery-items.js";

const refs = {
  openModal: document.querySelector("div.lightbox"),
  closeModal: document.querySelector("button.lightbox__button"),
  galleryContainer: document.querySelector(".js-gallery"),
  modalOpenGalleryItem: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  /*modalPreviousPhoto: document.querySelector("button.lightbox__prev__button"),
  modalNextPhoto: document.querySelector("button.lightbox__next__button"),*/
  
};

const galleryMarkap = createGalleryCardsMarkup(imageRef);

function createGalleryCardsMarkup(imageRef) {
  const elements = [];
  for (let i = 0; i < imageRef.length; i += 1) {
    const option = imageRef[i];
    //console.log(imageRef[i]);
    let galleryEl = document.createElement('li');
    galleryEl.setAttribute('class', `gallery__item`);

    const galleryA = document.createElement("a");
    galleryA.setAttribute('class', `gallery__link`);
    galleryA.setAttribute('href', `${imageRef[i].original}`);

    const galleryImg = document.createElement("img");
    galleryImg.setAttribute('class', `gallery__image`);
    galleryImg.setAttribute('src', `${imageRef[i].preview}`);
    galleryImg.setAttribute('data-source', `${imageRef[i].original}`);
    galleryImg.setAttribute('alt', `${imageRef[i].description}`);

    galleryEl.append(galleryA);
    galleryA.append(galleryImg);
    elements.push(galleryEl);
    //console.log(galleryEl);
    //console.log(elements);
  }

  return refs.galleryContainer.append(...elements);
}
createGalleryCardsMarkup(imageRef);
   
refs.galleryContainer.addEventListener("click", onOpenModal);
refs.closeModal.addEventListener("click", onCloseModal);
refs.lightboxOverlay.addEventListener("click", onOverlayClick);

function onOpenModal(evt) {
  evt.preventDefault()
  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onArrowRightKeyPress);
  /*refs.modalPreviousPhoto.addEventListener("click", onArrowRightKeyPress);
  refs.modalNextPhoto.addEventListener("click", onArrowRightKeyPress);*/
  
  let imagesOriginalArr = [];
  imageRef.forEach((item) => {
  imagesOriginalArr.push(item.original);
  });
  //console.log(imagesOriginalArr);

 function onArrowRightKeyPress(e) {
  let index = imagesOriginalArr.indexOf(refs.modalOpenGalleryItem.src);
  if (e.code === `ArrowRight`) {
    if (index < imagesOriginalArr.length - 1) {
      refs.modalOpenGalleryItem.setAttribute("src", imagesOriginalArr[index + 1]);
    } else {
      index = -1;
      refs.modalOpenGalleryItem.setAttribute("src", imagesOriginalArr[index + 1]);
    }
  }
  if (e.code === `ArrowLeft`) {
    if (index === 0) {
      index = imagesOriginalArr.length;
      refs.modalOpenGalleryItem.setAttribute("src", imagesOriginalArr[index - 1]);
    } else refs.modalOpenGalleryItem.setAttribute("src", imagesOriginalArr[index - 1]);
  }
  }
  
  if (evt.target.nodeName !== 'IMG') { console.log(evt.target.nodeName); return; }
  {
    refs.openModal.classList.add("is-open");
    console.log(`Модалка открыта`);

    refs.modalOpenGalleryItem.setAttribute(
      "src",
      `${evt.target.getAttribute("data-source")}`
    );
    refs.modalOpenGalleryItem.setAttribute(
      "alt",
      `${evt.target.getAttribute("alt")}`
    );
  };
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  refs.openModal.classList.remove("is-open");
  console.log(`Модалка закрыта`);
  refs.modalOpenGalleryItem.setAttribute("src", ``);
  refs.modalOpenGalleryItem.setAttribute("alt", ``);
}

function onOverlayClick(evt) {
  //console.log(evt.currentTarget);
  //console.log(evt.target);

  if (evt.currentTarget === evt.target) {
    console.log(`Клик по бекдропу`);
    onCloseModal();
  }
}

function onEscKeyPress(evt) {
  console.log(evt.code);

  if (evt.code === "Escape") {
    onCloseModal();
  }
}