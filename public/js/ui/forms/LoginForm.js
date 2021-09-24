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
    //User.login(data, callback);
    User.login( data, ( err, response ) => {
       console.log( response ); // Ответ
       if (response && response.success === true){
   // });
    //при успешной регистрации cбрасывает? это где проверять, в юзере итак стоит проверка
     // App.getForm('login').reset();
          this.element.reset();
      App.setState( 'user-logged' );
      App.getModal('login').close();
         
   // App.getWidget['user'].open();//?
    /*App.getWidget('user').open();//открываем панели
    App.getWidget('accounts').open();
    App.getWidget('transactions').open();*/

    //this.initWidgets();
    }
    else {
      console.log(err);
    }
    });

  }
}
