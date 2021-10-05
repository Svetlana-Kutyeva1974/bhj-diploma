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
      //url: this.URL,
     // url: `${this.URL}/${id}`, // адрес,? url+id
      url: this.URL + `/${id.id}`,// + `${id}`,
    /*data: { // произвольные данные, могут отсутствовать
      email: data.email,
      password: data.password
    }*/
    data : {},
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    /*callback: (err, response) => {
      if (err != null) {
        alert( err );
      }
      callback(err, response);//''это забыла написать возврат надо было , иначе окно не закрывалось!!!

      // id что -то с ним нужно сделать? или по нему просто ищется счет
      //и возвращается в виде /account/2
    }*/

    callback: (err, response) => {
     if (response && response.success) {
          console.log(response);
        }
      
          callback(err, response);
      }
  
  });

  }
}
