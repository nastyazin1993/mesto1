export default class UserInfo {
  constructor({ nameText, professionText,  profileAvatar}) {
    this._nameText = nameText;
    this._professionText = professionText;
    this._profileAvatar = profileAvatar
  }
  getUserInfo() {
    const authorInfo = {
      name: this._nameText.innerText,
      about: this._professionText.innerText,
    };
    return authorInfo;
  }
  setUserInfo({ name, about }) {
    this._nameText.textContent = name;
    this._professionText.textContent = about;
  }
  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
}
