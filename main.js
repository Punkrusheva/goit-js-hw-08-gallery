import imageRef from "./gallery-items.js";

const refs = {
  openModal: document.querySelector("div.lightbox"),
  closeModal: document.querySelector("button.lightbox__button"),
  galleryContainer: document.querySelector(".js-gallery"),
  gallery: document.querySelectorAll(".js-gallery"),
  modalOpenGalleryItem: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  /*modalPreviousPhoto: document.querySelector("button.lightbox__prev__button"),
  modalNextPhoto: document.querySelector("button.lightbox__next__button"),*/
};
const galleryMarkap = createGalleryCardsMarkup(imageRef);

refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkap);
   
function createGalleryCardsMarkup({ preview, original, description }) {
  return imageRef
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
          >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join(``);
}

refs.galleryContainer.addEventListener("click", onOpenModal);
refs.closeModal.addEventListener("click", onCloseModal);
refs.lightboxOverlay.addEventListener("click", onOverlayClick);

function onOpenModal(evt) {
  evt.preventDefault()
  window.addEventListener("keydown", onEscKeyPress);
  
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
    /*refs.modalPreviousPhoto.addEventListener("click", onPreviousPhoto);
    refs.modalNextPhoto.addEventListener("click", onNextPhoto);
    function onPreviousPhoto() {
      console.log('Prev');
      console.log(evt.target.parentNode.parentNode.previousSibling);
    //console.log(refs.modalOpenGalleryItem.nextSibling);
    }
    function onNextPhoto() {
      console.log('Next');
      console.log(evt.target.parentNode.parentNode.nextSibling);
    //console.log(refs.modalOpenGalleryItem.nextSibling);
    }*/
  }
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