const objForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  buttonSubmitSelector: ".form__save-button",
  disabledButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

function resetForm(formElement, buttonSubmit) {
  const inputs = Array.from(formElement.querySelectorAll(".form__input"));
  inputs.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, objForm);
    toggleButtonState(inputs, buttonSubmit, objForm);
  });
}

function enableValidation(objForm) {
  const forms = Array.from(document.querySelectorAll(objForm.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, objForm);
  });
}

const setEventListeners = (formElement, objForm) => {
  const inputs = Array.from(
    formElement.querySelectorAll(objForm.inputSelector)
  );
  const buttonSubmit = formElement.querySelector(objForm.buttonSubmitSelector);
  toggleButtonState(inputs, buttonSubmit, objForm);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, objForm);
      toggleButtonState(inputs, buttonSubmit, objForm);
    });
  });
};

toggleButtonState = (inputs, buttonSubmit, objForm) => {
  if (hasInvalidInput(inputs)) {
    buttonSubmit.classList.add(objForm.disabledButtonClass);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove(objForm.disabledButtonClass);
    buttonSubmit.disabled = false;
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const isValid = (formElement, inputElement, objForm) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validity.valid,
      objForm
    );
  } else {
    hideInputError(formElement, inputElement, objForm);
  }
};
const hideInputError = (formElement, inputElement, objForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objForm.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(objForm.errorClass);
};

const showInputError = (formElement, inputElement, objForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objForm.inputErrorClass);
  errorElement.classList.add(objForm.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

enableValidation(objForm);
