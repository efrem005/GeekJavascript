const menuList = document.getElementById('menuList') // главная страница
const mainList = document.getElementById('mainList') // меню в header
const cartList = document.getElementById('cartList') // корзина товар
const cartPrice = document.getElementById('cartPrice') // корзина цена


/*
/Картинка по умолчанию
*/
const DEFAULT_IMG = 'https://imgholder.ru/215x230/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson'
const DEFAULT_TITLE = 'The default name shirt'
const DEFAULT_PRICE = '66'

/*
/Спинер при переходе по вкладкам
*/
const landingPage = () => {
  mainList.innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
}

const cleanerBasket = () => {
  cartList.innerHTML = `<span>Карзина пуста</span><hr>`
  cartPrice.innerHTML = `<span>Количество 0 цена 0 $</span>`
}

/*
/Чистка меню header
*/
const cleanerMenu = () => menuList.innerHTML = ''

/*
/Добавление кнопок в меню header
*/
const headerMenu = ({ title, classClick }) => `
  <li class="nav-item">
    <button type="button" class="btn btn-success m-1 px-3" id=${classClick}>${title}</button>
  </li>`

/*
/ Для урока №2
*/
document.getElementById('lesson2').addEventListener('click', lesson2)
function lesson2() {
  cleanerMenu() // чистка меню
  const menuRender = menul => menul.map((el) => headerMenu(el))
  menuList.innerHTML = menuRender(menuLessonTwo).join('')
  document.getElementById('product').addEventListener('click', product)
  document.getElementById('burger').addEventListener('click', burger)
}
  
/*
/Кнопки для урока 2
*/
const menuLessonTwo = [
  { title: 'Товары', classClick: 'product' },
  { title: 'Бургер', classClick: 'burger' }
]

/*
/Объект товаров
*/
const productObject = [
  {
    "id": 1,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-2.jpg",
    "title": "Mango People T-shirt",
    "price": 32.0
  },
  {
    "id": 2,
    // "img":
    // "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-3.jpg",
    "title": "Mango People T-shirt",
    "price": 54.0
  },
  {
    "id": 3,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-4.jpg",
    "title": "Mango People T-shirt",
    "price": 64.0
  },
  {
    "id": 4,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-5.jpg",
    "title": "Mango People T-shirt",
    "price": 76.0
  },
  {
    "id": 5,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-6.jpg",
    "title": "Mango People T-shirt",
    "price": 82.0
  },
  {
    "id": 6,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-7.jpg",
    // "title": "Mango People T-shirt",
    "price": 94.0
  },
  {
    "id": 7,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-8.jpg",
    "title": "Mango People T-shirt",
    "price": 106.0
  },
  {
    "id": 8,
    "img":
    "https://raw.githubusercontent.com/efrem005/Geekbrains/Geekbrains/img/layer-9.jpg",
    "title": "Mango People T-shirt",
    "price": 118.0
  }
];