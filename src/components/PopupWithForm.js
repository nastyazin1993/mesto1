import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formCallback }) {
    super(popupSelector);
    this._formCallback = formCallback;
    this._formPopup = this._popup.querySelector(".form");
    this._formInput = document.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._inputList = this._formInput;
    this._formValue = {};
    this._inputList.forEach((item) => {
      this._formValue[item.name] = item.value;
    });
    return this._formValue;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formCallback(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._formPopup.reset();
  }
}
