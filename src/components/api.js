export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _resResponse (res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
        };

    getUserInfo () {
        return fetch(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._resResponse(res))
        };

    editUserInfo (data) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name: data.nameauthor, about: data.aboutauthor})
        }).then((res) => this._resResponse(res))
        };   
    
    getAllCards () {
        return fetch(`${this._url}cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._resResponse(res))
        };

    addNewCard({name, link}) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name, link})
        }).then((res) => this._resResponse(res))
        };
    
    deleteCard(idCard) {
        return fetch(`${this._url}cards/${idCard}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._resResponse(res))
        };

    editAvatarInfo (data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: data.linkavatar})
        }).then((res) => this._resResponse(res))
        };  
    
    setLikes(idCard) {
        return fetch(`${this._url}cards/${idCard}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => this._resResponse(res))
        };

    deleteLikes(idCard) {
        return fetch(`${this._url}cards/${idCard}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._resResponse(res))
        };

    }





    // getCardById () {
    //     return fetch(`${this._url}cards`, {
    //         method: "GET",
    //         headers: this._headers,
    //     }).then((res) => this._resResponse(res))
    //     };    
    
    

