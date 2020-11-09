$(function () {

	//filters https://www.kunkalabs.com/mixitup/

	var mixer = mixitup('.menu__inner');

	//header dark
	var header = document.querySelector('.header');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 500) {
			header.classList.add('header--dark');
		} else {
			header.classList.remove('header--dark');
		}
	});

	//scroll to item
	var body = document.querySelector('body');

	var closesAttr = function (item, attr) {
		var node = item;
		while (node) {
			var attrValue = node.getAttribute(attr);
			if (attrValue) {
				return attrValue;
			}
			node = node.parentElement;
		}
		return null;
	};

	var scroll = function (target) {
		var targetTop = target.getBoundingClientRect().top;
		var scrollTop = window.pageYOffset;
		var targetOffsetTop = targetTop + scrollTop;
		var headerOffset = document.querySelector('.header').clientHeight;

		window.scrollTo(0, targetOffsetTop - headerOffset);
	};

	body.addEventListener('click', function (e) {
		var target = e.target;
		var scrollToItemClass = closesAttr(target, 'data-scroll-to');

		if (scrollToItemClass === null) {
			return;
		}

		e.preventDefault();
		var scrollToItem = document.querySelector('.' + scrollToItemClass);

		if (scrollToItem) {
			scroll(scrollToItem);
		}
	});


	//modals

	var closestItemByClass = function (item, className) {
		var node = item;

		while (node) {
			if (node.classList.contains(className)) {
				return node;
			}
			node = node.parentElement;
		}
		return null;
	};


	//menu opens by span

	var showModal = function (target) {
		target.classList.add('modal--active');
	};

	var closeModal = function (target) {
		target.classList.remove('modal--active');
	};

	//body no scrolling
	var toggleScroll = function () {
		body.classList.toggle('no-scroll');
	};

	body.addEventListener('click', function (e) {
		var target = e.target;
		var modalClass = closesAttr(target, 'data-modal');

		if (modalClass === null) {
			return;
		}

		e.preventDefault();
		var modal = document.querySelector('.' + modalClass);

		if (modal) {
			showModal(modal);
			toggleScroll();
		}
	});

	//close modal
	body.addEventListener('click', function (e) {

		var target = e.target;
		if (target.classList.contains('modal-close') ||
			target.classList.contains('modal__inner')) {
			var modal = closestItemByClass(target, 'modal');

			closeModal(modal);
			toggleScroll();
		}
	});

	//change product size and price
	var menuInner = document.querySelector('.menu__inner');

	if (menuInner === null) {
		return;
	}

	var updateProductPrice = function (product, price){
		var productPrice = product.querySelector('.product__price-value');
		productPrice.textContent = price;
	};

	var changeProductSize = function (target) {
		var product = closestItemByClass(target, 'product');
		var previousBtnActive = product.querySelector('.product__size.product__size--active');
		var newPrice = target.getAttribute('data-product-size');

		previousBtnActive.classList.remove('product__size--active');
		target.classList.add('product__size--active');
		updateProductPrice(product, newPrice);
	};

	menuInner.addEventListener('click', function (e) {
		var target = e.target;

		if (target.classList.contains('product__size')) {
			e.preventDefault();
			changeProductSize(target);
		}
	});

	//yandex map https://yandex.ru/dev/maps/jsbox/?turbo=true
	ymaps.ready(function () {
		var myMap = new ymaps.Map('ymap', {
				center: [55.937185, 37.497342],
				zoom: 16
			}, {
				searchControlProvider: 'yandex#search'
			}),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				balloonContent: 'г. Долгопрудный, Новый бульвар, 21'
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'images/pizza-slice.svg',
				iconImageSize: [40, 63],
				iconImageOffset: [-19, -38]
			}),

			myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
				iconContent: '12'
			});

		myMap.geoObjects
			.add(myPlacemark);
	});
});