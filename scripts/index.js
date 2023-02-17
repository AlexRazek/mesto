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
// const popupOpenImage = document.querySelector('.elements');


const popupContainers = document.querySelectorAll('.popup');

// const popupCloseEditBtn = document.querySelector('.popup__closed');
// const popupCloseCardBtn = document.querySelector('#popup-addcard .popup__closed');
// const popupCloseImageBtn = document.querySelector('#popup-image .popup__closed');
const closeButtons = document.querySelectorAll('.popup__closed');
const buttonCard = document.querySelector('#btn-card')

const popupEditContainer = document.querySelector('#popup-edit');
const popupCardContainer = document.querySelector('#popup-addcard');
const popupCardFormContainer = document.querySelector('#card-popup');


const popupImageContainer = document.querySelector('#popup-image');
const popupImageViewContainer = document.querySelector('#popup__image-container');

const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');

const cardTemplate = document
    .querySelector('#card-template')
    .content.querySelector('.element');
const elementsCardContainer = document.querySelector('.elements');
const cardName = document.querySelector('.element__title');

const formEditElement = document.forms['form-popup'];
const formCardElement = document.forms['form-card'];

const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const nameCardInput = document.querySelector('.popup__text_type_namecard');
const linkCardInput = document.querySelector('.popup__text_type_linkcard');
const openImage = document.querySelector('.popup__image-view');
const openImageTitle = document.querySelector('.popup__image-title');


// функция для переиспользования, создание шаблона карточки // 
function createCard (item) {
    
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

        cardElement.querySelector('.element__title').textContent = item.name;
        cardImage.src = item.link;
        cardImage.alt = item.name;
        cardElement.querySelector('.element__trash').addEventListener('click', () => {
            cardElement.remove();
        });
        cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
          evt.target.classList.toggle('element__like_active');
        });

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
    event.target.reset();
};

// собираем карточки в массив и сразу вызываем функцию//
function provideCards () {
    const cardsElements = initialCards.map(createCard)

    elementsCardContainer.append(...cardsElements);
}
provideCards();


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
};


// форма для редактироdания данных о пользователе//
function handleProfileFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEditContainer);
};


// функция открытия popup с карточкой//
elementsCardContainer.addEventListener("click", (event) => {
  event.preventDefault(); 

  const cardTitle = event.target
  .closest('.element')
  .querySelector('.element__title')

  if (event.target.src) {
     openImage.src = event.target.src;
     openImage.alt = cardTitle.textContent;
     openImageTitle.textContent = cardTitle.textContent;

     openPopup(popupImageContainer);
  };
});

// закрытие модалки по overlay и с помощью крестика//
const popups = document.querySelectorAll('.popup')

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || 
      (evt.target.classList.contains('popup__closed'))) {
        closePopup(popup);
      };
    });
  });


// закрытие попап по esc//
const handleEscape = evt => {
  if (evt.key === "Escape" || evt.key === "Esc" || evt.keyCode == 27) {
    closePopup(document.querySelector('.popup_opened'));
  };
};


popupOpenEditBtn.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditContainer);
}); 

popupAddCardBtn.addEventListener("click", () => {
    openPopup(popupCardContainer)
}); 

formEditElement.addEventListener("submit", handleProfileFormSubmit); 
formCardElement.addEventListener("submit", handleCardFormSubmit);




// elementsCardContainer.addEventListener("click", openImagePopup);


// пометка like//
// function toggleLike (event) {
//     event.target.classList.toggle('element__like_active');
// }

// popupCloseEditBtn.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     closePopup(popupEditContainer)
// });

// popupCloseCardBtn.addEventListener("click", () => {
//     closePopup(popupCardContainer)
// });

// popupCloseImageBtn.addEventListener("click", () => {
//     closePopup(popupImageContainer)
// });



// // функция закрытия всех крестиков //
// closeButtons.forEach((button) => {
//     // находим 1 раз ближайший к крестику попап 
//     const popup = button.closest('.popup');
//     // устанавливаем обработчик закрытия на крестик
//     button.addEventListener('click', () => closePopup(popup));
// });


// // функция закрытия по нажатию за пределами модального окна //
// popupContainers.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === evt.currentTarget) {
//       closePopup(popup);
//     };
//   });
// });







