/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';//может в конструкторе добавить ...args super(...args)
  //потому что другой url 
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){

    createRequest({
    url: URL, // адрес
    data: { // произвольные данные, могут отсутствовать
      email: data.email,
      password: data.password
    },
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
      console.log( 'Ошибка, если есть', err );
      console.log( 'Данные, если нет ошибки', response );

      // id что -то с ним нужно сделать
    }
  });

  }
}
