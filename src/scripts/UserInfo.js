export default class UserInfo {
    constructor({profileTitle, profileSubtitle}) {
      this._name = profileTitle;
      this._aboutUser = profileSubtitle;
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