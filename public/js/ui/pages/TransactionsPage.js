/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element === null) {
      throw new Error('Ошибка. Элемент не задан');
    }
    else{
      this.element = element;

    }
    this.element = element;
    this.registerEvents();
    this.accountGet = {};
    this.lastOptions = {};
    this.update();

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
   //this.renderTransactions([]);
   this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener("click", e => {
      e.preventDefault();
      const removeAccount = e.target.closest(".remove-account");
      const removeTransaction = e.target.closest(".transaction__remove");
      if (removeAccount) {
        this.removeAccount();
      }
      if (removeTransaction) {
        this.removeTransaction(removeTransaction.getAttribute('data-id'));
      }
    });
  }
  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    //if (Object.keys(this.lastOptions).length !== 0) {
    if (this.lastOptions.account_id !== '') {
     // console.log( " счет удаkляем этот", this.lastOptions.account_id ); 
    let questionModal = confirm('Вы согласны удалить счет?');
      if (questionModal) {//да
          let dataRemove = new FormData();
            for (let item of Object.keys(this.accountGet) ) {
             const key = item,
               value = this.accountGet[item];
               dataRemove.append(key, value);
            }
      
            Account.remove(dataRemove, ( err, response ) => {
              if (response && response.success === true) {
              console.log( " счет удален", response ); 
              this.clear();
              //this.renderTitle('Название счёта');
              //App.updateWidgets();//
              App.update(); //было до этого App.update();
             // this.renderTitle('Название счёта');//
              //this.update();
              //App.updateWidgets();//App.update()

             // this.registerEvents();//было  в пред вар//не влияет на кнопку

           }
            else {
              console.log(err);
            }
        });  

      } else {//нет
        return;
      }
    }//lastOptions
    else {
      console.log('Невозможно удалить счет!');
      return;
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    let questionModal = confirm('Вы согласны удалить транзакцию?');
      if (questionModal) {//да

        const dataRemove = new FormData();
        dataRemove.append(`id`, `${id}`); 

        Transaction.remove(dataRemove, ( err, response ) => {
           console.log( " транзакцию удалили", response ); 
           if (response && response.success === true) {
              //console.log("счет", response.account);
             this.clear();
             App.update();//App.updateWidgets(); ////this.update();//
             //App.updateWidgets();
             this.render(this.lastOptions);
             //this.registerEvents();//?
  
           }
           else {
             console.log(response.err);
           }
        });  
      }
      else {//ответ нет
        return;
      }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (Object.keys(options).length !== 0) {
      this.lastOptions = options;//static lastOptions = options;
      Account.get({id : options.account_id}, ( err, response ) => {
           if (response && response.success === true) {
            console.log("счет", response.data.name);
            this.accountGet = response.data;
            //this.clear();
            //this.renderTitle(response.data.name);
            //App.update();//App.updateWidgets();

              Transaction.list({account_id: this.lastOptions.account_id}, (err, response) => {
                if (response && response.success === true) {
                  console.log("спис транзакций ", response.data);
                  this.clear();
                  this.renderTitle(this.accountGet.name);
                  this.renderTransactions(response.data);
                  //App.update();

                  //this.registerEvents();

                  //this.update();//?!!!!! App.update иначе сабмиты не работают 2 раз
                  //this.registerEvents();//заново, т.к. перерисовали и не работает клик
                  
                  /*было, когда работало
                 this.clear();
                  this.renderTransactions(response.data);
                  this.registerEvents();//заново, т.к. перерисовали и не работает клик
              */
                }
                else{
                  console.log(err);
                }
               //callback(err, response);
            });

           }
            else {
              console.log(response.err);
            }
        });  

    }//if
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
   const allTransactions = Array.from(document.querySelectorAll('div.transaction'));
      if ( allTransactions.length !== 0 ) {
        for (let item of allTransactions)
        {
          item.remove();
        }
      }
   this.renderTransactions([]);
   this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    document.querySelector('span.content-title').innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const arrData = date.substr(0,10) ;//массив demo  //"T"
    //const arrTime = date.substr(11,5) ;
    const arrTime = `${(Number(date.substr(11,2)) + 3)}` + date.substr(13,3);
    const resultdate = arrData.split('-');
    const month = ['января' , 'февраля' , 'марта' , 'апреля', 'мая' , 'июня' , 'июля', 'августа' , 'сентября' , 'октября' , 'ноября' , 'декабря' ] 
      if (resultdate[1] === 0) {
        resultdate[1] = '12';
      }
    return `${resultdate[2]} ${month [Number(resultdate[1]-1)]} ${resultdate[0]} г. в ${arrTime}`;
  
  
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    return `
        <div class="transaction transaction_${item['type']} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item['name']}</h4>
            <!-- дата -->
            <div class="transaction__date">${this.formatDate(item['created_at'])}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
            ${item['sum']}<span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id=${item['id']}>
              <i class="fa fa-trash"></i>  
          </button>
      </div>
  </div>
    `;

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    if (data.length > 0) {
      data.forEach((item) => {
        document.querySelector('section.content').innerHTML += this.getTransactionHTML(item);
      });
    }

  }
}



















//-------------vмусор
 // dataRemove.append(`id`, `${this.lastOptions.account_id}`); 
          //dataRemove.append(`url`, `/${this.lastOptions.account_id}`); 
          //{id: `${this.lastOptions.account_id}`}
         // dataRemove.append(`id`, `${this.lastOptions.account_id}`); 
          //const data = {id : `${this.lastOptions.account_id}`};


          /*const resultDate = new Date(date).toLocaleDateString('ru');
  const resultdate = resultDate.split('.');
  const month = ['января' , 'февраля' , 'марта' , 'апреля', 'мая' , 'июня' , 'июля', 'августа' , 'сентября' , 'октября' , 'ноября' , 'декабря' ] 
    if (resultdate[1] === 0) {
      resultdate[1] = '12';
    }
        return `${resultdate[0]} ${month [Number(resultdate[1]-1)]} ${resultdate[1]} г. в ${arrTime}`;
*/
/* const arrData = date.split("T") ;//массив demo  //"T"
    const resultdate = arrData[0].split('-');
    const month = ['января' , 'февраля' , 'марта' , 'апреля', 'мая' , 'июня' , 'июля', 'августа' , 'сентября' , 'октября' , 'ноября' , 'декабря' ] 
    if (resultdate[1] === 0) {
      resultdate[1] = '12';
    }
    return `${resultdate[2]} ${month [Number(resultdate[1]-1)]} ${resultdate[0]} ${arrData[1].substr(0, 5)}`;
  */