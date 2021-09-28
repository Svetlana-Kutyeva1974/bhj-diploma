/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
                                                                            
const createRequest = (options = {}) => {
let url = options.url;
let method = options.method;
let callback = options.callback;
let data = options.data;                                

const xhr = new XMLHttpRequest;
xhr.responseType = 'json';

                                            
  try {
    if (method === `GET`){
      xhr.open( method, `url?email=data.email&password=data.password` );
      xhr.send();
    }
    else {
       xhr.open( method, url );
       xhr.send( data );
    }

  }
  catch ( err ) {
    // перехват сетевой ошибки
    callback( err );
  }

  xhr.onload = function() {
  let body = xhr.response;
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //callback( e );
    callback(xhr.status , xhr.response);
  } else { // если всё прошло гладко, выводим результат
   // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    console.log('Готово, получили ' + xhr.status + body);
    callback(xhr.status , xhr.response);
  }
};

xhr.onerror = function() {
  alert("Запрос не удался");
  callback( err );
};

}
