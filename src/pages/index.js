import Section from "../components/section.js";
import Card from "../components/card.js";
import initialCards from "../utils/initial-cards.js";
import FormValidation from "../components/FormValidation.js";
import './index.css';
import {
  cards,
  openEditButton,
  openAddButton,
  popupAddCard,
  formAdd,
  popupEditProfile,
  formEdit,
  inputName,
  inputAboutName,
  nameText,
  professionText,
  editFormButton,
  addFormButton,
  openImg,
  config,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const editFormValidator = new FormValidation(config, formEdit);
const addCardFormValidator = new FormValidation(config, formAdd);
const classUserInfo = new UserInfo({ nameText, professionText });

function renderCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        const classPopupPhoto = new PopupWithImage(openImg);
        classPopupPhoto.openPopup(item.link, item.name);
        classPopupPhoto.setEventListeners();
      },
    },
    ".card-template_type_default"
  );
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      renderCard(data);
    },
  },
  cards
);
cardsList.renderItems();

const PopupAddForm = new PopupWithForm({
  popupSelector: popupAddCard,
  formCallback: (formData) => {
    renderCard(formData);
  },
});

const PopupEditForm = new PopupWithForm({
  popupSelector: popupEditProfile,
  formCallback: (formData) => {
    classUserInfo.setUserInfo(formData);
  },
});

openEditButton.addEventListener("click", () => {
  PopupEditForm.openPopup();
  const InputValue = classUserInfo.getUserInfo();
  inputName.value = InputValue.nam;
  inputAboutName.value = InputValue.profession;

  editFormValidator.resetForm(editFormButton);
});

openAddButton.addEventListener("click", () => {
  PopupAddForm.openPopup();
  addCardFormValidator.resetForm(addFormButton);
});
PopupAddForm.setEventListeners();
PopupEditForm.setEventListeners();

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
