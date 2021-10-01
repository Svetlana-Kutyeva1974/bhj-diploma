/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element === null) {
      alert("Ошибка. Элемент не задан");
    }
    else{
      this.element = element;
      console.log("акаунтWidget"+ this.element);

    }
    this.registerEvents();
    this.update();

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
   // this.element.querySelector('.create-account').addEventListener('click', ()=> {
    // document.querySelector('span.fa-plus').addEventListener('click', ()=> {
    document.querySelector('.pull-right').addEventListener('click', ()=> {
      App.getModal('createAccount').open();
     
    });

   /*let accounts = document.querySelector('ul.accounts-panel');
      accounts.addEventListener('click', (event)=> {
        event.preventDefault();
        if (event.target.matches('.account')) {
          this.onSelectAccount(event.target);
        }
      });*/

      document.querySelectorAll('.account').forEach((item) => {
        item.addEventListener('click', (event) => {
          event.preventDefault();
          this.onSelectAccount(event.target);
         // this.update();
      });
      });  
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let currentUser = User.current();
    console.log("текущий User для списка---- "+ currentUser);
    if (currentUser && currentUser != undefined) {
      Account.list(currentUser, (err, response) => {
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

      });
   }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const allAccount = Array.from(document.querySelectorAll('.account'));
      if ( allAccount.length !== 0 ) {
        for (let i of allAccount)
        {
          i.remove();
        }
      }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
   const allAccount = Array.from(document.querySelectorAll('.account'));
     function isActive () {
        return (allAccount.findIndex((item) => (item.classList.contains('active'))));
     }
     function isCurrent () {
        return (allAccount.findIndex((item) => (item === element.closest('.account'))));
     }
      function isCurrentData () {
        return (response.data.findIndex((item) => (item.name === element.closest('.account').querySelector(".span").innerText)));
     }

    if (isActive() !== -1) {
      allAccount[isActive()].classList.remove('active');
      allAccount[isCurrent()].classList.add('active');//?
      // App.showPage( 'transactions', { account_id: id_счёта });
     App.showPage( 'transactions', { account_id : `${response.data[isCurrentData ()].id}` });
    }
    else {
      allAccount[isCurrent()].classList.add('active');// на чем вызвать
      App.showPage( 'transactions', { account_id : `${response.data[isCurrentData ()].id}` });
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    console.log('отрисовываем', `
      <li class="account">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>
    `);
    /*
  if (item !== "") {
    let accountHTMLElement = document.createElement('li');
    accountHTMLElement.classList.add('active account');
    let childrens = document.querySelector('.accounts-panel').children;
    childrens[childrens.length-1].insertAdjacentElement('afterEnd', accountHTMLElement);
    childrens[childrens.length-1].insertAdjacentHTML('beforeEnd',`<a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>`);*/
    return `
      <li class="account">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>
    `;

  }
  /*так проще:

   {document.querySelector('ul.accounts-panel').innerHTML += `
    <li class="account">
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>
    </li>
    `;}*/


  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    if (data.length > 0) {
      data.forEach((item) => {
        document.querySelector('ul.accounts-panel').innerHTML += this.getAccountHTML(item);
      });
      //document.querySelector('ul.accounts-panel').children[1].classList.add('active');
    }  
  }
}
