import Popup from './Popup.js'

export default class PopupAlert extends Popup {
    constructor(popupSelector, { callbackAlertForm }) {
        super(popupSelector);
        this._submitForm = this._popupItem.querySelector(".popup__input"); 
        this._callbackAlertForm = callbackAlertForm;  
    };


    openAlertForm(idCard, elementCard) {
        this._idCard = idCard;
        this._elementCard = elementCard;
        super.openPopup();
    };


    setEventListeners() {
        this._submitForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            // this._callbackAlertForm();
            // this._callbackAlertForm(this._data);
            this._callbackAlertForm(this._idCard, this._elementCard);
   


    });
        super.setEventListeners();
    };

        
    closeAlertForm() {
        // this._submitForm.reset();
        super.closePopup();
    };
}