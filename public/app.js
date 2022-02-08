document.querySelectorAll('.price').forEach(tag => {
	tag.textContent = new Intl.NumberFormat('ru-Ru', {
		currency: 'rub',
		style: 'currency',
	}).format(tag.textContent)
})
