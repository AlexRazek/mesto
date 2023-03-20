
class FormValidator {
    constructor (settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    };

   _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    };
    
   _hideInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = '';
    };
  
   _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }; 

  disableSubmitButton= () => {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

    
  _toggleButtonState = () => {
      if (this._hasInvalidInput(this._inputList)) {
        this.disableSubmitButton();
      } else {
        this._enableSubmitButton();
      }
    }; 
    
  _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
      
  _setEventListeners = () => {      
      this._toggleButtonState();
  
      // this._formElement.addEventListener('reset', () => {
        // setTimeout(() => {
        //    this._toggleButtonState();
        // }, 0);
      // });
      
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input',  () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    };

    enableValidation = () => {
       this._setEventListeners();
      };
    };

    export { FormValidator }; 




    // enableValidation = () => {
    //     const formList = Array.from(document.querySelectorAll(this._settings.formSelector));
    //     formList.forEach((formElement) => {
    //       formElement.addEventListener('submit', function (evt) {
    //         evt.preventDefault();
    //        });
    //      this._setEventListeners(formElement);
    //     });
    //   };
 // };



