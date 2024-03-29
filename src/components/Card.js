export default class Card {
  constructor(data, userId,  templateSelector, handleCardClick, handleCardDelete, {handleLikeDelete}) 

    {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._idCard = data._id;
    this._likes = data.likes;

    this._idOwner = data.owner._id
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeDelete = handleLikeDelete;
   
    // this._trashIcon = this._element.querySelector('.element__trash');
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  // создание карточки //
  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._trashIkon();
    // this.countLikes();
    // this.isLikedCard();
    this._showLikeHeard(); 

    
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._data.likes.length;

    this._likeBtnCounter = this._element.querySelector('.element__like-counter');
    this._likeBtn = this._element.querySelector('.element__like');
    
    return this._element;
  };

// удаление иконки корзины //
  _trashIkon = () => {
    if (this._userId !== this._idOwner) {
      const trashIcon = this._element.querySelector('.element__trash')
      trashIcon.remove();
    };
  };

  // счетчик лайков //
  countLikes(likes) {
    this._likes = likes;
    const countLikes = this._element.querySelector('.element__like-counter')
    countLikes.textContent = likes.length
  }

  //показать активные лайки 
  _showLikeHeard() {
      if(this._isLikedCard()) {
        this.setLike(this._idCard);
        } else {
          this.deleteLike(this._idCard);
        };
      };

  // условие, если совпадает id usera и id лайка юзера, то true //
  _isLikedCard() {
        return this._data.likes.find((like) => like._id === this._userId)
      };
  
  isLikedIt() {
    return this.isLiked
  }    

  // установка лайка //
  setLike() {
    this._element.querySelector('.element__like').classList.add('element__like_active');
    this.isLiked = true; 
  };

   // удаление лайка //
  deleteLike() {
    this._element.querySelector('.element__like').classList.remove('element__like_active');
    this.isLiked = false; 
  };

  // удаление карточки //
  cardDelete() {
    this._element.remove();
  }

  // установка слушателей на изображение, корзику и лайк
  _setEventListeners = () => {

    this._element.querySelector('.element__image')
    .addEventListener("click", (event) => {
      event.preventDefault(); 
      this._handleCardClick(this._link, this._name);
    });

    if (this._userId === this._idOwner) {
      this._element.querySelector('.element__trash').addEventListener('click', (event) => {
        event.preventDefault(); 
        this._handleCardDelete(this._idCard, this);
      });
    }

    this._element.querySelector('.element__like')
    .addEventListener('click', (evt) => {
      evt.preventDefault(); 
      this._handleLikeDelete(this._idCard);
    });
    };
  }
 