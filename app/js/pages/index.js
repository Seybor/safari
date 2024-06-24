import { s, all } from '../modules/base.js'

const getIndexPage = () => {
	const renderStart = () => {

		const content = document.querySelector('.shop-items')

		async function getProducts() {

			const response = await fetch('/js/data/goods.json');

			console.log(response)

			const productsArray = await response.json();

			console.log(productsArray)

			renderProducts(productsArray);
		}

		getProducts();

		function renderProducts(productsArray) {
			productsArray.forEach(function (item) {
				const productHTML = `<div class="shop-item card" data-goods-id="${item.id}">
	
							<div class="shop-item__wrap card-wrap">
								<img class="shop-item__img card__img" src="img/goods/${item.img}" alt="${item.img}" loading="lazy" width="300"
									height="450">
	
								<div class="card-wrap__icons">
									<div class="card-wrap__like">
										<img src="img/icon/like-goods.svg" alt="like">
									</div>
									<div class="card-wrap__cart">
										Add to cart
										<img src="img/icon/cart-goods.svg" alt="cart">
									</div>
								</div>
	
							</div>
	
							<div class="shop-item__body card__body">
								<div class="shop-item__title card__title">
									${item.title}
								</div>
								<div class="shop-item__price card__price">
									₦ <span>${item.price}</span>
								</div>
							</div>
						</div>`;
				content.insertAdjacentHTML('beforeend', productHTML);
			});
		}
	}
	if (s('.shop-items')) {
		renderStart()
	}
	// * plugins

	if (s('.top-slider')) {
		ItcSlider.getOrCreateInstance('.itc-slider', {
			loop: true,
			swipe: true
		});
	}


}

export default getIndexPage
