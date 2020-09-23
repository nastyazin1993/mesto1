export default  class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement
 }
  resetForm(buttonSubmit) {
    const inputs = Array.from(this._formElement.querySelectorAll(".form__input"));
    inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(inputs, buttonSubmit);
    });
  }
  
  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._config.formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }
  
  _setEventListeners() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonSubmit = this._formElement.querySelector(this._config.buttonSubmitSelector);
    this._toggleButtonState(inputs, buttonSubmit);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputs, buttonSubmit);
      });
    });
  };
  
  _toggleButtonState(inputs, buttonSubmit) {
    if (this._hasInvalidInput(inputs)) {
      buttonSubmit.classList.add(this._config.disabledButtonClass);
      buttonSubmit.disabled = true;
    } else {
      buttonSubmit.classList.remove(this._config.disabledButtonClass);
      buttonSubmit.disabled = false;
    }
  };
  
  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  };
  
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    
  };
  
}

