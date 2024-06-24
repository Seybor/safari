import { s, all } from '../modules/base.js'

const getClothesPage = () => {
	if (s('.clothes')) {

		s('.filter-btn').addEventListener('click', (evt) => {
			s('.filter').classList.toggle('filter--active')
		})
	}

}

export default getClothesPage