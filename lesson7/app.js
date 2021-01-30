/**
 * рендер корзины с товароми
 */
cartList.innerHTML = `
      <div class="card" v-if="cartItems.length > 0">
          <app-cartlist v-for="item in cartItems" :cartitems="item" @deleteitem="deleteItem" @buyproduct="buyProduct"></app-cartlist>
      </div>
      <div class="card" v-else>
        <div class="card-body">
          Корзина пуста
        </div>
      </div>`
/**
 * рендер корзины прайс
 */
cartPrice.innerHTML = `<app-cartprice :lengthitem="cartItems.length" :price="renderPrice()"></app-cartprice>`
/**
 * рендер стоки поиска и кнопки
 */
menuList.innerHTML = `<app-search v-model="searchLine" :search="search"></app-search>`
/**
 * рендер страницы
 */
mainList.innerHTML = `
    <div class="shadow-sm p-3 mb-5 bg-white rounded text-center" v-if="filteredGoods.length === 0">
        нечего не найдено
    </div>
    <div class="col-lg-3 mb-4 col-md-4 col-sm-6 col-8" v-else v-for="{id, img, title, price, count} in filteredGoods">
        <div class="card">
            <img :src="img" class="card-img-top" :alt="title" width="259px" height="240px">
            <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">{{price}}</p>
                <button class="btn btn-success" @click="buyProduct({id, img, title, price, count})">купить</button>
            </div>
        </div>
    </div>`

/**
 * VUE Component Корзина
 */
Vue.component('app-cartlist', {
    template: `
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="cart text-success">{{ cartitems.title }}</div>
      <div class="cart text-secondary">{{ cartitems.count }} X</div>
      <div class="cart text-secondary">{{ cartitems.price }} Руб</div>
      <button class="btn btn-success" @click="plusItem(cartitems)">+</button>
      <button class="btn btn-success" @click="deleteItem(cartitems)">-</button>
    </div>    
    `,
    props: {
        cartitems: {
            type: Object
        }
    },
    methods: {
        /**
         * Увеличить количество
         */
        plusItem(item) {
            item.count++
            this.cartApi(`/cart/${item.id}`, 'PUT', {'par': '++'})
        },
        /**
         * Уменьшить или передать родителю (удалить товар с корзины)
         */
        deleteItem(item) {
            if (item.count === 1) this.$emit('deleteitem', item)
            else {
                item.count--
                this.cartApi(`/cart/${item.id}`, 'PUT', {'par': '--'})
            }
        },
        cartApi(url, method, data = []){
            fetch(url, { method: method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(el => {
                return el.json()
            }).then(el => this.logApi('/log', el.title)).catch(err => this.logApi('/log', err))
        },
        logApi(url, status){
            fetch(url, { method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({status})
            }).catch(err => console.log(err))
        }
    }
})

/**
 * VUE Component Корзина прайс
 */
Vue.component('app-cartprice', {
    template: `
    <div class="card">
      <div class="card-body">
        Количество {{lengthitem}} цена {{ price }} Руб
      </div>
    </div>
    `,
    props: {
        lengthitem: Number,
        price: Number
    }
})
/**
 * VUE Component header menu
 */
Vue.component('app-search', {
    template: `
    <div class="d-flex">
      <input class="form-control me-2 search m-1 m-sm-0" placeholder="поиск товаров" v-model="searchLine" @input="$emit('input',searchLine)" v-on:keyup.enter="search">
      <button class="btn btn-outline-success back mx-sm-2 m-1" @click="search">поиск</button>
    </div>
    `,

    props: {
        search: Function,
        value: String
    },
    data() {
        return {
            searchLine: this.value
        }
    },
    watch: {
        value(newValue) {
            this.searchLine = newValue
        }
    }
})

/**
 * VUE.JS
 */
new Vue({
    el: '#app',
    data: {
        goods: [], /** массив товаров */
        filteredGoods: [], /** массив для поиска товаров и вывод на страницу */
        cartItems: [], /** массив товаров для корзины */
        searchLine: '', /** строка поиска */
        isVisibleCart: false
    },
    methods: {
        /**
         * запрос товары
         */
        fetchGoods() {
            const result = fetch('/goods')
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
         * запрос корзины
         */
        fetchCart() {
            const result = fetch('/cart')
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
         *
         */
        viewCart() {
            switch (this.isVisibleCart) {
                case(false): {
                    this.isVisibleCart = true;
                    break;
                }
                case(true): {
                    this.isVisibleCart = false;
                    break;
                }
            }
        },
        /**
         * Цена всех товаров в корзине
         */
        renderPrice() {
            return this.cartItems.reduce((acc, el) => acc + el.count * el.price, 0)
        },
        /**
         * удалить товар с корзины
         */
        deleteItem(item) {
            this.cartItems.splice(this.cartItems.findIndex((el) => el.id === item.id), 1)
            this.cartApi(`/cart/${item.id}`, 'delete')
        },
        /**
         * поиск
         */
        search() {
            const regExp = new RegExp(this.searchLine, 'i')
            this.filteredGoods = this.goods.filter(({title}) => regExp.test(title))
        },
        /**
         * Добавление товара в корзину
         */
        buyProduct(item) {
            const searchItem = this.cartItems.find((el) => {
                return el.id === item.id
            })
            if (searchItem) {
                searchItem.count++
                this.cartApi(`/cart/${item.id}`, 'PUT', { 'par': '++', 'name': item.title })
            }
            else {
                this.cartItems.push(item)
                this.cartApi('/cart', 'POST', item)
            }
        },
        cartApi(url, method, data = []){
            fetch(url, { method: method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(el => {
                return el.json()
            }).then(el => this.logApi('/log', el.title)).catch(err => this.logApi('/log', err))
        },
        logApi(url, status){
            fetch(url, { method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({status})
            }).catch(err => console.log(err))
        }
    },
    /**
     * запись данных в переменные
     */
    mounted() {
        /**
         * запрос каталога
         */
        this.fetchGoods()
            .then((goods) => {
                this.goods = goods
                this.filteredGoods = goods
            }),
        /**
         * запрос корзины
         */
        this.fetchCart()
            .then((cart) => {
                this.cartItems = cart
            })
    }
})