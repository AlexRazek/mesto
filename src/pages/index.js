
import '../pages/index.css';
import { api } from '../utils/utils';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js'
import Card  from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupAlert from '../components/PopupAlert.js';

import { popupOpenEditBtn, 
  popupAddCardBtn,
  popupEditContainer,
  popupCardContainer,
  popupAvatarContainer,
  popupAvatarBtn,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  elementsCardContainer,
  nameInput,
  jobInput,
  enablesValidation,
} from '../utils/constants.js'


let userId



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
  const cards = new Card(
    data
    , userId
    , "#card-template"
    , handleCardClick
    , handleCardDelete
    , { handleLikeDelete: (idCard) => {
      if(cards.isLiked) {
      // if(cards._likes.some((like) => like._id === userId)) {
        api.deleteLikes(idCard)
        // api.deleteLikes(data._id)
      .then((res) => {
        cards.deleteLike();
        cards.countLikes(res.likes);
      })
      .catch((err) => {
        console.log(`Ошибка при удалени лайка: ${err}`); // выведем ошибку в консоль
      })
    } else {
      // api.setLikes(data._id) 
      api.setLikes(idCard) 
      .then((res) => {
        cards.setLike();
        cards.countLikes(res.likes);
      })
      .catch((err) => {
        console.log(`Ошибка при установке лайка: ${err}`); // выведем ошибку в консоль
      })
    }
  }}
  );
  const cardsView = cards.generateCard();
  return cardsView;
};

export const handleCardClick = (link, name) => {
  popupWithImage.openCard(link, name);
}; 

const popupWithImage = new PopupWithImage('.popup_type_picture')
popupWithImage.setEventListeners();


// наполнение готовыми карточками через слой Section
export const createCards = new Section({
  renderer: (item) => {
    createCards.setItem(provideCards(item));
  }
}, elementsCardContainer);  


//данные User и аватар 
const userInfo = new UserInfo({profileTitle, profileSubtitle, profileAvatar});
console.log(profileTitle)


// обновление данных профиля через popup с помощью API
const editProfilePopupWithForm = new PopupWithForm (
  '.popup_type_profile', { 
    callbackSubmitForm: (data) => {
    editProfilePopupWithForm.setLoading(true);
    api.editUserInfo(data)
  .then((item) => 
    {userInfo.setUserInfo(
      {nameauthor: item.name, 
       aboutauthor: item.about});
      editProfilePopupWithForm.closeForm();
  })
  .catch((err) => {
    console.log(`Ошибка при редактировании профиля: ${err}`); // выведем ошибку в консоль
  })
  .finally(() => {
    editProfilePopupWithForm.setLoading(false);
  })
  }}
)
editProfilePopupWithForm.setEventListeners();


// добавление карточек через popup с помощью API //
const addCardPopupWithForm = new PopupWithForm (
  '.popup_type_card-add', { 
    callbackSubmitForm: (data) => {
    api.addNewCard(
      {name : data.namecard, 
      link : data.linkcard})
  .then((item) => 
    {createCards.setItem(provideCards(item));
    addCardPopupWithForm.closeForm();
  })
  .catch((err) => {
    console.log(`Ошибка при создании новой карточки: ${err}`); // выведем ошибку в консоль
  })
}}
)
addCardPopupWithForm.setEventListeners();


// удаление карточки через Popup по API
export const handleCardDelete = (idCard, elementCard) => {
  popupAlertDelete.openAlertForm(idCard, elementCard);
};  

const popupAlertDelete = new PopupAlert (
      '.popup_type_card-delete', { 
        callbackAlertForm: (idCard, elementCard) => {   
        api.deleteCard(idCard)
      .then(() => {
          elementCard.cardDelete(); 
          popupAlertDelete.closeAlertForm();
          console.log(elementCard);
    })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`); // выведем ошибку в консоль
  })
  }}
)
popupAlertDelete.setEventListeners();



//  редактирование фото аватара //
const editAvatarPopupWithForm = new PopupWithForm (
  '.popup_type_update-profile', { 
    callbackSubmitForm:(data) => {
    editAvatarPopupWithForm.setLoading(true);
    api.editAvatarInfo(data)
  .then((res) => 
    {userInfo.setAvatarUser({avatar: res.avatar});
    console.log(res);
  })
  .catch((err) => {
    console.log(`Ошибка изменении картинки: ${err}`); // выведем ошибку в консоль
  })
  .finally(() => {
    editAvatarPopupWithForm.setLoading(false);
    editAvatarPopupWithForm.closeForm();
  })
  }},
  )
  editAvatarPopupWithForm.setEventListeners();
  


// проверяем валидацию для трех разных форм 
// для формы добавления карточки
const enableValidationAddCard = new FormValidator(enablesValidation, popupCardContainer);
enableValidationAddCard.enableValidation();

// для формы редактирования профиля 
const enableValidationEditProfile = new FormValidator(enablesValidation, popupEditContainer);
enableValidationEditProfile.enableValidation();

// для формы редактирования аватара 
const enableValidationEditAvatar = new FormValidator(enablesValidation, popupAvatarContainer);
enableValidationEditAvatar.enableValidation();


// открытие Попапа с профилем
popupOpenEditBtn.addEventListener("click", () => {

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.nameauthor;
  console.log(nameInput.value)
  jobInput.value = userData.aboutauthor;
  console.log(jobInput.value);
  enableValidationEditProfile.disableSubmitButton();
  editProfilePopupWithForm.openPopup();
}); 

//открытие Попапа для добавления картинки с подписью
popupAddCardBtn.addEventListener("click", () => {
  enableValidationAddCard.disableSubmitButton();
  addCardPopupWithForm.openPopup();
}); 

// открытие Попапа подтверждения удаления 
// popupAlertContainer.addEventListener("click", () => {
//   popupAlertDelete.openPopup();
// }); 

//открытие Попапа для редактирования фото аватара
popupAvatarBtn.addEventListener("click", () => {
  enableValidationEditAvatar.disableSubmitButton();
  editAvatarPopupWithForm.openPopup();
});