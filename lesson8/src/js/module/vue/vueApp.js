import Vue from "../../vue";

import './vueCart'
import './vueSearch'

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
        isVisibleCart: false,
        isVisibleMenu: false
    },
    methods: {
        /**
         * запрос товары
         */
        fetchGoods() {
            const result = fetch('/goodsApi')
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
        viewMenu() {
            switch (this.isVisibleMenu) {
                case(false): {
                    this.isVisibleMenu = true;
                    break;
                }
                case(true): {
                    this.isVisibleMenu = false;
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
            }).then(el => this.logApi('/log', el)).catch(err => this.logApi('/log', err))
        },
        logApi(url, {date, time, title}){
            fetch(url, { method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({date, time, title})
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