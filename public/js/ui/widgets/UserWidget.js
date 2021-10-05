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
      alert("Ошибка. Элемент не задан");
    }
    else{
      this.element = element;
      console.log("UserWidget"+ this.element);

    }
   //this.update();//?
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    let currentUser = User.current(); 
    console.log("текущий User---- "+ currentUser);
    if (currentUser && currentUser != undefined) {
    // document.querySelector(".user-panel").children[1].querySelector('p.user-name').innerHTML = currentUser.name;
    //document.querySelector(".user-name").textContent= JSON.parse(currentUser).name;
    document.querySelector(".user-name").textContent= currentUser.name;
   }
   else {
    alert("Необходима автoризация");
   }
 }

}
