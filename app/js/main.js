import { s, all } from './modules/base.js'
import * as UI from './modules/ui.js'
import * as DOM from './modules/util-dom.js'
import * as UTIL from './modules/util-others.js'


import getPath from './modules/path.js'
import getIndexPage from './pages/index.js'
import getAccountPage from './pages/account.js'

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

getPath()

let element = document.createElement('div')
element.classList.add('header__menu')
s('body').append(element)

all('.should-hidden').forEach(e => {
	let clone = e.cloneNode(true)
	element.append(clone)
})


s('.burger').addEventListener('click', (evt) => {
	s('.header__menu').classList.toggle('header__menu--active')
	s('.burger').classList.toggle('burger--active')

})

document.addEventListener('click', (evt) => {

	if (!evt.target.closest('.header__menu--active') && !evt.target.closest('.burger')) {
		s('.header__menu').classList.remove('header__menu--active')
		s('.burger').classList.remove('burger--active')
	}
})

window.addEventListener('resize', (evt) => {
	if (window.innerWidth > 480) {
		s('.header__menu').classList.remove('header__menu--active')
		s('.burger').classList.remove('burger--active')
	}
});

window.addEventListener('scroll', (evt) => {
	if (window.scrollY > (window.innerHeight * 1.5)) {
		s('.header__menu').classList.remove('header__menu--active')
		s('.burger').classList.remove('burger--active')
	}
})

if (s('.up')) {

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

}

getIndexPage()

if (s('.filter-btn')) {

	s('.filter-btn').addEventListener('click', (evt) => {
		s('.filter').classList.toggle('filter--active')
	})
}

getAccountPage()