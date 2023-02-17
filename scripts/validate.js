const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
     });
     setEventListeners(formElement, settings);
  });
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList, settings)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
      // buttonElement.setAttribute('disabled', 'true');
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
      // buttonElement.removeAttribute('disabled');
    }
  }; 
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement,settings);
    }
  };
    
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, settings);

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButtonState(inputList, buttonElement, settings);
      }, 0);
    });
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  
  

  enableValidation({
    formSelector: '.popup__input',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__input-error_active'
  });
