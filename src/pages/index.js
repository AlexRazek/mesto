
import '../pages/index.css';
import { api } from '../utils/functions';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/api.js'
import Card  from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupAlert from '../components/PopupAlert';

import { popupOpenEditBtn, 
  popupAddCardBtn,
  popupEditContainer,
  popupCardContainer,
  popupAvatarContainer,
  popupAvatarBtn,
  popupDeleteCardBtn,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  elementsCardContainer,
  nameInput,
  jobInput,
  enablesValidation,
  popupAlertContainer,
  initialCards,
  nameCardInput,
  linkCardInput
} from '../utils/constants.js'


let userId

// export const handleCardDelete = ({idCard, element}) => {
//   popupAlertDelete.openAlertForm({idCard, element})
// }; 


Promise.all([ api.getUserInfo(), api.getAllCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({nameauthor: userData.name, aboutauthor: userData.about});
    userInfo.setAvatarUser({avatar: userData.avatar});
    userId = userData._id;
    createCards.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке информации: ${err}`); // выведем ошибку в консоль
});



//функция для создания карточек
export const provideCards = (data) => {
  const cards = new Card(data, userId, "#card-template", handleCardClick, handleCardDelete);
  // console.log(idUser)
  const cardsView = cards.generateCard();
  return cardsView;
};

export const handleCardClick = (link, name) => {
  const popupWithImage = new PopupWithImage('.popup_type_picture')
  popupWithImage.openCard(link, name);
  popupWithImage.setEventListeners();
}; 

// const popupWithImage = new PopupWithImage('.popup_type_picture')
// popupWithImage.setEventListeners();


// наполнение готовыми карточками через слой Section
export const createCards = new Section({
  // items: initialCards,
  renderer: (item) => {
    createCards.setItem(provideCards(item));
  }
}, elementsCardContainer);  
// createCards.renderItems();


//данные User и аватар 
const userInfo = new UserInfo({profileTitle, profileSubtitle, profileAvatar});
console.log(profileTitle)


// // данные о пользователе через слой UserInfo по API
// api.getUserInfo()
//   .then((data) => {
//     userInfo.setUserInfo( 
//       {nameauthor: data.name, 
//        aboutauthor: data.about})
//   })
//   .catch((err) => {
//     console.log(`Ошибка при загрузке информации о пользователе: ${err}`); // выведем ошибку в консоль
// });

// обновление данных профиля через popup с помощью API
const editProfilePopupWithForm = new PopupWithForm (
  '.popup_type_profile', { 
    callbackSubmitForm: (data) => {
    editProfilePopupWithForm.setLoading(true);
    api.editUserInfo(data)
  .then((item) => 
    {userInfo.setUserInfo(
      {name: item.nameauthor, 
       about: item.aboutauthor});
      // editProfilePopupWithForm.closeForm();
  enableValidationAddCard.disableSubmitButton();
  })
  .catch((err) => {
    console.log(`Ошибка при редактировании профиля: ${err}`); // выведем ошибку в консоль
  })
  .finally(() => {
    editProfilePopupWithForm.setLoading(false);
    editProfilePopupWithForm.closeForm();
  })
  }}
)
editProfilePopupWithForm.setEventListeners();


// // наполнение готовыми карточками через слой Section по API
// api.getAllCards()
//   .then((data) => {
//   const createCards = new Section({
//     renderer: (item) => {
//     createCards.setItem(provideCards(item));
//   }
// }, elementsCardContainer);  
// // createCards.renderItems(data);

// })
// .catch((err) => {
//   console.log(`Ошибка при загрузке карточек: ${err}`); // выведем ошибку в консоль
// });


// добавление карточек через popup с помощью API //
const addCardPopupWithForm = new PopupWithForm (
  '.popup_type_card-add', { 
    callbackSubmitForm: (data) => {
    addCardPopupWithForm.setLoading(true)
    api.addNewCard(
      {name : data.namecard, 
      link : data.linkcard})
  .then((item) => 
    {createCards.setItem(provideCards(item));
  // enableValidationAddCard.disableSubmitButton();
  })
  .catch((err) => {
    console.log(`Ошибка при создании новой карточки: ${err}`); // выведем ошибку в консоль
  })
  .finally(() => {
    addCardPopupWithForm.setLoading(false);
    addCardPopupWithForm.closeForm();
  })
}}
)
addCardPopupWithForm.setEventListeners();


export const handleCardDelete = (data) =>{
  const popupAlertDelete = new PopupAlert (
      '.popup_type_card-delete', { 
        callbackAlertForm: (data) => {   
        api.deleteCard({idCard: data.idCard})
      .then((res) => {data.element.remove(); 
          popupAlertDelete.closePopup();
          // popupAlertDelete.deleteCard() 
          console.log(res);
    })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`); // выведем ошибку в консоль
  });
}}
  )
  popupAlertDelete.openAlertForm();
  popupAlertDelete.setEventListeners();
}

