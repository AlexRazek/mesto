export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }
   // метод для открытия карточки при клике на карточку (_handleCardClick()), убрал в PopupWithImage 



  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    // this._element.querySelector('.element__image').style.backgroundImage = url(`${this._link}`);
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector('.element__image')
    .addEventListener("click", (event) => {
      event.preventDefault(); 
      this._handleCardClick(this._link, this._name);
    });

    this._element.querySelector('.element__trash')
    .addEventListener('click', () => {
        this._element.remove();
    });

    this._element.querySelector('.element__like')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });
  }
};