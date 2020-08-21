const cards = document.querySelector(".elements");
const cardsTemplate = document
  .querySelector(".cards")
  .content.querySelector(".element");
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

const openImg = document.querySelector(".popup_open-image");
const placeImage = document.querySelector(".popup__img");
const titleImage = document.querySelector(".popup__title_open-image");
const closeOpenImgButton = openImg.querySelector(
  ".popup__close-button_open-image"
);
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  buttonSubmitSelector: ".form__save-button",
  disabledButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export {cards, cardsTemplate, openEditButton, openAddButton, popupAddCard, formAdd, 
    inputPlaceName, inputPlaceUrl, closeAddButton, popupEditProfile, formEdit, inputName, inputAboutName, closeEditButton, nameText,
    professionText, editFormButton, addFormButton, openImg, placeImage, titleImage, closeOpenImgButton, config}