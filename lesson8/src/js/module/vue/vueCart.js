import Vue from "../../vue";

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