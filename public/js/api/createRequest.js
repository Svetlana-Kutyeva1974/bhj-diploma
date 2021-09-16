/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
                                            //const createRequest = (options = {}) => {
                                            //const createRequest = (options = {url, data= 'null', method}) => {
const createRequest = (options = {}) => {
const url = options.url;
const method = options.method;
const callback = options.callback;
const data = options.data;
                                             //const { url, data, method} = option;

const xhr = new XMLHttpRequest;
xhr.responseType = 'json';

                                            //xhr.open( `${method}`, `${url?mail=data.mail&password=data.password}` ); 
  try {
  
    xhr.open( method, `url?mail=data.mail&password=data.password` );
    //  xhr.open( method, `url?mail=data.mail&password=data.password` );
   // xhr.open( method, `${url}?mail=${data.mail}&password=${data.password}` );
   // xhr.open( method, `${url}?mail=${options.mail}&password=${data.password}` );
    if (method === `GET`){
      xhr.send( data );
    }
    else {
      const formData = new FormData;
      formData.append( 'mail', data.mail );
      formData.append( 'password', data.password );
      xhr.send( formData );
    }

  }
  catch ( e ) {
    // перехват сетевой ошибки
    callback( e );
  }

  xhr.onload = function() {
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //callback( e );
    callback(xhr.status , xhr.response);
  } else { // если всё прошло гладко, выводим результат
   // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    alert('Готово, получили ' + xhr.response);
    callback(xhr.status , xhr.response);
  }
};

xhr.onerror = function() {
  alert("Запрос не удался");
  callback( e );
};

//усли метод гет , то
//если метод post, то
}

















//---------------------------------------------


 /* if (data != "" ){
      xhr.open( method, url );
      xhr.send( data );
      }
    else {
      xhr.open( method, url );
      xhr.send();

    }*/
   // xhr.open( `${method}`, `${url?mail=data.mail&password=data.password}` );
   // xhr.open( method, url );



/*
  // ...
  const xhr = new XMLHttpRequest;
  xhr.open( 'GET', 'http://localhost:8000/public/js?mail=mail&password=password' );
  xhr.send();
  // ...
  try {
    xhr.open( method, url );
    xhr.send( data );
  }
  catch ( e ) {
    // перехват сетевой ошибки
    callback( e );
  }
  */



/*

  createRequest({
    url: 'https://example.com', // адрес
    data: { // произвольные данные, могут отсутствовать
      email: 'ivan@poselok.ru',
      password: 'odinodin'
    },
    method: 'GET', // метод запроса
    //
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    //
    callback: (err, response) => {
      console.log( 'Ошибка, если есть', err );
      console.log( 'Данные, если нет ошибки', response );
    }
  });

*/






/*

В случае успешного выполнения кода, необходимо вызвать функцию, заданную в callback и передать туда данные:

// при успешном выполнении
  createRequest({
    url: 'https://example.com',
    method: 'GET',
    callback: ( err, response ) => {
      
        //при успешном выполнении err = null, response содержит данные ответа
      
      console.log( err ); // null
      console.log( response ); // ответ
    }
  });*/

// при ошибке
 /* createRequest({
    url: 'https://example.com',
    method: 'GET',
    callback: ( err, response ) => {
      console.log( err ); // объект ошибки
    }
  });
*/








/*
{login, password}
xhr.open(method, URL, [async, user, password])
let formData = new FormData(message);
let xhr = new XMLHttpRequest();

// 1. Создаём новый XMLHttpRequest-объект
let xhr = new XMLHttpRequest();

// 2. Настраиваем его: GET-запрос по URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');


//!!!xhr.responseType = 'json'; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// 3. Отсылаем запрос
xhr.send();

// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function() {
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  } else { // если всё прошло гладко, выводим результат
    alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Получено ${event.loaded} из ${event.total} байт`);
  } else {
    alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
  }

};

xhr.onerror = function() {
  alert("Запрос не удался");
};






*/