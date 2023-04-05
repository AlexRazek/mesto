import Popup from './Popup.js'

export default class PopupAlert extends Popup {
    constructor(popupSelector, { callbackAlertForm }) {
        super(popupSelector);
        this.callbackAllertForm = callbackAlertForm;
        this._submitForm = this._popupItem.querySelector('.popup__input')    }


    _openAlertForm(idCard, cardElement) {
        this._idCard = idCard;
        this._cardElement = cardElement;
        super.openPopup();
 };

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.callbackAlertForm(this._openAlertForm());
        });
    };

        
    closeForm(card) {
        // this._submitForm.reset();

        super.closePopup();
    };
}