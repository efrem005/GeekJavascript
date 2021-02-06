/**
 * рендер корзины с товароми
 */
cartList.innerHTML = `
      <div class="card" v-if="cartItems.length > 0">
          <app-cartlist v-for="(item, id) in cartItems" :cartitems="item" @deleteitem="deleteItem" @buyproduct="buyProduct" :key="id"></app-cartlist>
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