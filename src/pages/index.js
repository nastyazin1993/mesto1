import Section from "../components/Section.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import Card from "../components/Card.js";

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
  profileAvatar,
  formEditAvatar,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";

import FormValidator from "../components/FormValidator.js";
import {renderLoading} from "../utils/renderLoading.js";


const editFormValidator = new FormValidator(config, formEdit);
const addCardFormValidator = new FormValidator(config, formAdd);
const editAvatarFormValidator = new FormValidator(config, formEditAvatar);
const userInfo = new UserInfo({ nameText, professionText,  profileAvatar});
const imagePopup = new PopupWithImage(openImg);
const classConfirmForm = new ConfirmPopup(popupDeleteCard, renderLoading);
let cardsList;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15/",
  headers: {
    "Content-Type": "application/json",
    authorization: "4426ae37-9ae5-4337-9bcb-53d589589107",
  },
});

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res)
    userInfo.setUserAvatar(res.avatar)
    return res._id;
  }).then((id)=>{
    api.getInitialCards()
    .then((data) => {
      cardsList = new Section(
        {
          items: data,
          renderer: (item) => {
            generateCard(item, id)
            cardsList.addItem(generateCard(item, id).generateCard())
          }
        },
        cards
      );
      cardsList.renderItems();
    })
    .catch((err) => console.log(err))
  })
  
  function generateCard(item, id) {
    const card = new Card(
      {
        data: item,
        myId: id,
        api: api,
        idUser: item.owner._id,
        cardId: item._id,
        handleCardClick: () => {
          imagePopup.openPopup(item.link, item.name);
          imagePopup.setEventListeners();
        },
        handleDeleteIconClick: (cardId, item, api, myId, idUser) => {
          classConfirmForm.openPopup(cardId, item, api, myId, idUser);
          classConfirmForm.setEventListeners();
        },
      },
      cardDefault
    )
    return card;
  }
  const popupAddForm = new PopupWithForm({
    popupSelector: popupAddCard,
    formCallback: (formData) => {
      renderLoading(addFormButton, true, "Создание...");
      api.postCard(formData)
      .then((data) => {
        generateCard(data, data.owner._id);
        cardsList.addItem(generateCard(data, data.owner._id).generateCard())
        popupAddForm.closePopup()
      })
      .catch((err) => console.log(err))
      .finally(()=>{
         renderLoading(addFormButton, false, 'Создать');
       })
       
    }
  })
    openAddButton.addEventListener("click", () => {
      popupAddForm.openPopup();
      addCardFormValidator.resetForm(addFormButton);
    })

profileAvatarIcon.addEventListener("click", () => {
  popupEditAvatarForm.openPopup();
  editAvatarFormValidator.resetForm(editAvatarButton);
});

const popupEditAvatarForm = new PopupWithForm({
  popupSelector: popupEditAvatar,
  formCallback: (formData) => {
    renderLoading(editAvatarButton, true, "Сохранение...");
    api.patchUserAvatar(formData)
    .then((formData) => {
      userInfo.setUserAvatar(formData.avatar);
      popupEditAvatarForm.closePopup()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(editAvatarButton, false, 'Сохранить');
    });
  },
});


const popupEditForm = new PopupWithForm({
  popupSelector: popupEditProfile,
  formCallback: (formData) => {
    renderLoading(editFormButton, true, "Сохранение...");
    
    api.patchUserInfo(formData)
    .then(() =>{
      userInfo.setUserInfo(formData);
      popupEditForm.closePopup()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(editFormButton, false, 'Сохранить');
    });
    
  },
});


openEditButton.addEventListener("click", () => {
  popupEditForm.openPopup();
  const inputValue = userInfo.getUserInfo();
  inputName.value = inputValue.name;
  inputAboutName.value = inputValue.about;
  editFormValidator.resetForm(editFormButton);
});

popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupEditAvatarForm.setEventListeners();
classConfirmForm.setEventListeners();

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
