const toCurrency = price => {
	return new Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency',
	}).format(price)
}

document.querySelectorAll('.price').forEach(node => {
	node.textContent = toCurrency(node.textContent)
})

const $cart = document.getElementById('cart')
if ($cart) {
	$cart.addEventListener('click', event => {
		if (event.target.classList.contains('js-remove')) {
			const id = event.target.dataset.id

			fetch('/cart/remove/' + id, {
				method: 'delete',
			})
				.then(res => res.json())
				.then(cart => {
					if (cart.items.length) {
						const html = cart.items
							.map(c => {
								return `
              <tr>
                <td>${c.title}</td>
                <td>${c.price}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>
              `
							})
							.join('')
						$cart.querySelector('tbody').innerHTML = html
						$cart.querySelector('.price').textContent = toCurrency(cart.price)
					} else {
						$cart.innerHTML = '<p>Корзина пуста</p>'
					}
				})
		}
	})
}
