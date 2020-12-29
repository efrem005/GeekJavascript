document.getElementById('lesson1').addEventListener('click', lesson1)

function lesson1() {
  landingPage() // чистка страницы
  cleanerMenu() // чистка меню
  cleanerBasket() // чистка карзины
  
  /**
  * шаблон товара
  */
  const renderGoodsItems = ({img = DEFAULT_IMG, title = DEFAULT_TITLE, price = DEFAULT_PRICE}) => `
  <div class="col-lg-3 mb-4 col-md-4 col-sm-6">
    <div class="card">
      <img src=${img} class="card-img-top" alt=${title}>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${price}</p>
        <a href="#" class="btn btn-success">купить</a>
      </div>
    </div>
  </div>`
  
  /**
  * вывод товара на страницу
  */
  mainList.innerHTML = productObject.map(item => renderGoodsItems(item)).join('');

}



