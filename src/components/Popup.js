export default class Popup {
    constructor(popupSelector) {
      this._popupItem = document.querySelector(popupSelector);
    };

    openPopup () {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscape);
        // document.removeEventListener('keydown', this._handleEscape.bind(this));

    };
    
    closePopup () {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscape);
        // document.removeEventListener('keydown', this._handleEscape.bind(this));
    };

    // закрытие попап по esc//
    _handleEscape = evt => {
    if (evt.key === "Escape" || evt.key === "Esc" || evt.keyCode == 27) {
        this.closePopup()
        //this.closePopup(document.querySelector('.popup_opened'));
        };
    };

    // закрытие модалки по overlay и с помощью крестика//
    setEventListeners() {
        this._popupItem.addEventListener('mousedown', evt => {
            if ((evt.target.classList.contains('popup_opened')) || 
            (evt.target.classList.contains('popup__closed'))) {
              this.closePopup();
            };
            })  
        }
};


// const popups = document.querySelectorAll('.popup')

//   popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//       if ((evt.target.classList.contains('popup_opened')) || 
//       (evt.target.classList.contains('popup__closed'))) {
//         closePopup(popup);
//       };
//     });
//   });
