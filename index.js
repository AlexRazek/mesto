const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// блок переменных //
const popupOpenEditBtn = document.querySelector('.profile__info-edit-button');
const popupAddCardBtn = document.querySelector('.profile__add-button');
const popupOpenImage = document.querySelector('.elements');

// const popupCloseEditBtn = document.querySelector('.popup__closed');
// const popupCloseCardBtn = document.querySelector('#popup-addcard .popup__closed');
// const popupCloseImageBtn = document.querySelector('#popup-image .popup__closed');
const closeButtons = document.querySelectorAll('.popup__closed');

const popupEditContainer = document.querySelector('#popup-edit');
const popupCardContainer = document.querySelector('#popup-addcard');
const popupImageContainer = document.querySelector('#popup-image');
const popupImageViewContainer = document.querySelector('#popup__image-container');

const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');

const cardTemplate = document
    .querySelector('#card-template')
    .content.querySelector('.element');
const elementsCardContainer = document.querySelector('.elements');
const cardName = document.querySelector('.element__title');

const formEditElement = document.querySelector('#edit-popup');
const formCardElement = document.querySelector('#card-popup');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const nameCardInput = document.querySelector('.popup__text_type_namecard');
const linkCardInput = document.querySelector('.popup__text_type_linkcard');
const openImage = document.querySelector('.popup__image-view');
const openImageTitle = document.querySelector('.popup__image-title');


// функция для переиспользования, создание шаблона карточки // 
function createCard (item) {
    const cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector('.element__title').textContent = item.name;
        cardElement.querySelector('.element__image').src = item.link;
        cardElement.querySelector('.element__image').alt = item.name;
        cardElement.querySelector('.element__trash').addEventListener('click', () => {
            cardElement.remove();
        });
        cardElement.querySelector('.element__like').addEventListener('click', cardToLike);

        return cardElement;
}

//создаем новую карточку c названием и фотографией//
function handleCardFormSubmit (event) {
    event.preventDefault(); 

    const name = nameCardInput.value; 
    const link = linkCardInput.value; 
    const cardElement = createCard({name : name, link : link});

    elementsCardContainer.prepend(cardElement);
    closePopup(popupCardContainer);

  //   if(event.key === 'Escape') {
  //     closePopup(popupCardContainer);
  //  }

    event.target.reset()
};


// собираем карточки в массив и сразу вызываем функцию//
function provideCards () {
    const cardsElement = initialCards.map((item) => {
        return createCard(item); 
    })
    elementsCardContainer.append(...cardsElement);
}
provideCards();


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

}

// форма для редактироdания данных о пользователе//
function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEditContainer);

    console.log(profileTitle.textContent);
    console.log(handleFormSubmit);
};

function cardToLike (event) {
    event.target.classList.toggle('element__like_active');
}

// функция открытия popup с карточкой//
function openImagePopup(event) {
    event.preventDefault(); 
    // event.stopPropagation();
    if (event.target.src) {
       openImage.src = event.target.src;
       openImage.alt = event.target
       .closest('.element')
       .querySelector('.element__title').textContent;

       openPopup(popupImageContainer);
    };

    openImageTitle.textContent = event.target
        .closest('.element')
        .querySelector('.element__title').textContent;
}

closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
  });

popupOpenEditBtn.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditContainer);
}); 

popupAddCardBtn.addEventListener("click", () => {
    openPopup(popupCardContainer)
}); 

popupOpenImage.addEventListener("click", openImagePopup);

// popupCloseEditBtn.addEventListener("click", () => {
//     closePopup(popupEditContainer)
// });

// popupCloseCardBtn.addEventListener("click", () => {
//     closePopup(popupCardContainer)
// });

// popupCloseImageBtn.addEventListener("click", () => {
//     closePopup(popupImageContainer)
// });

formEditElement.addEventListener("submit", handleFormSubmit); 
formCardElement.addEventListener("submit", handleCardFormSubmit);



const formsConfig = {
  formSelector: '.popup__input',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input-error_active'
};



enableValidation(formsConfig);



