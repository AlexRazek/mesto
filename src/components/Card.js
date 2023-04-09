export default class Card {
  constructor(data, userId,  templateSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._idCard = data._id;
    this._idOwner = data.owner._id

    this._userId = userId;


    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    // this._trashIcon = this._element.querySelector('.element__trash');
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  // создание карточки
  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._trashIkon();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  // _deleteCard() {
  //   this._element.remove();
  // }

  _trashIkon = () =>{
    if (this._userId !== this._idOwner) {
      const trashIcon = this._element.querySelector('.element__trash')
      trashIcon.remove();
    };
  };

  _setEventListeners = () => {

    this._element.querySelector('.element__image')
    .addEventListener("click", (event) => {
      event.preventDefault(); 
      this._handleCardClick(this._link, this._name);
    });

    if (this._userId === this._idOwner) {
      this._element.querySelector('.element__trash').addEventListener('click', (event) => {
        event.preventDefault(); 
        this._handleCardDelete(this._idCard, this._element);
      // this._handleCardDelete({idCard: this._idCard, element: this._element})
      // this._handleCardDelete(this._deleteCard({idCard: this._idCard, element: this._element}))
      });
    }

    this._element.querySelector('.element__like')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });
    };
  }