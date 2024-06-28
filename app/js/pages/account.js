import { s, all } from '../modules/base.js'

const getAccountPage = () => {

	if (s('.account')) {
		all('.account-dashboard__item').forEach(e => {
			e.addEventListener('click', (evt) => {
				evt.preventDefault()

				if (e.classList.contains('account-dashboard__item--active')) {
					return
				} else {
					s('.account-dashboard__item--active').classList.remove('account-dashboard__item--active')
					e.classList.add('account-dashboard__item--active')
				}

			})
		})

		s('.info-form__wrap-link').addEventListener('click', (evt) => {
			evt.preventDefault()
			s('.info-form__right').classList.toggle('info-form__right--active')
		})
	}




}

export default getAccountPage