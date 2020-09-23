import Popup from "./Popup.js";
export default class ConfirmPopup extends Popup {
  constructor(popupSelector, renderLoading) {
    super(popupSelector);
    this._renderLoading = renderLoading;
   this._confirmFormButton = this._popup.querySelector('.popup__button_type_confirm');
   this._formPopup = this._popup.querySelector(".form");
  }
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._removeElement();
    
      
    });
  }
  openPopup(cardId, item, api) {
    this._cardId = cardId;
    this._elements = item;
    this._api = api
    super.openPopup();
  }
  _removeElement() {
    this._api
      .deleteCard(`${this._cardId}`)
      .then(() => 
      this._elements.remove(),
      this.closePopup())
      .catch((err) => console.log(err))
      .finally(() => {
        this._renderLoading(this._confirmFormButton, false, 'Да'); 
      });
    
  }
}