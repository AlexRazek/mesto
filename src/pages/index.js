
import '../pages/index.css';
import { initialCards, enablesValidation } from '../utils/constants.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Card  from '../scripts/Card.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section';
import UserInfo from '../scripts/UserInfo';

import { popupOpenEditBtn, 
  popupAddCardBtn,
  popupEditContainer,
  popupCardContainer,
  profileTitle,
  profileSubtitle,
  formEditElement,
  formCardElement,
  elementsCardContainer,
  nameInput,
  jobInput,
  nameCardInput,
  linkCardInput,
  popupImageContainer,
  cardTemplate
} from '../utils/constants.js'



 
const popupWithImage = new PopupWithImage('.popup_type_picture')
popupWithImage.setEventListeners();



const handleCardClick = (link, name) => {
  popupWithImage.openCard(link, name);
};   

// наполнение готовыми карточками через слой Section
const createCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", handleCardClick);
    const cardElement = card.generateCard();
    createCards.setItem(cardElement);
  }
}, elementsCardContainer);  

createCards.renderItems();


// добавление карточек через popup
const addCardPopupWithForm = new PopupWithForm ('.popup_type_card-add', () => {
  createCards.renderItems(generateCard (
  {name : nameCardInput.value, link : linkCardInput.value}, "#card-template", handleCardClick));
  addCardPopupWithForm.closeForm();
  })
addCardPopupWithForm.setEventListeners();


const userInfo = new UserInfo({profileTitle, profileSubtitle});
console.log(profileTitle)


//попап редактирования профиля
const editProfilePopupWithForm = new PopupWithForm ('.popup_type_profile', ((evt, data) => {
    evt.preventDefault();
    userInfo.setUserInfo({username: data.username, userAbout: data.userAbout}),
  editProfilePopupWithForm.closePopup();
})
);
editProfilePopupWithForm.setEventListeners();


// проверяем валидацию для двух разных форм 
// для формы добавления карточки
const enableValidationAddCard = new FormValidator(enablesValidation, popupCardContainer);
enableValidationAddCard.enableValidation();

// для формы редактирования профиля 
const enableValidationEditCard = new FormValidator(enablesValidation, popupEditContainer);
enableValidationEditCard.enableValidation();


popupOpenEditBtn.addEventListener("click", () => {

  nameInput.value = userInfo.getUserInfo().username;
  console.log(nameInput.value)
  jobInput.value = userInfo.getUserInfo().userAbout;
  console.log(jobInput.value)
  editProfilePopupWithForm.openPopup();
  
}); 

popupAddCardBtn.addEventListener("click", () => {
addCardPopupWithForm.openPopup();
}); 


// общая функция для создания карточки
// function createCard (items, templates) {
//   return new Card(items, templates).generateCard();
// };

//создаем новую карточку c названием и фотографией//
// const handleCardFormSubmit = (event) => {
//   event.preventDefault(); 
//   elementsCardContainer.prepend(createCard (
//     {name : nameCardInput.value, link : linkCardInput.value}, "#card-template")
//   );
//   closePopup(popupCardContainer);
//   event.target.reset();
//   enableValidationAddCard.disableSubmitButton();
// };

// собираем карточки через Класс в массив и сразу вызываем функцию//
//   const provideCards = () => {
//     initialCards.forEach((item) => {
//     elementsCardContainer.append(createCard (item, "#card-template"));
//     });
//   }
// provideCards();



// форма для редактироdания данных о пользователе//
// function handleProfileFormSubmit (event) {
//     event.preventDefault(); 
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;
//     closePopup(popupEditContainer);
// };

// закрытие модалки по overlay и с помощью крестика//
// const popups = document.querySelectorAll('.popup')

//   popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//       if ((evt.target.classList.contains('popup_opened')) || 
//       (evt.target.classList.contains('popup__closed'))) {
//         closePopup(popup);
//       };
//     });
//   });




// formEditElement.addEventListener("submit", editProfilePopupWithForm); 
// formCardElement.addEventListener("submit", handleCardFormSubmit);


////////////


// elementsCardContainer.addEventListener("click", openImagePopup);


//создаем новую карточку c названием и фотографией//
// const handleCardFormSubmit = (event) => {

//     event.preventDefault(); 

//     const name = nameCardInput.value; 
//     const link = linkCardInput.value; 
//     const cardElement = new Card({name : name, link : link}, "#card-template");
    
//     elementsCardContainer.prepend(cardElement.generateCard());

//     closePopup(popupCardContainer);
//     event.target.reset();
// };


// собираем карточки через Класс в массив и сразу вызываем функцию//
// const provideCards = () => {
//   initialCards.forEach((item) => {
//   const cards = new Card(item, "#card-template");
//   const cardsView = cards.generateCard();

//   elementsCardContainer.append(cardsView);
//   });
// }
// provideCards();


// функция для переиспользования, создание шаблона карточки // 
// function createCard (item) {
    
//     const cardElement = cardTemplate.cloneNode(true);
//     const cardImage = cardElement.querySelector('.element__image');

//         cardElement.querySelector('.element__title').textContent = item.name;
//         cardImage.src = item.link;
//         cardImage.alt = item.name;
//         cardElement.querySelector('.element__trash').addEventListener('click', () => {
//             cardElement.remove();
//         });
//         cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
//           evt.target.classList.toggle('element__like_active');
//         });

//         return cardElement;
// }

// // функция открытия popup с карточкой//
// elementsCardContainer.addEventListener("click", (event) => {
//   event.preventDefault(); 

//   const cardTitle = event.target
//   .closest('.element')
//   .querySelector('.element__title')

//   if (event.target.src) {
//      openImage.src = event.target.src;
//      openImage.alt = cardTitle.textContent;
//      openImageTitle.textContent = cardTitle.textContent;

//      openPopup(popupImageContainer);
//   };
// });


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







