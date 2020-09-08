export default class UserInfo {
  constructor({ nameText, professionText }) {
    this._nameText = nameText;
    this._professionText = professionText;
  }
  getUserInfo() {
    const authorInfo = {
      nam: this._nameText.innerText,
      profession: this._professionText.innerText,
    };
    return authorInfo;
  }
  setUserInfo({ nam, profession }) {
    this._nameText.textContent = nam;
    this._professionText.textContent = profession;
  }
}
