let popupOpenBtn = document.querySelector('.profile__info-edit-button');
let popupContainer = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__closed');  

let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

console.log(profileTitle.textContent)
console.log(profileSubtitle.textContent)

let formElement = document.querySelector('.popup__input');


function openPopup () {
    formElement[0].value = profileTitle.textContent;
    formElement[1].value = profileSubtitle.textContent;
    popupContainer.classList.add('popup_opened');
    console.log(openPopup)
    
};

function closePopup () {
    popupContainer.classList.remove('popup_opened');
    console.log(closePopup)
};


function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = formElement[0].value;
    profileSubtitle.textContent = formElement[1].value;
    console.log(profileTitle.textContent);
    closePopup();
    console.log(handleFormSubmit);
};



popupOpenBtn.addEventListener("click", openPopup); 

popupCloseBtn.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleFormSubmit); 