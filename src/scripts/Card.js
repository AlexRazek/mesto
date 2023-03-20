import { openPopup } from "./Popup.js";
import {openImage, openImageTitle, popupImageContainer} from '../utils/constants.js';;
// import Popup from './Popup.js';


export { Card };

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }
   // метод для открытия карточки
  _handleCardClick() {
    openImage.src = this._link;
    openImage.alt = this._name;
    openImageTitle.textContent = this._name;

    openPopup(popupImageContainer);
 };

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

    // функция открытия popup с карточкой//
    this._element.querySelector('.element__image')
    .addEventListener("click", (event) => {
      event.preventDefault(); 
      this._handleCardClick();
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