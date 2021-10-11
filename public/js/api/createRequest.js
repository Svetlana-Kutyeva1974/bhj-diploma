/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
                                                                            
const createRequest = (options = {}) => {
let url = new URL(options.url, `http://localhost:8000`);
let method = options.method;
let callback = options.callback;
let data = options.data;                                

const xhr = new XMLHttpRequest;
xhr.responseType = 'json';
                                            
  try {
    if (method === `GET`){
      for (let key in data) {
        url.searchParams.append(`${key}`, data[key]);
        console.log(url);
      }

      xhr.open( method, url );
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
      console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      //callback( e );
      callback(xhr.status , xhr.response);
    } else { // если всё прошло гладко, выводим результат
     // alert(`Готово, получили ${xhr.response.length} байт`); 
      callback(xhr.status , xhr.response);
  }
};

xhr.onerror = function() {
  throw new Error('Запрос не удался');//console.log("Запрос не удался");
  callback( err );
};

}

       