
//export { openPopup, closePopup };

export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
    };

    openPopup() {
        this._popupSelector.add('popup_opened');
        document.addEventListener('keydown', this._handleEscape);
    }
    
    closePopup() {
        this._popupSelector.remove('popup_opened');
        document.removeEventListener('keydown',this._handleEscape);
    }

    // закрытие попап по esc//
    _handleEscape = evt => {
    if (evt.key === "Escape" || evt.key === "Esc" || evt.keyCode == 27) {
        this.closePopup(document.querySelector('.popup_opened'));
        };
    };

    // setEventListeners() {
        

    // }
}    
