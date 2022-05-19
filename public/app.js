const toCurrency = price =>
	new Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency',
	}).format(price)

const toDate = date =>
	new Intl.DateTimeFormat('en-EN', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(date)

document.querySelectorAll('.price').forEach(node => (node.textContent = toCurrency(node.textContent)))

document.querySelectorAll('.date').forEach(node => {
	console.log(node.textContent)
	node.textContent = toDate(node.textContent)
})

const tabs = document.querySelectorAll('.tabs')

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

M.Tabs.init(tabs)
