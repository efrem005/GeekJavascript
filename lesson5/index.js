// 1. Добавить методы и обработчики событий для поля поиска.
//     Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода.
//     На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods.
// 2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле isVisibleCart,
//     управляющее видимостью корзины.
// 3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.

/**
 * Урок №5
 */
function lesson5() {
  cleanerBasket() /** чистка корзины */

  /**
   * рендер input и кнопки
   */
  menuList.innerHTML = `
    <div class="d-flex">
      <input class="form-control me-2 search m-1 m-sm-0" placeholder="поиск товаров" v-model="searchLine" v-on:keyup.enter="search">
      <button class="btn btn-outline-success back mx-sm-2 m-1" @click="search">поиск</button>
    </div> 
  `

  /**
   * рендер страницы
   */
  mainList.innerHTML = `
    <div class="shadow-sm p-3 mb-5 bg-white rounded text-center" v-if="filteredGoods.length === 0">
        нечего не найдено
    </div>
    <div class="col-lg-3 mb-4 col-md-4 col-sm-6 col-8" v-else v-for="{img, title, price} in filteredGoods">
        <div class="card">
            <img :src="img" class="card-img-top" :alt="title" width="259px" height="240px">
            <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">{{price}}</p>
                <button class="btn btn-success">купить</button>
            </div>
        </div>
    </div>`

  /**
   * VUE.JS
   */
  new Vue({
    el: '#app',
    data: {
      goods: [],
      filteredGoods: [],
      searchLine: ''
    },
    methods: {
      /**
       * запрос товары
       */
      fetchGoods() {
        console.log('methods')
        const result = fetch(URL_GIT_FRU, {
          method: 'GET'
        })
        return result
            .then(res => {
              return res.json()
            })
            .then(res => {
              return res
            })
            .catch(err => console.log(err));
      },

      /**
       * поиск
       */
      search() {
        const regExp = new RegExp(this.searchLine, 'i')
        this.filteredGoods = this.goods.filter(({title}) => regExp.test(title))
        console.log(this.filteredGoods.length)
      }
    },
    /**
     * запись данных в переменные
     */
    mounted() {
      this.fetchGoods()
          .then((goods) => {
            this.goods = goods
            this.filteredGoods = goods
          })
    }
  });
}