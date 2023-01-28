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


let popupOpenEditBtn = document.querySelector('.profile__info-edit-button');
let popupOpenCardBtn = document.querySelector('.profile__add-button');
let popupCloseEditBtn = document.querySelector('.popup__closed');
let popupCloseCardBtn = document.querySelector('#popupAddCard .popup__closed');

let popupEditContainer = document.querySelector('#popupEdit');
let popupCardContainer = document.querySelector('#popupAddCard');

let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

const template = document.querySelector('#card-template').content.querySelector('.element');
let elementsCardContainer = document.querySelector('.elements');
let cardImgLink = document.querySelector('.element__image');
let cardName = document.querySelector('.element__title');
const cardLikeBtn = document.querySelector('.element__like');
const trashCardBtn = document.querySelector('.element__trash');


function provideCards (items) {
    let cardsElement = initialCards.map((item) => {
        let cardElement = template.cloneNode(true);
        cardElement.querySelector('.element__title').textContent = item.name;
        cardElement.querySelector('.element__image').src = item.link;
        return cardElement;
    })
    elementsCardContainer.append(...cardsElement);
}

provideCards();


console.log(profileTitle.textContent)
console.log(profileSubtitle.textContent)

let formElement = document.querySelector('.popup__input');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_about');
let nameCardInput = document.querySelector('.popup__text_type_namecard');
let linkCardInput = document.querySelector('.popup__text_type_linkcard');



function openEditPopup () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupEditContainer.classList.add('popup_opened');
    console.log(openEditPopup);
};

function openCardPopup () {
    // nameInput.value = profileTitle.textContent;
    // jobInput.value = profileSubtitle.textContent;
    popupCardContainer.classList.add('popup_opened');
    console.log(openCardPopup)
};

function closeEditPopup () {
    popupEditContainer.classList.remove('popup_opened');
    console.log(closeEditPopup);
};

function closeCardPopup (event) {
    event.preventDefault();
    popupCardContainer.classList.remove('popup_opened');
    console.log(closeCardPopup);
};


function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    console.log(profileTitle.textContent);
    closeEditPopup();
    console.log(handleFormSubmit);
};

function cardToLike () {
    cardLikeBtn.classList.toggle('element__like_active');
}



popupOpenEditBtn.addEventListener("click", openEditPopup); 
popupOpenCardBtn.addEventListener("click", openCardPopup); 

popupCloseEditBtn.addEventListener("click", closeEditPopup);
popupCloseCardBtn.addEventListener("click", closeCardPopup);

formElement.addEventListener("submit", handleFormSubmit); 

cardLikeBtn.addEventListener("click", cardToLike);