/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account'; 
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){

    createRequest({
      url: this.URL + `/${id.id}`,
      data : {},
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
}
