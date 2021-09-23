/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element;
    console.log("окно" + this.element);

   /* if (this.element === null) {
      alert("Невозможно открыть модальное окно");
    }
    else {
      this.registerEvents();
    }
   */
   this.registerEvents();
   //this.
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    //.querySelector("div").addEventListener('click', this.Modal.onClose);
     Array.from(this.element.querySelectorAll('[data-dismiss="modal"]')).forEach((item) => {
      item.addEventListener('click', this.onClose.bind(this));
    });
  }
  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose() {
   this.close();
   
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
   this.element.style.display = "block";
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = "none";//this.style.display = none;
  }

 
}
 //Modal.registerEvents();
