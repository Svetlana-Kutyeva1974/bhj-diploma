/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if (element === null) {
      alert("Ошибка");
    }
    else{
      this.element = element;
      console.log("UserWidget"+ this.element);

    }
   this.update();//?
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){ 
    //где взять имя пользователя
   // this.widgets["user"].children[1].querySelector('p.user-name').innerText = "Пользователь";
    let currentUser = User.current(); 
    console.log("currentUser "+ currentUser);

    //где взять имя пользователя
   // this.widgets["user"].children[1].querySelector('p.user-name').innerText = "Пользователь";
   if (currentUser && currentUser != undefined) {
    this.element.innerText = currentUser.name;
  }
   else {
    console.log("Необходима автoризация");
   }
 }
  }
}
