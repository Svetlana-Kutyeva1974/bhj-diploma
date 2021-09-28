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
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    } );
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formData = new FormData( this.element );
    console.log(` Вот исходной формы: ${formData}`);
    const entries = formData.entries();
    let result = new FormData();
    for (let item of entries ) {
      const key = item[ 0 ],
      value = item[ 1 ];
      console.log(` Вот данные формы: ${key}: ${value}`);
       result.append(item[ 0 ], item[ 1 ]);
     // result.push({`${item}:${formData[item]}`});
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
    this.onSubmit(this.getData());
  }
}
