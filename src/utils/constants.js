const cards = document.querySelector(".elements");
const cardsTemplate = document
  .querySelector(".cards")
  .content.querySelector(".element");
const openEditButton = document.querySelector(".profile__edit-button");
const openAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const formAdd = document.forms.formAddCard;
const inputPlaceName = formAdd.elements.place;
const inputPlaceUrl = formAdd.elements.link;
const closeAddButton = popupAddCard.querySelector(
  ".popup__close-button_add-card"
);
const cardDefault = document.querySelector(".card-template_type_default");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formEdit = document.forms.formEditProfile;
const inputName = formEdit.elements.name;
const inputAboutName = formEdit.elements.about;
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

const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const popupDeleteCard = document.querySelector(".popup_delete-card");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarIcon = document.querySelector(".profile__avatar-icon");
const formEditAvatar = document.forms.formEditAvatar;
const inputEditAvatar = formEditAvatar.elements.avatar;
const editAvatarButton = formEditAvatar.querySelector(".form__save-button_action");



const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  buttonSubmitSelector: ".form__save-button",
  disabledButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export {cards, cardsTemplate, openEditButton, openAddButton, popupAddCard, formAdd, cardDefault,
    inputPlaceName, inputPlaceUrl, closeAddButton, popupEditProfile, formEdit, inputName, inputAboutName, closeEditButton, nameText,
    professionText, editFormButton, addFormButton, openImg, placeImage, titleImage, closeOpenImgButton, popupEditAvatar, popupDeleteCard, profileAvatar, 
    formEditAvatar, inputEditAvatar,editAvatarButton, profileAvatarIcon, config}