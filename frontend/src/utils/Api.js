import { options } from "./options"
class Api {
  constructor(options) {
    this._authorization = `Bearer ${localStorage.getItem("token")}`;
    this._cohort = options.cohort
    this._baseURL = options.baseURL
    this._user = {}
  }
  getUser() {
   return fetch(`${this._baseURL}/users/me`, {
    credentials: 'include',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      credentials: 'include',
       headers: {
         authorization: this._authorization
       }
     })
       .then(this._checkResponse)
   }
  saveUserData(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(this._checkResponse)
  }
  postCard(name, link) {
    return fetch(`${this._baseURL}/cards`,{
      method: "POST",
      credentials: 'include',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this._checkResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: this._authorization,
      }
    })
      .then(this._checkResponse)
  }
  like(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`,{
      method: "PUT",
      credentials: 'include',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }
  unlike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`,{
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }
  changeProfilePic(avatar) {
    return fetch(`https://api.saveliev.nomoredomains.icu/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse)
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`???????????? ${res.status}`)
  }
}

export const bid = new Api(options)

