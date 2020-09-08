export default class Card {
  constructor({ data, handleCardClick }, cardsTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardsTemplate = cardsTemplate;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardsTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImg = this._element.querySelector(".element__img");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    cardImg.addEventListener("click", () => {
      this._handleCardClick();
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
