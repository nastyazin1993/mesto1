import {
  inputName,
  inputAboutName,
  inputEditAvatar,
  inputPlaceName,
  inputPlaceUrl,
} from "../utils/constants.js";

export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  deleteCard(url) {
    return fetch(`${this._url}cards/` + url, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }
  patchUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${inputName.value}`,
        about: `${inputAboutName.value}`,
      }),
      /*.then((res) => {
                if (res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
            })*/
    });
  }
  postCard() {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${inputPlaceName.value}`,
        link: `${inputPlaceUrl.value}`,
      }),
      /*.then((res) => {
                if (res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
            })*/
    });
  }
  getSumLikes() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers.then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      }),
    });
  }
  DeleteLike(url) {
    return fetch(`${this._url}cards/likes/` + url, {
      method: "DELETE",
      headers: this._headers,

      /*.then((res) => {
                if (res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
            })*/
    });
  }
  PutLike(url) {
    return fetch(`${this._url}cards/likes/` + url, {
      method: "PUT",
      headers: this._headers,

      /*.then((res) => {
                if (res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
            })*/
    });
  }
  patchUserAvatar() {
    
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${inputEditAvatar.value}`,
      }),
      /* .then((res) => {
                if (res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
            })*/
    });
  }
}
