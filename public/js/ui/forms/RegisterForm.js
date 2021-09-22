/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, callback);
    //при успешной регистрации? это где проверять, в юзере итак стоит проверка
    App.setState( 'user-logged' );
  
    this.element.close();//this.element.Modal.close();

  }
}