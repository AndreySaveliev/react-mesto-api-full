class AuthApi {
  constructor() {
    this._baseURL = 'https://api.saveliev.nomoredomains.icu'
  }

  signup(password, email) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._chechResponse)
  }

  signin(password, email) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._chechResponse)
  }

  checkMe(token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._chechResponse)
  }

  _chechResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }
}

export const auth = new AuthApi()