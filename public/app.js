const toCurrency = (price) =>
  new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(price);

const toDate = (date) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

document
  .querySelectorAll(".price")
  .forEach((node) => (node.textContent = toCurrency(node.textContent)));

document.querySelectorAll(".date").forEach((node) => {
  node.textContent = toDate(new Date(node.textContent));
});

const tabs = document.querySelectorAll(".tabs");

const $cart = document.getElementById("cart");
if ($cart) {
  $cart.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      const csrfToken = event.target.dataset.csrftoken;

      fetch("/cart/remove/" + id, {
        method: "delete",
        headers: {
          "X-XSRF-Token": csrfToken,
        },
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.items.length) {
            $cart.querySelector("tbody").innerHTML = cart.items
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>${c.price}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>
              `;
              })
              .join("");
            $cart.querySelector(".price").textContent = toCurrency(cart.price);
          } else {
            $cart.innerHTML = "<p>Корзина пуста</p>";
          }
        });
    }
  });
}

M.Tabs.init(tabs);
