import { s, all } from './base.js'

const getPath = () => {
	const currentPage = window.location.pathname.split('/').pop()

	if (currentPage.length === 0) {
		s(`.nav__link[href="index.html"]`).closest('.nav__item').classList.add('nav__item--active')
	} else if (s(`.nav__link[href="${currentPage}"]`)) {
		s(`.nav__link[href="${currentPage}"]`).closest('.nav__item').classList.add('nav__item--active')
	} else {
		console.log(currentPage + ' - ' + 'не найдено')

		if (currentPage === 'registration.html') {
			s('.nav__icon[href="registration.html"]').classList.add('nav__icon--active')
		}

		if (currentPage === 'cart.html') {
			s('.nav__icon[href="cart.html"]').classList.add('nav__icon--active')
		}

	}
}

export default getPath