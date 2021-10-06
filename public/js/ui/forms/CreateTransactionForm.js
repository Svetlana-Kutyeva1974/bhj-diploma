/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList;
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let currentUser = User.current();
    if (currentUser && currentUser != undefined) {
      Account.list(currentUser, (err, response) => {
        if (response && response.success === true) {
          console.log("списоктекущ User ", response, response.data);
           const accountListInSelect = document.getElementById('expense-accounts-list');
           const accountListInSelect2 = document.getElementById('income-accounts-list');
           accountListInSelect.innerHTML = "";
                for (let item of response.data) {
                  let accountElement = `<option value="${item.id}">${item.name}</option>`;
                  accountListInSelect.innerHTML += accountElement;
                }
                accountListInSelect2.innerHTML = accountListInSelect.innerHTML;
        
          

        }
      });
    }
}

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, ( err, response ) => {
       console.log( "  получен", response ); 
       if (response && response.success === true) {
        console.log("новfz  транз", response);
        this.element.reset();
        const idModal = this.element.closest('div.modal').getAttribute('data-modal-id');
        App.getModal(`${idModal}`).close();
        App.update();
       }
        else {
          alert(response.err);
        }
    });  
  }
}
