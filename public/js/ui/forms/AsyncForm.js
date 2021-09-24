/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    this.element = element;
    console.log(this.element);

    if (this.element === null) {
      alert("Невозможно открыть окно формы");
    }
    else {
      this.registerEvents();
    }
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    console.log("регист событий на " + this + this.element);
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
     // e.Target.submit();

      this.submit();
    } );
     // this.element.preventDefault();//?
    //  this.element.addEventListener('submit', AsyncForm.submit);
   /* this.element.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(this.element)
    });*/


  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formData = new FormData( this.element ),
    entries = formData.entries();
    let result = {};

    for (let item of entries) {
      const key = item[ 0 ],
      value = item[ 1 ];
      console.log(` Вот данные формы: ${key}: ${value}`);
      result.push({key:value});
    }
    return result;
  }

  onSubmit(options){
    console.log( options );
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    //e.preventDefault();
   // AsyncForm.onSubmit(AsyncForm.getData());
   //e.Target.onSubmit(e.Target.getData());
    this.onSubmit(this.getData());
  }
}
