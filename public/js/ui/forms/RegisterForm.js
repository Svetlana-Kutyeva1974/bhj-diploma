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
    User.register(data,(err, response) => {
      if (err !== null)
    {
      console.log (err);

      
    }
      
    });
    //при успешной регистрации? это где проверять, в юзере итак стоит проверка
    
   // App.getForm('register').reset();
    this.element.reset();
    App.setState( 'user-logged' );
    App.getModal('register').close();//закрывает окно, в котором находится форма

   /* App.getWidget('user').open();//открываем панели
    App.getWidget('accounts').open();
    App.getWidget('transactions').open();*/
    
    //this.initWidgets();


  }
}
