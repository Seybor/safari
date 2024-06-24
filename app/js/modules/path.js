import { s, all } from './base.js'

const getPath = () => {
	const currentPage = window.location.pathname.split('/').pop()

	all('.nav__item').forEach(e => {
		e.classList.remove('nav__item--active')
	})

	if (s(`.nav__link[href="${currentPage}"]`)) {
		s(`.nav__link[href="${currentPage}"]`).closest('.nav__item').classList.add('nav__item--active')
	} else {
		console.log(currentPage + ' - ' + 'не найдено')
	}
}

export default getPath