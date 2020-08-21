import {togglePopup, closeOnOverlay, keyEscapeHandler} from './utils.js';
import {cards, cardsTemplate, openEditButton, openAddButton, popupAddCard, formAdd, 
  inputPlaceName, inputPlaceUrl, closeAddButton, popupEditProfile, formEdit, inputName, inputAboutName, closeEditButton, nameText,
  professionText, editFormButton, addFormButton, openImg, placeImage, titleImage, closeOpenImgButton, config} from './constants.js';

  export default 
class Card {
  
 
  constructor(data, cardsTemplate) {
    
    this._name = data.name;
    this._link = data.link;
    this._cardsTemplate = cardsTemplate;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardsTemplate)
      .content
      .querySelector(".element")
      .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImg = this._element.querySelector(".element__img");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    
    cardImg.addEventListener("click", () => {
      togglePopup(openImg);
      placeImage.src = cardImg.src;
      placeImage.alt = cardImg.alt;
      titleImage.textContent = placeImage.alt;
      
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




