export default class UserInfo {
    constructor({profileTitle, profileSubtitle, profileId, profileAvatar}) {
      this._name = profileTitle;
      this._aboutUser = profileSubtitle;
      this._idUser = profileId;
      this._avatarUser = profileAvatar;

    };

getUserInfo () {
    return {
        nameauthor: this._name.textContent,
        aboutauthor: this._aboutUser.textContent,
    };
    };


setUserInfo ({nameauthor, aboutauthor}) {
    this._name.textContent = nameauthor;
    this._aboutUser.textContent = aboutauthor;
    };
}