// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
// 3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.

/**
 * @Кнопка функция вызова страницы "Урока №3"
 */
function lesson3() {
  landingPage() /** чистка страницы */
  cleanerMenu() /** чистка меню */
  cleanerBasket() /** чистка карзины */

  /**
   * @List Класс абстрактные методы для Catalog и Cart
   */
  class List {
    constructor() {
      this.goods = [];
    }

    /**
     *@addItem метод добавления товара
     **/
    addItem(item) {
      const searchGoods = this.goods.find((el) => {
        return el.id === item.id
      })
      if (searchGoods) {
        searchGoods.count++
      } else {
        this.goods.push(item)
      }
      this.render()
      console.log(this.goods)
    }

    /**
     *@removeItem метод удаления товара
     */
    removeItem(id) {
      this.goods = this.goods.filter(el => el.id !== id)
      this.render()
    }

    /**
     *@countItem метод изменения количества товара
     */
    countItem(id, key) {
      let indexItem = this.goods.findIndex(el => el.id === id)
      if (key === 'plus')
        this.goods[indexItem].count++
      else if (key === 'minus')
        if (this.goods[indexItem].count >= 1)
          this.goods[indexItem].count--
      if (this.goods[indexItem].count < 1)
        this.removeItem(id)

      this.render()
    }

    /**
     *@render отправка
     */
    render() {
      this.goods.forEach((el) => {
        el.render()
      });
    }

  }

  /**
   * @Catalog Католог товавор
   */
  class Catalog extends List {

    /**
     * @goods массив товара
     */
    constructor(cartItems = null) {
      super()
      this._cartItems = cartItems
      this.fetchGoods()
          .then(() => {
            this.render()
          })
    }

    /**
     * @returns Fetch запрос массив товаров
     */
    fetchGoods() {
      const result = fetch(URL_GIT, {
        method: 'GET'
      })
      return result
          .then(res => {
            return res.json()
          })
          .then(res => {
            mainList.innerHTML = ''
            this.goods = res.map(item => {
              return new CatalogItem(item, this._cartItems)
            });
          })
          .catch(err => console.log(err));
    }

    /**
     * @render отправка на сборку html разметки
     */
    render() {
      mainList.innerHTML = ''
      this.goods.forEach(el => {
        el.renderHtml(mainList)
      })
    }
  }


  /**
   * @Cart Корзина
   */
  class Cart extends List {
    constructor() {
      super()
      this.renderPrice()
    }

    /**
     / @totalPrice общая цена товаров
     */
    totalPrice() {
      return this.goods.reduce((acc, el) => acc + (el.price * el.count), 0)
    }

    /**
     * @renderPrice вывод на страницу колечесва и цены (общая)
     */
    renderPrice() {
      cartPrice.innerHTML = `
        <div class="card">
          <div class="card-body">
            Количество ${this.goods.length} цена ${this.totalPrice()} $
          </div>
        </div>`
    }

    /**
     * @render отправка на товара на рендер корзины
     */
    render() {
      this.renderPrice()
      cartList.innerHTML = ''
      if (this.goods.length) {
        this.goods.forEach(good => {
          good.renderHtml(cartList)
        })
      } else {
        cartList.innerHTML = 'Нет товаров в корзине!'
      }
    }
  }

  /**
   * @CatalogItem
   */
  class CatalogItem {
    /**
     *
     * @this.id
     * @this.img
     * @this.title
     * @this.price
     * @this._cardValues
     */
    constructor({id, img, title, price, count = 1}, cartItems = null) {
      this.id = id
      this.img = img
      this.title = title
      this.price = price
      this.count = count
      this._cardValues = cartItems
    }

    /**
     * @renderHtml шаблон HTML карточки товара
     */
    renderHtml(renderDiv) {
      const block = document.createElement('div')
      block.classList.add('col-lg-3', 'mb-4', 'col-md-4', 'col-sm-6')
      block.innerHTML = `
        <div class="card">
          <img src=${this.img} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.price}</p>
            <button class="btn btn-success"><i class="fas fa-cart-arrow-down"></i> купить</button>
          </div>
        </div>`

      block.querySelector('.btn').addEventListener('click', () => {
        this._cardValues.addItem(new CardItem(this))
      })

      renderDiv.appendChild(block)

    }
  }

  /**
   * @CardItem
   */
  class CardItem extends CatalogItem {
    constructor(state) {
      super(state)
    }

    /**
     * @renderHtml шаблон HTML корзины
     */
    renderHtml(renderDiv) {
      const block = document.createElement('div')
      block.classList.add('card', 'mb-1')
      block.innerHTML = `<div class="card-body">
        <span>${this.title}: $ ${this.price} x ${this.count}</span>
        <button class="btn btn-success plus"><i class="fas fa-plus"></i></button>
        <button class="btn btn-success minus mx-2"><i class="fas fa-minus"></i></button>
      </div>`

      block.querySelector('.plus').addEventListener('click', () => {
        cartItems.countItem(this.id, 'plus')
        console.log(this.id)
      })

      block.querySelector('.minus').addEventListener('click', () => {
        cartItems.countItem(this.id, 'minus')
        console.log(this.id)
      })

      renderDiv.appendChild(block)
    }

  }
  const cartItems = new Cart()
  new Catalog(cartItems)
}