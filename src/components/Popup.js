export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.closePopup();
      }
    };
    this._closeOnOverlay = (e) => {
      const openedPopup = document.querySelector(".popup_open");
      if (e.target === openedPopup) {
        this.closePopup();
      }
    };
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  openPopup() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._closeOnOverlay);
  }

  closePopup() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._closeOnOverlay);
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
        this.closePopup();
      });
    
  }
}
