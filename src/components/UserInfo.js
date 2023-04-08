export default class UserInfo {
    constructor({profileTitle, profileSubtitle, profileAvatar}) {
      this._name = profileTitle;
      this._aboutUser = profileSubtitle;
    //   this._idUser = idUser;
      this._avatarUser = profileAvatar;

    };

getUserInfo () {
    return {
        nameauthor: this._name.textContent,
        aboutauthor: this._aboutUser.textContent,
        // idUser: this._idUser,
        linkavatar: this._avatarUser.src,
    };
    };


setUserInfo ({nameauthor, aboutauthor}) {
    this._name.textContent = nameauthor;
    this._aboutUser.textContent = aboutauthor;
    };

// setIdUser () {

//     };

setAvatarUser ({avatar}) {
    this._avatarUser.src = avatar; 
};
}
