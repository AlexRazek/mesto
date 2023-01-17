


let popupOpenBtn = document.querySelector('.profile__info-edit-button');
let overlay = document.querySelector('.overlay')

let popupContainer = document.querySelector('.popup');



popupOpenBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(event.target);
    console.log(event.currentTarget);
    // console.log(openPopup);
    openPopup();
});


function openPopup () {
    popupContainer.classList.add('popup_opened');
    overlay.classList.add('overlay__is-active');
    // rootMain.classList.add('overlay');
    console.log(openPopup);
}

// создаем переменные для переноса текста из profile в popup //
let profileTitle = document.querySelector('.profile__info-title').textContent;
let profileSubtitle = document.querySelector('.profile__info-subtitle').textContent;


function addNameforPopup() {
    
    popupContainer.innerHTML = `
        <div class="popup__container">
            <button type="button" class="popup__closed"></button>
            <h2 class="popup__title">Редактировать профиль</h2>
            <form class="popup__input">
                <input type="text" id="nameauthor" value='${profileTitle}' class="popup__text popup__text_type_name">
                <input type="text" id="aboutauthor" value='${profileSubtitle}' class="popup__text popup__text_type_about">
                <button class="popup__submit-btn popup__submit-btn_action_add">Сохранить</button>
            </form>
        </div>
    `;
  }
  
  addNameforPopup();

let popupCloseBtn = document.querySelector('.popup__closed');  

popupCloseBtn.addEventListener("click", function(event) {
    // event.stopPropagation();
    event.preventDefault();
    console.log(event.target);
    console.log(event.currentTarget);
    closePopup();
});

function closePopup () {
    popupContainer.classList.remove('popup_opened');
    overlay.classList.remove('overlay__is-active');
    // rootMain.classList.remove('overlay')
    console.log(closePopup);
}

// создаем переменные для изменения текста в popup и внесения его в profile//  

let profileInfoContainer = document.querySelector('.profile__info')
let formElement = document.querySelector('.popup__input');
// let elem = form.elements.nameauthor;
// alert(elem.value);
// let nameInput = document.querySelector('input');
// let jobInput = document. querySelector('input');
let nameInput = document.querySelector('.popup__text-name');
let jobInput = document. querySelector('.popup__text-about');

console.log(formElement[0].value)
// console.log(nameInput.value); 
console.log(jobInput.value); 

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileInfoContainer.innerHTML = `
            <h1 class="profile__info-title">${formElement[0].value}</h1>
            <h2 class="profile__info-subtitle">${formElement[1].value}</h2>
            <button class="profile__info-edit-button"></button>
    `;
    closePopup();
}; 

// handleFormSubmit();

formElement.addEventListener('submit', handleFormSubmit); 

// h1.textContent = formElement[0].value;


// Находим форму в DOM
//let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
//let nameInput = // Воспользуйтесь инструментом .querySelector()
//let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// function handleFormSubmit (evt) {
    // evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
//}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', handleFormSubmit); 






// popupOpenBtn.addEventListener("click", function(event) {
//     // event.stopPropagation();
//     event.preventDefault();
//     console.log(event.target);
//     console.log(event.currentTarget);
//     // console.log(openPopup);
// });




// popupContainer.addEventListener ("click", function(event) {
//         // event.stopPropagation();
//         event.preventDefault();
//         console.log(event.target);
//         console.log(event.currentTarget);
// });


// popupOpenBtn = addEventListener("click", function(event) {
//     event.preventDefault();
//     console.log(event.target);
//     console.log(event.currentTarget);
//     if (event.Target = profile) {
//         openPopup();
//     }
// });





// let formElement = document.querySelector('.form');

// formElement.addEventListener('submit', function () {
//     console.log('Форма отправлена');
// });

// Чтобы такого поведения не происходило — передайте в функцию-обработчик
//  параметр evt. В самом начале тела функции вызовите метод evt.preventDefault() — это отменит стандартное событие. 
//  Подробнее о стандартных событиях и об их отмене расскажем в следующих спринтах, а сейчас — переходите к заданиям.