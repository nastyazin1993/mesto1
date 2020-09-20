export default class UserInfo {
  constructor({ nameText, professionText }) {
    this._nameText = nameText;
    this._professionText = professionText;
  }
  getUserInfo() {
    const authorInfo = {
      names: this._nameText.innerText,
      profession: this._professionText.innerText,
    };
    return authorInfo;
  }
  setUserInfo({ names, profession }) {
    this._nameText.textContent = names;
    this._professionText.textContent = profession;
  }
}
