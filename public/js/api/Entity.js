/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
    url: this.URL, // адрес
    data,
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
     if (response && response.success) {
          console.log(response);
        }
          callback(err, response);
      }
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {

    createRequest({
    url: this.URL, 
    data,
    method: 'PUT', 
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
      if (err != null) {
        console.log( err );
      }
      console.log( 'Данные, если нет ошибб создали', response );
      callback(err, response);//''это забыла написать возврат надо было , иначе окно не закрывалось!!!
    }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
  /*  if (this.URL === '/account') {
      this.URL = this.URL + `/` + data.get(`id`);
     // data = {`id`: `${data.get(`id`)}`};
    }*/
    createRequest({
    url: this.URL, // адрес
    data,
    method: 'DELETE', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
      callback: (err, response) => {
        if (response && response.success) {
          console.log(response);
        }
        callback(err, response);
      }
    });
  }
}
