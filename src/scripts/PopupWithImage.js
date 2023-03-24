import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = document.querySelector('.popup__image-view');
        this._imageTitlePopup = document.querySelector('.popup__image-title');
        // console.log(this._imagePopup);
        // console.log(this._imageTitlePopup);
    }


    openCard(link, name) {
        this._imagePopup.src = link;
        this._imagePopup.alt = name;
        this._imageTitlePopup.textContent = name;
        super.openPopup();
 };
}