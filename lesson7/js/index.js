const menuList = document.getElementById('menuList') /** меню в header */
const mainList = document.getElementById('mainList') /** главная страница */
const cartList = document.getElementById('cartList') /** корзина товар */
const cartPrice = document.getElementById('cartPrice') /** корзина цена */

/**
* URL json
*/
const URL_GIT = 'https://raw.githubusercontent.com/efrem005/json/master/responses/jsonProduct.json'
const URL_GIT_FRU = 'https://raw.githubusercontent.com/efrem005/json/master/responses/jsonFruits.json'


/**
*Зачения по умолчанию
*/
const DEFAULT_IMG = 'https://imgholder.ru/215x230/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson'
const DEFAULT_TITLE = 'The default name shirt'
const DEFAULT_PRICE = '66'

/**
*Спинер при переходе по вкладкам
*/
const landingPage = () => {
  mainList.innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
}

/**
 * Чистка корзины
 */
const cleanerBasket = () => {
  cartList.innerHTML = `<div class="card mb-1">
  <div class="card-body">
    Корзина пуста
  </div>
</div>`
  cartPrice.innerHTML = `<div class="card">
  <div class="card-body">
    Количество 0 цена 0 $
  </div>
</div>`
}

/**
* Чистка меню header
*/
const cleanerMenu = () => menuList.innerHTML = ''