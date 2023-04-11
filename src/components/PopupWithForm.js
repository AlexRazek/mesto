import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackSubmitForm }) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._submitForm = this._popupItem.querySelector('.popup__input')
        this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__text'));
        this._submitButton = this._popupItem.querySelector('.popup__submit-btn');
        this._submitButtonToggel = this._submitButton.textContent
    };

    setLoading() {
        this._submitButton.textContent = "Сохранение..."
    };

    unsetLoading() {
        this._submitButton.textContent = this._submitButtonToggel;
    };

    // setLoading(loading) {
    //     loading?
    //     this._submitButton.textContent = "Сохранение...":
    //     this._submitButton.reset();
    // };

    _getInputValues() {
        this._dataForm = {};
        this._inputList.forEach(item => { this._dataForm[item.name] = item.value }); 
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