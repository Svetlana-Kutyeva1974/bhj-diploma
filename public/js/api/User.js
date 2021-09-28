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

    return userCurrent || undefined;
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
