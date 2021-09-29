/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element === null) {
      alert("Ошибка. Элемент не задан");
    }
    else{
      this.element = element;
      console.log("транзакции Widget"+ this.element);

    }
    this.registerEvents();//?

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    document.querySelector('button.create-income-button').addEventListener('click', ()=> {
      App.getModal('newIncome').open();
    });
    document.querySelector('button.create-expense-button').addEventListener('click', ()=> {
      App.getModal('newExpense').open();
    });


  }
}
