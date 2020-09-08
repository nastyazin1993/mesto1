import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
	constructor(cardSelector) {
        super(cardSelector);
        this.popupImg = document.querySelector(".popup__img")
        this.popupTitleImg = document.querySelector(".popup__title_open-image")
    }
    
    openPopup(link, name) {
        super.openPopup();
        this.popupTitleImg.textContent = name;
        this.popupImg.src = link;
        this.popupImg.alt = name;
    }
}
