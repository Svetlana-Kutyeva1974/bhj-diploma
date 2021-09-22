/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector("a.sidebar-toggle.visible-xs").addEventListener("click", (event) => {
      document.body.classList.toggle("sidebar-open");
      document.body.classList.toggle("sidebar-collapse");
    });
   
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    function clickNodeRegister(event){
      event.preventDefault();
      console.log(this);
      let nameModal = this.children[0].innerText;
       if (nameModal === "Вход") {
        //App.getModal("login");
        App.getModal("login").open();
       }
       if (nameModal === "Регистрация") {
        //App.getModal("register");
        App.getModal("register").open();
       }
       if (nameModal === "Выход") {
         User.logout(callback);
       // if (response.success = true) {
         App.setState( 'init' );
       // }
       }

     // App.getModal();//#modal-register

     // this.querySelector("a").parentNode.remove();
    }
    document.querySelectorAll("ul.sidebar-menu li.menu-item").forEach((item) => {
      item.addEventListener('click', clickNodeRegister);
    });

  }
}