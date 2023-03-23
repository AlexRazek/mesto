

export default class UserInfo {
    constructor({profileTitle, profileSubtitle}) {
      this._name = profileTitle;
      this._aboutUser = profileSubtitle;
    };

getUserInfo () {
    return {
        username: this._name.textContent,
        userAbout: this._aboutUser.textContent,
    };
};

setUserInfo (username, userAbout) {
    this._name.textContent = username;
    this._aboutUser.textContent = userAbout;
    };
}    