// export const handleCardDelete = ({data}) => {
//   popupAlertDelete.openAlertForm({data})
// }; 

// не сделан ....
// попап предупреждение об удалении карточки с помощью API
// const popupAlertDelete = new PopupAlert (
//   '.popup_type_card-delete', { 
//     callbackAlertForm: (data) => {   
//     api.deleteCard({idCard: data.idCard})
//   .then((res) => {data.element.remove();  
//       // popupAlertDelete.closePopup();
//       console.log(res);
//   // enableValidationAddCard.disableSubmitButton();
//   })
//   .catch((err) => {
//     console.log(`Ошибка при удалении карточки: ${err}`); // выведем ошибку в консоль
//   })
//   }
// })
// popupAlertDelete.setEventListeners();

//  редактирование аватара //

const editAvatarPopupWithForm = new PopupWithForm (
  '.popup_type_update-profile', { 
    callbackSubmitForm:(data) => {
    editAvatarPopupWithForm.setLoading(true);
    api.editAvatarInfo(data)
  .then((res) => 
    {userInfo.setAvatarUser({avatar: res.avatar});
    console.log(res);
  // editAvatarPopupWithForm.closeForm();
  // enableValidationAddCard.disableSubmitButton();
  })
  .catch((err) => {
    console.log(`Ошибка изменении картинки: ${err}`); // выведем ошибку в консоль
  })
  .finally(() => {
    editAvatarPopupWithForm.setLoading(false);
    editAvatarPopupWithForm.closeForm();
  })
  }}
  )
editAvatarPopupWithForm.setEventListeners();
  

// проверяем валидацию для двух разных форм 
// для формы добавления карточки
const enableValidationAddCard = new FormValidator(enablesValidation, popupCardContainer);
enableValidationAddCard.enableValidation();

// для формы редактирования профиля 
const enableValidationEditCard = new FormValidator(enablesValidation, popupEditContainer);
enableValidationEditCard.enableValidation();

// для формы редактирования аватара 
const enableValidationEditAvatar = new FormValidator(enablesValidation, popupAvatarContainer);
enableValidationEditAvatar.enableValidation();


// открытие Попапа с профилем
popupOpenEditBtn.addEventListener("click", () => {

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.nameauthor;
  console.log(nameInput.value)
  jobInput.value = userData.aboutauthor;
  console.log(jobInput.value)
  editProfilePopupWithForm.openPopup();
  
}); 

// открытие Попапа для добавления картинки с подписью
popupAddCardBtn.addEventListener("click", () => {
  addCardPopupWithForm.openPopup();
}); 

// открытие Попапа подтверждения удаления 
popupAlertContainer.addEventListener("click", () => {
  popupAlertDelete.openPopup();
}); 

popupAvatarBtn.addEventListener("click", () => {
  editAvatarPopupWithForm.openPopup();
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







