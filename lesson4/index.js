// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.
// Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
// 2. Сделать поиск по товарам на странице. При клике на кнопку поиска должны перерисовываться товары,
// подходящие под условие поиска ИЛИ скрывать лишние товары
// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
//     a. Имя содержит только буквы.
//     b. Телефон имеет вид +7(000)000-0000.
//     c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
//     d. Текст произвольный.
//     e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

function fourText() {

  console.log('Текст')
  mainList.innerHTML = ''

  const textResult = document.createElement('div')
  textResult.classList.add('input-group', 'mt-2')

  textResult.innerHTML = `
  <span class="input-group-text">Результат</span>
  <textarea class="form-control" aria-label="With textarea" disabled></textarea>`

  let text = textResult.querySelector('.form-control')

  const textAria = document.createElement('div')
  textAria.classList.add('input-group')

  textAria.innerHTML = `
  <span class="input-group-text">Поля для ввода</span>
  <textarea class="form-control" aria-label="With textarea"></textarea>`

  textAria.querySelector('.form-control').addEventListener('keyup', (e) => {
    let state = e.target.value
    regExp(state)
  })
  mainList.appendChild(textAria)
  mainList.appendChild(textResult)

  /**
  * замена на двойные ковечки и оставляет одинарные
  */
  function regExp(item) {
    const regexp = new RegExp('\'', 'gm');
    const regexp_ = /\b\"\b/gm;
    let regResult = item.replace(regexp, '"');
    regResult = regResult.replace(regexp_, '\'');

    text.value = regResult
  }
}

/**
 * поиск
 */
function fourSearch() {

  cleanerMenu()

 function searchTo(obj = appleObject){
   landingPage() /** чистка страницы **/

   class Catalog {
     constructor(goods = {}) {
       this.goods = goods
       this.render()
       this.renderMenu()
     }

     /**
      * шаблон карточки товара
      */
     product({ img = './img/holder.png', title, price }) {
       return `<div class="col-lg-3 mb-4 col-md-4 col-sm-6">
        <div class="card">
          <img src=${img} class="card-img-top" alt=${title} width="259px" height="278px">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${price}</p>
            <button class="btn btn-success">купить</button>
          </div>
        </div>
      </div>`
     }

     /**
      * рендер меню
      */
     renderMenu(){
       const block = document.createElement('form')
       block.classList.add('d-flex')
       block.innerHTML = `
        <input class="form-control me-2 search" type="search" placeholder="поиск товаров" aria-label="Search">
        <button class="btn btn-outline-success back mx-2" type="submit">назад</button>`
       block.querySelector('.search').addEventListener('keyup', (e) => {
         e.preventDefault()
         const input = block.querySelector('.form-control').value
         this.searchLive(input)
       })
       block.querySelector('.back').addEventListener('click', (e) => {
         e.preventDefault()
         lesson4()
       })

       menuList.appendChild(block)
     }

     /**
      * живой поиск
      */
     searchLive(item){
       const regExp = new RegExp(item, 'i')
       let search = this.goods.filter(({title}) => regExp.test(title))
       if (search.length >= 1) this.render(search)
       else this.renderDefault()
     }

     /**
      * рендер на страницу
      */
     renderDefault() {
       mainList.innerHTML = '<div class="shadow-sm p-3 mb-5 bg-white rounded text-center">нечего не найдено</div>'
     }

     /**
      * рендер на страницу
      */
     render(item = this.goods) {
       mainList.innerHTML = item.map((el) => this.product(el)).join('')
     }

   }

   /**
    * класса Catalog
    */
   new Catalog(obj)
 }
  searchTo()
}

/**
 * форма
 */
function fourForm() {

  class FormValid{
    constructor() {
      this.renderHTML()
    }

    /**
     * input valid style
     */
    validForm(item, val){
      if(val === true) {
        item.style.outline = `3px solid rgb(0, 128, 0, .34)`
      } else {
        item.style.outline = `3px solid rgb(255, 0, 0, .32)`
      }
    }

    /**
     * input name
     */
    formValidName(item, val){
      console.log(val)
      const reg = /^[a-zа-яё]+$/gi
      const regexp = reg.test(val)
      console.log(regexp)
      this.validForm(item, regexp)
    }

    /**
     * input phone
     */
    formValidPhone(item, val){
      console.log(val)
      const reg = /^([+7]|[8])+\([\d]+\)\d{3}\-\d{4}/
      const regexp = reg.test(val)
      console.log(regexp)
      this.validForm(item, regexp)
    }

    /**
     * input email
     */
    formValidEmail(item, val){
      console.log(val)
      const reg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
      const regexp = reg.test(val)
      console.log(regexp)
      this.validForm(item, regexp)
    }

    /**
     * input text
     */
    formValidText(item, val){
      console.log(val)
      const reg = /[a-zа-яё0-9]/
      const regexp = reg.test(val)
      console.log(regexp)
      this.validForm(item, regexp)
    }

    /**
     * addEventListener для input
     */
    formValid() {
      const name = document.forms.lesson4.elements.name
      const phone = document.forms.lesson4.elements.phone
      const email = document.forms.lesson4.elements.email
      const text = document.forms.lesson4.elements.text

      name.addEventListener('keyup', (e) => {
        this.formValidName(name, e.target.value)
      })
      phone.addEventListener('keyup', (e) => {
        this.formValidPhone(phone, e.target.value)
      })
      email.addEventListener('keyup', (e) => {
        this.formValidEmail(email, e.target.value)
      })
      text.addEventListener('keyup', (e) => {
        this.formValidText(text, e.target.value)
      })
    }

    /**
     * рендер формы
     */
    renderHTML(){
      mainList.innerHTML = ''
      const form = document.createElement('form')
      form.classList.add('row', 'g-3', 'needs-validation', 'text-center')
      form.setAttribute('name', 'lesson4')
      form.innerHTML = `
        <div class="col-md-12 d-flex flex-column align-items-center">
          <div class="col-md-4 position-relative mt-2">
            <label for="name" class="form-label" style="font-size: 25px">Регулярные выражения</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="name">ИМЯ</span>
              <input type="text" class="form-control" name="name" id="name nameInput" placeholder="Николай">
              <div class="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
          <div class="col-md-4 position-relative mt-2">
            <div class="input-group has-validation">
              <span class="input-group-text" id="phone">ТЕЛЕФОН</span>
              <input type="tel" class="form-control" name="phone" id="phone phoneInput" placeholder="+7(000)000-0000">
              <div class="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
          <div class="col-md-4 position-relative mt-2">
            <div class="input-group has-validation">
              <span class="input-group-text" id="email">MAIL</span>
              <input type="email" class="form-control" name="email" id="email emailInput" placeholder="mymail@mail.ru">
              <div class="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
          <div class="col-md-4 position-relative mt-2">
            <div class="input-group has-validation">
              <span class="input-group-text" id="text">TEXT</span>
              <textarea type="text" class="form-control" name="text" id="text textInput" placeholder="любой текст"></textarea>
              <div class="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
        </div>`

      mainList.appendChild(form)
      this.formValid()
    }
  }
  new FormValid()
}