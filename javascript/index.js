import Card from './card.js';
import initialCards from './initial-cards.js';
import FormValidation from './FormValidation.js';
import {togglePopup, closeOnOverlay, keyEscapeHandler} from './utils.js';


const cards = document.querySelector(".elements");
const openEditButton = document.querySelector(".profile__edit-button");
const openAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const formAdd = document.forms.formAddCard;
const inputPlaceName = formAdd.elements.name;
const inputPlaceUrl = formAdd.elements.link;
const closeAddButton = popupAddCard.querySelector(
  ".popup__close-button_add-card"
);
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formEdit = document.forms.formEditProfile;
const inputName = formEdit.elements.name;
const inputAboutName = formEdit.elements.profession;
const closeEditButton = popupEditProfile.querySelector(
  ".popup__close-button_edit-profile"
);
const nameText = document.querySelector(".profile__title");
const professionText = document.querySelector(".profile__subtitle");
const editFormButton = popupEditProfile.querySelector(
  ".form__save-button_action"
);
const addFormButton = popupAddCard.querySelector(".form__save-button_action");
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  buttonSubmitSelector: ".form__save-button",
  disabledButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const editFormValidator = new FormValidation(config, formEdit)
const addCardFormValidator = new FormValidation(config, formAdd)

editFormValidator.enableValidation();
addCardFormValidator.enableValidation()


function renderCard(data) {
  const card = new Card(data);
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
}

initialCards.forEach((data) => {
  renderCard(data);
});

function saveEditPopup(event) {
  event.preventDefault();
  nameText.textContent = inputName.value;
  professionText.textContent = inputAboutName.value;
  togglePopup(popupEditProfile);
}

function clearValue() {
  inputPlaceName.value = "";
  inputPlaceUrl.value = "";
}

function saveAddPopup(event) {
  event.preventDefault();
  renderCard({ name: inputPlaceName.value, link: inputPlaceUrl.value });
  clearValue();
  togglePopup(popupAddCard);
}

openEditButton.addEventListener("click", () => {
  togglePopup(popupEditProfile);
  inputName.value = nameText.innerText;
  inputAboutName.value = professionText.innerText;
  editFormValidator.resetForm(editFormButton);
 
});

closeEditButton.addEventListener("click", () => {
  togglePopup(popupEditProfile);
});

formEdit.addEventListener("submit", saveEditPopup);

openAddButton.addEventListener("click", () => {
  togglePopup(popupAddCard);
  clearValue();
  addCardFormValidator.resetForm(addFormButton);

});

formAdd.addEventListener("submit", saveAddPopup);

closeAddButton.addEventListener("click", () => {
  togglePopup(popupAddCard);
});
