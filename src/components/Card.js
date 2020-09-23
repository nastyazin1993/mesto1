export default class Card {
  constructor(
    { data, api, idUser, myId, handleCardClick, handleDeleteIconClick },
    cardsTemplate
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._cardsTemplate = cardsTemplate;
    this._like = data.likes;
    this._idUser = idUser;
    this._api = api;
  }
  _getTemplate() {
    return this._cardsTemplate.content
      .querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    const cardHeartButton = this._element.querySelector(".element__heart");
    const cardDeleteButton = this._element.querySelector(".element__delete");

    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleCardClick();
      });

    cardHeartButton.addEventListener("click", (evt) => {
      this._handleLikeClick(evt);
    });

    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._id, this._element, this._api);
      
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector(".element__img");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    const cardTitle = this._element.querySelector(".element__title");
    cardTitle.textContent = this._name;
    this._element.querySelector(
      ".element__sumLike"
    ).textContent = this._like.length;
    this._setEventListeners();

    if (this._idUser !== this._myId) {
      this._element.querySelector(".element__delete").remove();
    }

    this.isLike();

    return this._element;
  }

  isLike() {
    this._like.some((item) => {
      if (item._id === this._myId) {
        this._element
          .querySelector(".element__heart")
          .classList.add("element__heart_active");
      }
    });
  }
  _handleLikeClick(evt) {
    if (!evt.target.classList.contains("element__heart_active")) {
      this._api.putLike(`${this._id}`).then((data) => {
        this._toggleLike(data);
        
      })
      .catch((err) => console.log(err));
    } else {
      this._api.deleteLike(`${this._id}`).then((data) => {
        this._toggleLike(data);
      })
      .catch((err) => console.log(err));
    }
  }
  _toggleLike(data) {
    this._element.querySelector(
      ".element__sumLike"
    ).textContent = data.likes.length;
    this._element
      .querySelector(".element__heart")
      .classList.toggle("element__heart_active");
  }
}
