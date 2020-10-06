import imageRef from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const galleryMarkap = createGalleryCardsMarkup(imageRef);
//console.log(createGalleryCardsMarkup(imageRef));
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkap);

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
