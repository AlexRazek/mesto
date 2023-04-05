import Api from '../components/api.js'
import Card  from '../components/Card.js';
import Section  from '../components/Section.js';
import { handleCardClick } from '../pages/index.js'

import { elementsCardContainer } from '../utils/constants.js'



export const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-63/',
    headers: {
      'Content-type': 'application/json',
      authorization: '940ae192-79e3-4af0-9ee8-6874bf99bd0d'
    }
  });

//функция для создания карточек
export const provideCards = (item) => {
    const cards = new Card(item, "#card-template", handleCardClick);
    const cardsView = cards.generateCard();
    return cardsView;
  };

// наполнение готовыми карточками через слой Section
export const createCards = new Section({
    // items: initialCards,
    renderer: (item) => {
      createCards.setItem(provideCards(item));
    }
  }, elementsCardContainer);  
  // createCards.renderItems();
  