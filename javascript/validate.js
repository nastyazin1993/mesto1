const obj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSubmitSelector: '.form__save-button',
  disabledButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorMessageClass: 'form__input-error_active'
};

function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach((formElement)=>{
    formElement.addEventListener('submit', (evt)=>{
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
}

const setEventListeners = (formElement, obj) =>{
  const inputs =  Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonSubmit = formElement.querySelector(obj.buttonSubmitSelector);
  toggleButtonState(inputs, buttonSubmit, obj);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputs, buttonSubmit, obj);
    });
  });
}

toggleButtonState = (inputs, buttonSubmit, obj)=>{
  if(hasInvalidInput(inputs)){
    buttonSubmit.classList.add(obj.disabledButtonClass);
    buttonSubmit.disabled = true;
  } else{
    buttonSubmit.classList.remove(obj.disabledButtonClass);
    buttonSubmit.disabled = false;
  }
}

const hasInvalidInput = (inputs) =>{
  return inputs.some((inputElement) =>{
    return !inputElement.validity.valid;
  })
}

const isValid = (formElement, inputElement, obj) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validity.valid, obj);
  }else{
    hideInputError(formElement, inputElement, obj);
  }
};
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.textContent='';
  errorElement.classList.remove(obj.errorMessageClass);
  
};


const showInputError = (formElement, inputElement, obj) =>{
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorMessageClass);
  errorElement.textContent = inputElement.validationMessage;

};


enableValidation(obj);
