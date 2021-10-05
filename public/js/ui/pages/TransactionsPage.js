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

      alert("Ошибка. Элемент не задан");
    }
    else{
      this.element = element;
      console.log("акаунтWidget"+ this.element);

    }
    this.element = element;
    this.registerEvents();

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    //this.element.addEventListener('submit', (e) => {
      document.querySelector('button.remove-account').addEventListener('submit', (e) => {
      e.preventDefault();
      this.removeAccount.bind(this);
      //this.removeAccount(e.target);
    
    });

    /*  document.querySelector('button.transaction__remove').addEventListener('submit', (e) => {
      e.preventDefault();
      //e.target.dataset.id;
      this.removeTransaction(e.target.dataset.id);//this.removeTransaction(this.element.id);
      
    });*/ // пока не отрисуем транзакцию не раскомментируем

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
    let questionModal = confirm('Вы согласны удалить счет?');
      if (questionModal) {
        console.log('вы ответили да');
        Account.remove(this, ( err, response ) => {
           console.log( " счет удален", response ); 
           if (response && response.success === true) {
            //console.log("счет", response.account);
            //this.element.reset();
            this.clear();
            App.update();//App.updateWidgets();
           }
            else {
              alert(response.err);
            }
        });  


      } else {
        console.log('вы ответили нет');
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
      if (oquestionModal) {
        console.log('вы ответили да');
        Transaction.remove(id, ( err, response ) => {
           console.log( " счет удален", response ); 
           if (response && response.success === true) {
            //console.log("счет", response.account);
            //this.element.reset();
            this.clear();
            App.update();//App.updateWidgets();
           }
            else {
              alert(response.err);
            }
        });  


      } else {
        console.log('вы ответили нет');
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
           console.log( " счет получен", response ); 
           if (response && response.success === true) {
            console.log("счет", response.data.name);
            //this.element.reset();
            this.renderTitle(response.data.name);
            //App.update();//App.updateWidgets();

            //для счета получаем транзакции?

            //Transaction.list({url: `/${response.data.id}`, data : {}}, (err, response) => {
              Transaction.list({account_id: this.lastOptions.account_id}, (err, response) => {
                if (response && response.success === true) {
                  console.log("спис транзакций ", response);
                  this.renderTransactions(response);
                 // this.registerEvents();//заново, т.к. перерисовали и не работает клик
                }
              else{
                console.log(err);
              }
               //callback(err, response);
            });


           }
            else {
              alert(response.err);
            }
        });  

     /* let currentUser = User.current();
      console.log("текущий User для списка---- "+ currentUser);
      if (currentUser && currentUser != undefined) {*/
        /*Transaction.list(response, (err, response) => {
          if (response && response.success === true) {
            console.log("списоктекущ User ", response, response.data);
            //this.clear();
            //this.renderItem(response.data);
            
            
            this.clear();
            this.renderItem(response.data);
            this.registerEvents();//заново, т.к. перерисовали и не работает клик
          }
          else{
            console.log(err);
          }

        });*/
     // }

    }//if
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
   this.renderTransactions([]);

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector('span.content-title').innerText = name;

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    date = "2019-03-10 03:20:41" ;
    const arrData = date. split('') ;//массив
    const resultdate = arrData[0].split('-');
    /*
    const today = new Date( arrData[0] ) ;
    today.toLocaleString('default', { month: 'short' });
    */
    const month = ['января' , 'февраля' , 'марта' , 'апреля', 'мая' , 'июня' , 'июля', 'августа' , 'сентября' , 'октября' , 'ноября' , 'декабря' ] 
    return `${ resultdate[3]}${month [Number(resultdate[2])]}${resultdate[1]}${arrData[1].splice(6,3)}`;
    
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){

  }
}