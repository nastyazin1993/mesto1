import Card from './card.js';
import initialCards from './initial-cards.js';
import FormValidation from './FormValidation.js';
import {togglePopup, closeOnOverlay, keyEscapeHandler} from './utils.js';
import {cards, cardsTemplate, openEditButton, openAddButton, popupAddCard, formAdd, 
  inputPlaceName, inputPlaceUrl, closeAddButton, popupEditProfile, formEdit, inputName, inputAboutName, closeEditButton, nameText,
  professionText, editFormButton, addFormButton, openImg, placeImage, titleImage, closeOpenImgButton, config} from './constants.js';


const editFormValidator = new FormValidation(config, formEdit)
const addCardFormValidator = new FormValidation(config, formAdd)

editFormValidator.enableValidation();
addCardFormValidator.enableValidation()


function renderCard(data) {
  const card = new Card(data, '.card-template_type_default');
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


closeOpenImgButton.addEventListener("click", function () {
  openImg.classList.remove("popup_open")
});
