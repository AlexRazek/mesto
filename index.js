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
let popupOpenEditBtn = document.querySelector('.profile__info-edit-button');
let popupAddCardBtn = document.querySelector('.profile__add-button');
let popupOpenImage = document.querySelector('.elements');

let popupCloseEditBtn = document.querySelector('.popup__closed');
let popupCloseCardBtn = document.querySelector('#popup-addcard .popup__closed');
let popupCloseImageBtn = document.querySelector('#popup-image .popup__closed');

let popupEditContainer = document.querySelector('#popup-edit');
let popupCardContainer = document.querySelector('#popup-addcard');
let popupImageContainer = document.querySelector('#popup-image');
let popupImageViewContainer = document.querySelector('#popup__image-container');

let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

let cardTemplate = document
    .querySelector('#card-template')
    .content.querySelector('.element');
let elementsCardContainer = document.querySelector('.elements');
let cardName = document.querySelector('.element__title');

let formEditElement = document.querySelector('#edit-popup');
let formCardElement = document.querySelector('#card-popup');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_about');
let nameCardInput = document.querySelector('.popup__text_type_namecard');
let linkCardInput = document.querySelector('.popup__text_type_linkcard');
let openImage = document.querySelector('.popup__image-view');
let openImageTitle = document.querySelector('.popup__image-title');


//создаем новую карточку//
function handleCardFormSubmit (event) {
    event.preventDefault(); 

    let cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = nameCardInput.value;
    cardElement.querySelector('.element__image').src = linkCardInput.value;
    cardElement.querySelector('.element__like').addEventListener('click', cardToLike);
    cardElement.querySelector('.element__trash').addEventListener('click', () => {
        cardElement.remove();
    });
    
    elementsCardContainer.prepend(cardElement);
    closeCardPopup();

    nameCardInput.value = '';
    linkCardInput.value = '';
};

// собираем карточки в массив и сразу вызываем функцию//
function provideCards (items) {
    let cardsElement = initialCards.map((item) => {
        let cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector('.element__title').textContent = item.name;
        cardElement.querySelector('.element__image').src = item.link;
        cardElement.querySelector('.element__trash').addEventListener('click', () => {
            cardElement.remove();
        });
        cardElement.querySelector('.element__like').addEventListener('click', cardToLike);
        return cardElement;  
    })
    elementsCardContainer.append(...cardsElement);
}
provideCards();


function closeEditPopup () {
    popupEditContainer.classList.remove('popup_opened');
};

function closeCardPopup () {
    popupCardContainer.classList.remove('popup_opened');
};

function closeImagePopup () {
    popupImageContainer.classList.remove('popup_opened');
};


function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    console.log(profileTitle.textContent);
    closeEditPopup();
    console.log(handleFormSubmit);
};

function cardToLike (event) {
    event.target.classList.toggle('element__like_active');
}

// функция открытия popup с карточкой//
function openImagePopup(event) {
    event.preventDefault(); 
    event.stopPropagation();
    if (event.target.src) {
       openImage.src = event.target.src;
       popupImageContainer.classList.add('popup_opened');
    };

    openImageTitle.textContent = event.target
        .closest('.element')
        .querySelector('.element__title').textContent;
    
}

// popupOpenEditBtn.addEventListener("click", openEditPopup); 
popupOpenEditBtn.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupEditContainer.classList.add('popup_opened');
}); 

// popupOpenEditBtn.addEventListener("click", openCardPopup); 
popupAddCardBtn.addEventListener("click", () => {
    popupCardContainer.classList.add('popup_opened');
}); 

popupCloseEditBtn.addEventListener("click", closeEditPopup);
popupCloseCardBtn.addEventListener("click", closeCardPopup);
popupCloseImageBtn.addEventListener("click", closeImagePopup);


formEditElement.addEventListener("submit", handleFormSubmit); 
formCardElement.addEventListener("submit", handleCardFormSubmit);
popupOpenImage.addEventListener("click", openImagePopup);
