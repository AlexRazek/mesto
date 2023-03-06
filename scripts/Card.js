
const cardList = document.querySelector('.card-list__items');
const popupElement = document.querySelector('.popup');
const popupImage = document.querySelector('.popup__image');
const popupCloseButton = document.querySelector('.popup__closed');
const defaultCardButton = document.querySelector('.filter__button_type_grid');
const horizontalCardButton = document.querySelector('.filter__button_type_column');


class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    // this._element.querySelector('.element__image').style.backgroundImage = url(`${this._link}`);
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

//   _handleOpenPopup() {
//     popupImage.src = this._image;
//     popupElement.classList.add('popup_is-opened');
//   }

//   _handleClosePopup() {
//     popupImage.src = '';
//     popupElement.classList.remove('popup_is-opened');
//   }

  _setEventListeners() {

    this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._element.remove();
    });
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });
  }
};

export { Card };



// const renderElements = (isGrid) => {
//   cardList.innerHTML = '';
//   items.forEach((item) => {
//     const card = isGrid
//       ? new CreateCard(item, '.default-card')
//       : new HorizontalCard(item, '.horizontal-card');

//     const cardElement = card.generateCard();
//     cardList.append(cardElement);
//   });
// };

// renderElements();

// defaultCardButton.addEventListener('click', () => {
//   renderElements(true);
// }); 

// horizontalCardButton.addEventListener('click', () => {
//   renderElements(false);
// }); 