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
    App.setState( 'user-logged' );
    App.modals["login"].close();//this.element.close();

  }
}
