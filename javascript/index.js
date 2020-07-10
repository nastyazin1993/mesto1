let openEditButton = document.querySelector('.profile__edit-button');
let closeEditButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.form');
let inputName = document.querySelector('.form__name');
let inputProfession = document.querySelector('.form__profession');
let nameText = document.querySelector('.profile__title');
let professionText = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_open');
  inputName.value = nameText.innerText;
  inputProfession.value = professionText.innerText;
}

function closePopup() {
  popup.classList.remove('popup_open');
}

function savePopup(event) {
  event.preventDefault(); 
  nameText.textContent = inputName.value;
  professionText.textContent = inputProfession.value;
  closePopup();
}

form.addEventListener('submit', savePopup);
openEditButton.addEventListener('click', openPopup);
closeEditButton.addEventListener('click', closePopup);