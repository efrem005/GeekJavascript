/**
*Товары кнопка
*/
function product() {
  landingPage() /** чистка страницы **/
  cleanerBasket() /** чистка карзины **/

  class Catalog {
    constructor(goods = {}) {
      this.goods = goods
      this.totalPrice()
    }

    /**
    * шаблон удаления товара
    */
    removeItem(id) {
      this.goods.splice(id, 1) /** splice(id, 0, item4, ...items) **/
    }

    /**
    * общая цена товаров
    */
    totalPrice() {
      return this.goods.reduce((acc, el) => acc + el.price, 0)
    }

    /**
    * шаблон карточки товара
    */
    product({ id, img = DEFAULT_IMG, title = DEFAULT_TITLE, price = DEFAULT_PRICE }) {
      return `<div class="col-lg-3 mb-4 col-md-4 col-sm-6">
        <div class="card">
          <img src=${img} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${price}</p>
            <button class="btn btn-success" id=${id}>купить</button>
          </div>
        </div>
      </div>`
    }

    /**
    * рендер на страницу
    */
    render() {
      mainList.innerHTML = this.goods.map((el) => this.product(el)).join('')
      cartPrice.innerHTML = 
      `<div class="card">
        <div class="card-body">
          Количество ${this.goods.length} цена ${this.totalPrice()} $
        </div>
      </div>`
    }
  }

  /**
  * класса Catalog
  */
  const catalog = new Catalog(productObject)

  /**
  * вызов метода render
  */
  catalog.render()
}

/**
* Бургер кнопка
*/
function burger() {
  landingPage() // чистка страницы
  cleanerBasket() // чистка карзины
  mainList.innerHTML = burgerHtml()
  hamburg.render()
}

/**
* объект Hamburger
*/
const objectBurger = {
  small: {
    name: 'Маленький гамбургер',
    price: 50,
    calories: 20,
  },
  big: {
    name: 'Большой гамбургер',
    price: 100,
    calories: 40,
  },
  cheese: {
    name: 'С сыром',
    price: 10,
    calories: 20,
  },
  salad: {
    name: 'C салатом',
    price: 20,
    calories: 5,
  },
  potatoes: {
    name: 'С картофелем',
    price: 15,
    calories: 10,
  },
  seasoning: {
    name: 'посыпать приправой',
    price: 15,
    calories: 0,
  },
  mayonnaise: {
    name: 'полить майонезом',
    price: 20,
    calories: 5,
  },
}

/**
* Класс Hamburger
*/
class Hamburger {
  /**
  * this.size вся информация о гамбургеров
  * this.stuffing наименования видов начинок
  * this.price общая цена
  * this.calories калории
  */
  constructor(bur) {
    this.size = bur //
    this.stuffing = []
    this.price = 0
    this.calories = 0
  }

  /**
  * записываем какой гамбургер
  */
  sizeHambur(size) {
    if (size === 'big') this.size = { ...objectBurger[size] }
    else if (size === 'small') this.size = { ...objectBurger[size] }
    this.render()
  }

  /**
  * плюсуем цену
  */
  setPrice(i) {
    this.price += objectBurger[i].price
    this.stuffing.push(objectBurger[i].name)
  }

  /**
  * плюсуем калории
  */
  setCalories(i) {
    this.calories += objectBurger[i].calories
    this.render()
  }

  /**
  * выбор начинок
  */
  dataList(i) {
    switch (i) {
      case 'cheese': {
        this.setPrice(i)
        this.setCalories(i)
        break
      }
      case 'salad': {
        this.setPrice(i)
        this.setCalories(i)
        break
      }
      case 'potatoes': {
        this.setPrice(i)
        this.setCalories(i)
        break
      }
      case 'seasoning': {
        this.setPrice(i)
        this.setCalories(i)
        break
      }
      case 'mayonnaise': {
        this.setPrice(i)
        this.setCalories(i)
        break
      }
    }
  }

  /**
  * шаблон карзины
  */
  cartHtml() {
    return `
      <h4>${this.size['name']}</h4> 
      <h5>цена: ${this.price + this.size['price']} Руб</h5> 
      <span>калорий: ${this.calories + this.size['calories']}</span><hr>`
  }

  /**
  * шаблон начинок
  */
  cartStuffing() {
    return this.stuffing.map((el) => `<div class="pb-2">${el}</div>`)
  }

  /**
  * рендер на страницу и в консоль
  */
  render() {
    console.log(this.size['name'])
    console.log(`Цена: ${this.price + this.size['price']} Руб`)
    console.log(`Калорий: ${this.calories + this.size['calories']}`)
    cartList.innerHTML = this.cartHtml()
    if (this.stuffing != 0) cartPrice.innerHTML = this.cartStuffing().join('')
    else cartPrice.innerHTML = ''
  }
}

/**
* класса гамбургер
*/
const hamburg = new Hamburger({ name: 'Пусто', price: 0, calories: 0 })

/**
* обрабочик событий гамбургер
*/
mainList.addEventListener('click', (e) => {
  const id = e.target.id
  const name = e.target.name
  if (name == 'hamburger') hamburg.sizeHambur(id)
  else if (name == 'stuffing') hamburg.dataList(id)
})

/*
/ Класс корзины
*/
// class Basket {
  // constructor() {
    /*
      / Содержимое корзины
      */
    // this.state = []
  // }

  /*
  / Добавление товара в корзину
  */
  // addItem() {}

  /*
  /Удаление товара из корзины
  */
  // deleteItem() {}

  /*
  / Считаем стоимость и количество товаров в корзине
  */
  // totalPrice() {}

  /*
  / Вывод содержимого корзины на страницу
  */
  // render() {}
// }
