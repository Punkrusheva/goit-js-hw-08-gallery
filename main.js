import imageRef from "./gallery-items.js";

const refs = {
  openModal: document.querySelector("div.lightbox"),
  closeModal: document.querySelector("button.lightbox__button"),
  galleryContainer: document.querySelector(".js-gallery"),
  modalOpenGalleryItem: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};
console.log(refs.modalOpenGalleryItem);
const galleryMarkap = createGalleryCardsMarkup(imageRef);

refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkap);

function createGalleryCardsMarkup(imageRef) {
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
//href="${original}"
refs.galleryContainer.addEventListener("click", onOpenModal);
refs.closeModal.addEventListener("click", onCloseModal);
refs.lightboxOverlay.addEventListener("click", onOverlayClick);

//refs.galleryContainer.removeAttribute("href");

function onOpenModal(evt) {
  evt.preventDefault()
  window.addEventListener("keydown", onEscKeyPress);
  refs.openModal.classList.add("is-open");
  console.log(`Модалка открыта`);
  //console.log(evt.target);

  refs.modalOpenGalleryItem.setAttribute(
    "src",
    `${evt.target.getAttribute("data-source")}`
  );
  refs.modalOpenGalleryItem.setAttribute(
    "alt",
    `${evt.target.getAttribute("alt")}`
  );
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
