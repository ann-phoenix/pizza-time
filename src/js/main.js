$(function () {

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

	var closesItemByClass = function (item, className) {
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
			var modal = closesItemByClass(target, 'modal');

			closeModal(modal);
			toggleScroll();
		}
	});

});