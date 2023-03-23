import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._submitForm = this._popupSelector.querySelector('.popup__input')
        this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__text'));
    }


    _getInputValues() {
        dataForm = {};
        this._inputList.forEach((item) => { dataForm[item.name] = item.value }); 
        return dataForm;
    };

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', () => {this._callbackSubmitForm(this._getInputValues())})
    };

        
    closeForm() {
        this._submitForm.reset();
        super.closePopup();
    };
}