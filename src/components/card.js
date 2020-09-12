export default class Card {
  constructor({ data, handleCardClick }, cardsTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardsTemplate = cardsTemplate;
    
  }
  _getTemplate() {
    return this._cardsTemplate.content.querySelector(".element")
    .cloneNode(true);
    
  }

  _setEventListeners() {
    const cardHeartButton = this._element.querySelector(".element__heart");
    const cardDeleteButton = this._element.querySelector(".element__delete")
    
    this._element.querySelector(".element__img").addEventListener("click", () => {
      this._handleCardClick();
    });
    
    cardHeartButton.addEventListener("click", () => {
      cardHeartButton.classList.toggle("element__heart_active");
    });

    cardDeleteButton.addEventListener("click", () => {
      this._element.remove();
    });
   
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector(".element__img");
    
    cardImg.src = this._link;
    cardImg.alt = this._name;
   
    const cardTitle = this._element.querySelector(".element__title");
    cardTitle.textContent = this._name;

    this._setEventListeners()
    return this._element;
  }
}
