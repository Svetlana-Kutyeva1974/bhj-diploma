/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, callback);
    //при успешной регистрации cбрасывает? это где проверять, в юзере итак стоит проверка
    App.modals('login').reset();
    App.setState( 'user-logged' );
    App.modals('login').close();
   // App.getWidget['user'].open();//?
    App.getWidget('user').open();//открываем панели
    App.getWidget('accounts').open();
    App.getWidget('transactions').open();


    //this.element.close();//this.element.Modal.close();
    /* document.querySelector(".transactions-panel").style.display = "block";
    document.querySelector(".accounts-panel").style.display = "block";
    document.querySelector(".user-panel").style.display = "block";*/

  }
}