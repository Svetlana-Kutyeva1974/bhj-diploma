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
      //alert("Ошибка. Элемент не задан");//
      throw new Error('Ошибка. Элемент не задан');
    }
    else{
      this.element = element;
    }
    this.registerEvents();
    this.update();
    this.accountList = {};

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    document.querySelector('.pull-right').addEventListener('click', ()=> {
      App.getModal('createAccount').open();
    });

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
    if (currentUser && currentUser != undefined) {
      Account.list(currentUser, (err, response) => {
        if (response && response.success === true) {
          this.accountList = response.data;
          this.clear();
          this.renderItem(response.data);
          this.registerEvents();//заново, т.к. перерисовали и не работает клик?
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

    if (isActive() !== -1) {
      allAccount[isActive()].classList.remove('active');
      allAccount[isCurrent()].classList.add('active');
    }
    else {
      allAccount[isCurrent()].classList.add('active');
    }
   App.showPage( 'transactions', { "account_id" : this.accountList[isCurrent ()]["id"] });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
      <li class="account">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>
    `;
  }

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
    }  
  }
}
