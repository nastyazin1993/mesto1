const initialCards = [
  {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cards = document.querySelector(".elements");
const cardsTemplate = document.querySelector(".cards").content.querySelector(".element");
const openEditButton = document.querySelector(".profile__edit-button");
const openAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const formAdd = popupAddCard.querySelector(".form");
const inputPlaceName = formAdd.querySelector(".form__name");
const inputPlaceUrl = formAdd.querySelector(".form__about-name");
const closeAddButton = popupAddCard.querySelector(".popup__close-button_add-card");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formEdit = popupEditProfile.querySelector(".form");
const inputName = formEdit.querySelector(".form__name");
const inputAboutName = formEdit.querySelector(".form__about-name");
const closeEditButton = popupEditProfile.querySelector(".popup__close-button_edit-profile");
const nameText = document.querySelector(".profile__title");
const professionText = document.querySelector(".profile__subtitle");

function createCard(data) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".element__img");
  const cardTitle = cardElement.querySelector(".element__title");
  const cardHeartButton = cardElement.querySelector(".element__heart");
  const cardDeleteButton = cardElement.querySelector(".element__delete");
  const openImg = document.querySelector(".popup_open-image");
  const placeImage = document.querySelector(".popup__img");
  const titleImage = document.querySelector(".popup__title_open-image");
  const closeOpenImgButton = openImg.querySelector(".popup__close-button_open-image");
  cardTitle.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  cardHeartButton.addEventListener("click", function () {
      cardHeartButton.classList.toggle("element__heart_active");
  });
  cardDeleteButton.addEventListener("click", function () {
      cardElement.remove();
  });
  cardImg.addEventListener("click", function () {
      openImg.classList.toggle("popup_open");
      placeImage.src = cardImg.src;
      placeImage.alt = cardImg.alt;
      titleImage.textContent = placeImage.alt;
      closeOpenImgButton.addEventListener("click", function () {
          openImg.classList.remove("popup_open");
      });
  });
  return cardElement;
}

function renderCard(data) {
  cards.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
});

function openEditPopup() {
  popupEditProfile.classList.add("popup_open");
  inputName.value = nameText.innerText;
  inputAboutName.value = professionText.innerText;
}

function saveEditPopup(event) {
  event.preventDefault();
  nameText.textContent = inputName.value;
  professionText.textContent = inputAboutName.value;
  closeEditPopup();
}

function closeEditPopup() {
  popupEditProfile.classList.remove("popup_open");
}

function openAddPopup() {
  popupAddCard.classList.add("popup_open");
}
function clearValue() {
  inputPlaceName.value = "";
  inputPlaceUrl.value = "";
}
function closeAddPopup() {
  popupAddCard.classList.remove("popup_open");
  clearValue();
}
function saveAddPopup(event) {
  event.preventDefault();
  renderCard({ name: inputPlaceName.value, link: inputPlaceUrl.value });
  clearValue();
  closeAddPopup();
}

openEditButton.addEventListener("click", openEditPopup);
closeEditButton.addEventListener("click", closeEditPopup);
formEdit.addEventListener("submit", saveEditPopup);
openAddButton.addEventListener("click", openAddPopup);
formAdd.addEventListener("submit", saveAddPopup);
closeAddButton.addEventListener("click", closeAddPopup);
