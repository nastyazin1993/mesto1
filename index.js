let ButtonEdit = document.querySelector(".button-edit");
let Popup = document.querySelector(".popup");
let ButtonClose = Popup.querySelector(".button-close");
let form = Popup.querySelector(".form");
let formSubmit = Popup.querySelector(".button-popup");
let nameInput = Popup.querySelector(".form_name");
let jobInput = Popup.querySelector(".form_profession");
let profileTitle = Popup.querySelector(".profile__title");
let profilesubTitle = Popup.querySelector(".profile__subtitle");

ButtonEdit.addEventListener("click", function () {
    Popup.style.display = "flex";
});

ButtonClose.addEventListener("click", function () {
    Popup.style.display = "none";
});

function formSubmitHandler(event) {
    event.preventDefault();

    profileTitle.textContent = nameInput.value;
    profilesubTitle.textContent = jobInput.value;
    Popup.style.display = "none";
}

formSubmit.addEventListener("submit", formSubmitHandler);
