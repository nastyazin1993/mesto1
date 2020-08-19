import {togglePopup, closeOnOverlay, keyEscapeHandler} from './utils.js';

export default 
class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.cards')
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImg = this._element.querySelector(".element__img");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    const openImg = document.querySelector(".popup_open-image");
    const placeImage = document.querySelector(".popup__img");
    const titleImage = document.querySelector(".popup__title_open-image");
    const closeOpenImgButton = openImg.querySelector(
      ".popup__close-button_open-image"
    );
    cardImg.addEventListener("click", () => {
      togglePopup(openImg);
      placeImage.src = cardImg.src;
      placeImage.alt = cardImg.alt;
      titleImage.textContent = placeImage.alt;
      closeOpenImgButton.addEventListener("click", function () {
        openImg.classList.remove("popup_open");
      });
    });

    const cardTitle = this._element.querySelector(".element__title");
    cardTitle.textContent = this._name;

    const cardHeartButton = this._element.querySelector(".element__heart");
    cardHeartButton.addEventListener("click", () => {
      cardHeartButton.classList.toggle("element__heart_active");
    });

    const cardDeleteButton = this._element.querySelector(".element__delete");
    cardDeleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    return this._element;
  }
}




