import Section from "../components/Section.js";
import Card from "../components/Card.js";
import initialCards from "../utils/initial-cards.js";
import FormValidation from "../components/FormValidation.js";
import './index.css';
import {
  cards,
  openEditButton,
  openAddButton,
  popupAddCard,
  formAdd,
  cardDefault,
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
const userInfo = new UserInfo({ nameText, professionText });
const imagePopup = new PopupWithImage(openImg);

function renderCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        imagePopup.openPopup(item.link, item.name);
        imagePopup.setEventListeners();
      },
    },
    cardDefault
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

const popupAddForm = new PopupWithForm({
  popupSelector: popupAddCard,
  formCallback: (formData) => {
    renderCard(formData);
  },
});

const popupEditForm = new PopupWithForm({
  popupSelector: popupEditProfile,
  formCallback: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

openEditButton.addEventListener("click", () => {
  popupEditForm.openPopup();
  const inputValue = userInfo.getUserInfo();
  inputName.value = inputValue.name;
  inputAboutName.value = inputValue.profession;

  editFormValidator.resetForm(editFormButton);
});

openAddButton.addEventListener("click", () => {
  popupAddForm.openPopup();
  addCardFormValidator.resetForm(addFormButton);
});
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
