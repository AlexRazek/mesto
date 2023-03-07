
class FormValidator {
    constructor (settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
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
  
   _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }; 
    
  _toggleButtonState = (inputList, buttonElement) => {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._settings.inactiveButtonClass);
        buttonElement.disabled = true;
        // buttonElement.setAttribute('disabled', 'true');
      } else {
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
        buttonElement.disabled = false;
        // buttonElement.removeAttribute('disabled');
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
      const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
      
      this._toggleButtonState(inputList, buttonElement);
  
      this._formElement.addEventListener('reset', () => {
        setTimeout(() => {
           this._toggleButtonState(inputList, buttonElement);
        }, 0);
      });
      
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input',  () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._settings.formSelector));
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
           });
         this._setEventListeners(formElement);
        });
      };
  };

export { FormValidator }; 

