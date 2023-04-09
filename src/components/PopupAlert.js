import Popup from './Popup.js'

export default class PopupAlert extends Popup {
    constructor(popupSelector, { callbackAlertForm }) {
        super(popupSelector);
        this._submitForm = this._popupItem.querySelector(".popup__input"); 
        this._callbackAlertForm = callbackAlertForm;  
    };


    openAlertForm(idCard, element) {
        this._idCard = idCard;
        this._element = element;
        super.openPopup();
    };


    setEventListeners() {
        this._submitForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            // this._callbackAlertForm();
            // this._callbackAlertForm(this._data);
            this._callbackAlertForm(this._idCard, this._element);
   


    });
        super.setEventListeners();
    };

        
    closeAlertForm() {
        // this._submitForm.reset();
        super.closePopup();
    };
}