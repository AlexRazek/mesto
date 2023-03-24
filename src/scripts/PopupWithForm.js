import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._submitForm = this._popupSelector.querySelector('.popup__input')
        this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__text'));
    }


    _getInputValues() {
        this._dataForm = {};
        this._inputList.forEach((item) => { this._dataForm[item.name] = item.value }); 
        console.log(this._dataForm);
        return this._dataForm;
    };

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
        });
    };

        
    closeForm() {
        this._submitForm.reset();
        super.closePopup();
    };
}