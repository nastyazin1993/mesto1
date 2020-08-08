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

function togglePopup(modal) {
  modal.classList.toggle("popup_open");
  if (modal.classList.contains("popup_open")) {
    document.addEventListener("keydown", keyEscapeHandler);
    document.addEventListener("click", closeOnOverlay);
  } else {
    document.removeEventListener("keydown", keyEscapeHandler);
    document.removeEventListener("click", closeOnOverlay);
  }
}

function closeOnOverlay(evt) {
  const openedModal = document.querySelector(".popup_open");
  if (evt.target === openedModal) {
    togglePopup(openedModal);
  }
}

function keyEscapeHandler(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_open");
    togglePopup(openedModal);
  }
}

function createCard(data) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".element__img");
  const cardTitle = cardElement.querySelector(".element__title");
  const cardHeartButton = cardElement.querySelector(".element__heart");
  const cardDeleteButton = cardElement.querySelector(".element__delete");
  const openImg = document.querySelector(".popup_open-image");
  const placeImage = document.querySelector(".popup__img");
  const titleImage = document.querySelector(".popup__title_open-image");
  const closeOpenImgButton = openImg.querySelector(
    ".popup__close-button_open-image"
  );
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
    togglePopup(openImg);
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
  resetForm(popupEditProfile, editFormButton);
});

closeEditButton.addEventListener("click", () => {
  togglePopup(popupEditProfile);
});

formEdit.addEventListener("submit", saveEditPopup);

openAddButton.addEventListener("click", () => {
  togglePopup(popupAddCard);
  clearValue();
  resetForm(popupAddCard, addFormButton);
});

formAdd.addEventListener("submit", saveAddPopup);

closeAddButton.addEventListener("click", () => {
  togglePopup(popupAddCard);
});
