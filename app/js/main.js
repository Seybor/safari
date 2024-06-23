import { s, all } from './modules/base.js'
import * as UI from './modules/ui.js'
import * as DOM from './modules/util-dom.js'
import * as UTIL from './modules/util-others.js'

import renderStart from './modules/renderGoods.js'

// $('body').hide()

// UI.changeTheme()
// UI.burger()
// UI.accordionStart()
// UI.tabStart()

// DOM.eraseInput()
// DOM.removeAddClass()
// DOM.wrapper()

// UTIL.generateRandomNumbers()
// UTIL.getRandomNumber()
// UTIL.shuffleArr()

let element = document.createElement('div')
element.classList.add('header__menu')

renderStart()

all('.should-hidden').forEach(e => {
	let clone = e.cloneNode(true)
	element.append(clone)
})

s('body').append(element)

window.addEventListener('resize', (evt) => {
	if (window.innerWidth > 480) {
		s('.header__menu').classList.remove('header__menu--active')
		s('.burger').classList.remove('burger--active')
	}

});

(function () {
	s('.burger').addEventListener('click', (evt) => {
		s('.header__menu').classList.toggle('header__menu--active')
		s('.burger').classList.toggle('burger--active')
	})
})()



window.addEventListener('scroll', (evt) => {
	if (window.scrollY > 1200) {
		s('.up').classList.add('up--active')
	} else {
		s('.up').classList.remove('up--active')
	}
})

s('.up').addEventListener('click', (evt) => {
	window.scrollTo(0, 0)
})

// ! plugins
ItcSlider.getOrCreateInstance('.itc-slider', {
	loop: true,
	swipe: true
});
