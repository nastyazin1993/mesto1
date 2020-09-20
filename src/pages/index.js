import Section from "../components/Section.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import Card from "../components/Card.js";
import FormValidation from "../components/FormValidation.js";
import "./index.css";
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
  editAvatarButton,
  openImg,
  config,
  popupEditAvatar,
  popupDeleteCard,
  profileAvatarIcon,
  inputEditAvatar,
  profileAvatar,
  formEditAvatar,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";
import { data } from "autoprefixer";

const editFormValidator = new FormValidation(config, formEdit);
const addCardFormValidator = new FormValidation(config, formAdd);
const editAvatarFormValidator = new FormValidation(config, formEditAvatar);
const userInfo = new UserInfo({ nameText, professionText });
const imagePopup = new PopupWithImage(openImg);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15/",
  headers: {
    "Content-Type": "application/json",
    authorization: "4426ae37-9ae5-4337-9bcb-53d589589107",
  },
});
api
  .getUserInfo()
  .then((res) => {
    nameText.textContent = res.name;
    professionText.textContent = res.about;
    profileAvatar.src = res.avatar;
  })

  .catch((err) => {
    console.log(err);
  });

const renderLoading = (button, isLoading, textButton) => {
  if (isLoading) {
    button.setAttribute("disabled", true);
    button.textContent = textButton;
  } else {
    button.removeAttribute("disabled");
    button.textContent = textButton;
  }
};

api.getUserInfo().then((res) => {
  nameText.textContent = res.name;
  professionText.textContent = res.about;
  profileAvatar.src = res.avatar;
  openAddButton.addEventListener("click", () => {
    popupAddForm.openPopup();
    addCardFormValidator.resetForm(addFormButton);
  });

  const classConfirmForm = new ConfirmPopup(popupDeleteCard, renderLoading);

  const popupAddForm = new PopupWithForm({
    popupSelector: popupAddCard,

    formCallback: (formData) => {
      renderLoading(addFormButton, true, "Создание...");
      api.postCard(formData).then(() => {
        renderCardPost(formData);
      });
    },
  });

  function renderCardPost(item) {
    const card = new Card(
      {
        data: item,
        myId: res._id,
        api: api,
        /*idUser: item.owner._id,*/
        cardId: item._id,

        handleCardClick: () => {
          imagePopup.openPopup(item.link, item.name);
          imagePopup.setEventListeners();
        },

        handleDeleteIconClick: (cardId, item, api) => {
          classConfirmForm.open(cardId, item, api);
          classConfirmForm.setEventListeners();
        },
      },
      cardDefault
    );

    const cardElement = card.generateCard();
    cards.prepend(cardElement);
  }
  function renderCardGet(item) {
    const card = new Card(
      {
        data: item,
        myId: res._id,
        idUser: item.owner._id,
        likes: item.likes,
        api: api,
        cardId: item._id,

        handleCardClick: () => {
          imagePopup.openPopup(item.link, item.name);
          imagePopup.setEventListeners();
        },

        handleDeleteIconClick: (cardId, item, api) => {
          classConfirmForm.open(cardId, item, api);
          classConfirmForm.setEventListeners();
        },
      },
      cardDefault
    );

    const cardElement = card.generateCard();
    cards.prepend(cardElement);
  }
  api
    .getInitialCards()
    .then((data) => {
      const cardsList = new Section(
        {
          items: data,
          renderer: (item) => {
            renderCardGet(item);
          },
        },
        cards
      );
      cardsList.renderItems();
    })
    .catch((err) => console.log(err));

  popupAddForm.setEventListeners();
});

profileAvatarIcon.addEventListener("click", () => {
  popupEditAvatarForm.openPopup();
  inputEditAvatar.value = inputEditAvatar.innerText;
  editAvatarFormValidator.resetForm(editAvatarButton);
});

const popupEditAvatarForm = new PopupWithForm({
  popupSelector: popupEditAvatar,
  formCallback: () => {
    renderLoading(profileAvatarIcon, true, "Сохранение...");
    profileAvatar.src = inputEditAvatar.value;
    api.patchUserAvatar();
  },
});
popupEditAvatarForm.setEventListeners();

const popupEditForm = new PopupWithForm({
  popupSelector: popupEditProfile,
  formCallback: (formData) => {
    renderLoading(editFormButton, true, "Сохранение...");
    api.patchUserInfo(formData);
    userInfo.setUserInfo(formData);
  },
});
popupEditForm.setEventListeners();

openEditButton.addEventListener("click", () => {
  popupEditForm.openPopup();
  const inputValue = userInfo.getUserInfo();
  inputName.value = inputValue.names;
  inputAboutName.value = inputValue.profession;

  editFormValidator.resetForm(editFormButton);
});

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
