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
    this.element.querySelector('.create-account').addEventListener('click', ()=> {
      App.getModal('createAccount').open();
    });
    let accounts = document.querySelector('.accounts-panel');
    accounts.addEventListener('click', (event)=> {
        event.preventDefault();
        this.onSelectAccount(event.Target);//
       // this.update();//?
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
      Account.list(currentUser, (err, response) => {//!!!! получаю ответ пустой список и ошибка в консоли
        if (response && response.success === true) {
          console.log("списоктекущ User ", response, response.account);
          AccountsWidget.clear();

          //для элементов массива response
          renderItem(response.account);//?
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
      for (let i of allAccount)
      {
        i.remove();
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
    if (isActive() !== -1) {
      allAccount[isActive()].classList.remove('active');
      allAccount[element].classList.add('active');//?
      // App.showPage( 'transactions', { account_id: id_счёта });
     // App.showPage( 'transactions', { account_id : `${account.id}` });
    }
    else{
     // allAccount[element].classList.add('active');// на чем вызвать
     // App.showPage( 'transactions', { account_id : `${account.id}` });
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
  if (item !== "") {
    let accountHTMLElement = document.createElement('li');
    accountHTMLElement.classList.add('active account');
    let childrens = document.querySelector('.accounts-panel').children;
    childrens[childrens.length-1].insertAdjacentElement('afterEnd', accountHTMLElement);
    childrens[childrens.length-1].insertAdjacentHTML('beforeEnd',`<a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>`);

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

  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.getAccountHTML(item);

  }
}
