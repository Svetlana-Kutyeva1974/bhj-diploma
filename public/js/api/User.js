/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {

     localStorage.setItem('user', JSON.stringify(user));//localStorige.setItem('user', user)
     console.log( localStorage.user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {

    //User.setCurrent( user );
    //let current = User.current();
    //console.log( current );

    localStorage.removeItem('user');

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let userCurrent = localStorage.getItem("user");
     // let userCurrent = localStorage.getItem(this);

    return (JSON.parse(userCurrent) || undefined) ;
    //return (userCurrent || undefined)
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      //data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        else {
          callback(err, response);
          this.unsetCurrent();
        }
        //callback(err, response);
      }
    });

  }

  //////////////////////////это было до меня
  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }
  //////////////////////////это было до меня

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      /*data: {
        name: data.name,
        email: data.email,
        password: data.password
      }*/
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      //data,
      callback: (err, response) => {
        if (response && response.user) {
          //this.setCurrent(response.user);
          this.unsetCurrent();
        }
          callback(err, response);
        //callback(err, response);
      }
    });
  }
}








//---

/*
class LogoutButton {
  constructor() {
    [this.logoutBtn] = document.getElementsByClassName('logout');
    this.action = (f) => f;
    this.logoutBtn.addEventListener('click', this.logoutClick.bind(this));
  }

  logoutClick(event) {
    event.preventDefault();
    this.action();
  }
}*/






/*

class UserForm {
  constructor() {
    this.loginForm = document.getElementById('login');
    this.registerForm = document.getElementById('register');
    this.loginForm.querySelector('.button').addEventListener('click', this.loginFormAction.bind(this));
    this.registerForm.querySelector('.button').addEventListener('click', this.registerFormAction.bind(this));

    this.loginErrorMessageBox = this.loginForm.querySelector('.ui.message');
    this.loginErrorMessageBox.style.display = 'none';
    this.registerErrorMessageBox = this.registerForm.querySelector('.ui.message');
    this.registerErrorMessageBox.style.display = 'none';

    this.loginFormCallback = (f) => f;
    this.registerFormCallback = (f) => f;
  }

  setLoginErrorMessage(message) {
    this.loginErrorMessageBox.innerText = message;
    this.loginErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.loginErrorMessageBox.style.display = 'none'; }, 5000);
  }

  setRegisterErrorMessage(message) {
    this.registerErrorMessageBox.innerText = message;
    this.registerErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.registerErrorMessageBox.style.display = 'none'; }, 5000);
  }

  loginFormAction(event) {
    event.preventDefault();
    this.loginFormCallback(this.getData(this.loginForm));
    this.loginForm.reset();
  }

  registerFormAction(event) {
    event.preventDefault();
    this.registerFormCallback(this.getData(this.registerForm));
    this.registerForm.reset();
  }

  getData(form) {
    const login = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;
    return { login, password };
  }
}

*/
/*


static login({ login, password }, callback) {
    const asyncPart = async () => {
      const body = JSON.stringify({ login, password });

      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const result = await ApiConnector.parseResponseBody(response);
      return result;
    };

    asyncPart()
      .then(({ responseBody }) => {
        callback(responseBody);
      })
      .catch((e) => {
        console.error("Произошла ошибка: ", e);
      });
  }


*/
  /**
   * Отправляет запрос на создание пользователя с переданными параметрами
   *
   //* @static
  // * @param {*} { username, password }
  /// * @param {Function} callback-функция с телом `data` в качестве параметра
  // * @memberof ApiConnector
   */
  /*static register({ login, password }, callback) {
    const asyncPart = async () => {
      const body = JSON.stringify({ login, password });

      const response = await fetch('user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const result = await ApiConnector.parseResponseBody(response);
      return result;
    };
    asyncPart()
      .then(({ responseBody }) => {
        callback(responseBody);
      })
      .catch((e) => {
        console.error("Произошла ошибка: ", e);
      });
  }
*/
  /**
   * Отправляет запрос на получение текущего авторизованного пользователя
   *
   * //@static
   * //@param {Function} callback-функция с телом `data` в качестве параметра
   //* @memberof ApiConnector
   */
  /*static current(callback) {
    const asyncPart = async () => {
      const response = await fetch('user/current', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await ApiConnector.parseResponseBody(response);
      return result;
    };
    asyncPart()
      .then(({ responseBody }) => {
        callback(responseBody);
      })
      .catch((e) => {
        console.error("Произошла ошибка: ", e);
      });
  }
*/
  /**
   //* Отправляет запрос деавторизацию пользователя
   *
  // * @static
  // * @param {Function} callback-функция с телом `data` в качестве параметра
  // * @memberof ApiConnector
   */
  /*static logout(callback) {
    const asyncPart = async () => {
      const response = await fetch('user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await ApiConnector.parseResponseBody(response);
      return result;
    };
    asyncPart()
      .then(({ responseBody }) => {
        callback(responseBody);
      })
      .catch((e) => {
        console.error("Произошла ошибка: ", e);
      });
  }


*/