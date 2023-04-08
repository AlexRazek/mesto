import Popup from './Popup.js'

export default class PopupAlert extends Popup {
    constructor(popupSelector, { callbackAlertForm }) {
        super(popupSelector);
        this._callbackAlertForm = callbackAlertForm;
        this._submitForm = this._popupItem.querySelector('.popup__input')  
    };


//     openAlertForm = (data) => {
//         this._idCard = data.idCard;
//         this._element = data.element;
//         super.openPopup();
//  };
    openAlertForm = () => {
        super.openPopup();
    };

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackAlertForm(this._data);
            // this._callbackAlertForm({idCard: this._idCard, element: this._element});
        });
    };

        
    closeAlertForm = () => {
        // this._submitForm.reset();
        super.closePopup();
    };
}