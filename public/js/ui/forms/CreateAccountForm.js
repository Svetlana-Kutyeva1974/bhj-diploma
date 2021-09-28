/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create( data, ( err, response ) => {
       console.log( " счет получен", response ); 
       if (response && response.success === true) {
        console.log("новый счет", response);
        this.element.reset();
       // App.setState( 'user-logged' );
        App.getModal('createAccount').close();
        App.update();
       }
        else {
          alert(response.err);
        }
    });  
  }
}