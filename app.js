const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
const state = {
  category: "Gelato",
  cart: JSON.parse(localStorage.getItem("sucreWhiskCart") || "{}")
};

const byId = id => document.getElementById(id);
const money = value => `$${Number(value).toFixed(2)}`;

function saveCart() {
  localStorage.setItem("sucreWhiskCart", JSON.stringify(state.cart));
}

function totalQty() {
  return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}

function subtotal() {
  return Object.entries(state.cart).reduce((sum, [id, qty]) => {
    const product = products.find(item => item.id === Number(id));
    return sum + (product && product.available !== false ? product.price * qty : 0);
  }, 0);
}

function renderTabs() {
  const categories = [...new Set(products.map(product => product.category))];
  byId("categoryTabs").innerHTML = categories.map(category => `
    <button class="tab ${state.category === category ? "active" : ""}" onclick="setCategory('${category}')">
      ${category}
    </button>
  `).join("");
}

window.setCategory = category => {
  state.category = category;
  renderTabs();
  renderProducts();
};

function productVisual(product, cart = false) {
  if (product.image) {
    return `<img class="${cart ? "cart-product-image" : "product-image"}" src="${product.image}" alt="${product.name}" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback');this.parentElement.insertAdjacentHTML('beforeend','<span>${product.emoji || '♡'}</span>')">`;
  }
  return `<span>${product.emoji || "♡"}</span>`;
}

function renderProducts() {
  const visible = products.filter(product => product.category === state.category);
  byId("productGrid").innerHTML = visible.map(product => {
    const soldOut = product.available === false;
    return `
      <article class="product-card ${soldOut ? "sold-out" : ""}">
        <div class="product-art">
          ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
          ${soldOut ? '<span class="sold-out-badge">Sold out</span>' : ''}
          ${productVisual(product)}
        </div>
        <div class="product-copy">
          <p class="product-category">${product.category}</p>
          <h4>${product.name}</h4>
          <p>${product.description || ""}</p>
        </div>
        <div class="product-footer">
          <span class="price">${money(product.price)}</span>
          <button class="add-button" ${soldOut ? "disabled" : `onclick="addToCart(${product.id})"`}>
            ${soldOut ? "Unavailable" : "+ Add"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

window.addToCart = id => {
  const product = products.find(item => item.id === id);
  if (!product || product.available === false) return;
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveCart();
  updateCartCount();
};

function updateCartCount() {
  byId("cartCount").textContent = totalQty();
}

function showView(id) {
  ["shopView", "cartView", "successView"].forEach(view => byId(view).classList.add("hidden"));
  byId(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCart() {
  const entries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
  if (!entries.length) {
    byId("cartItems").innerHTML = '<div class="empty">Your cart is empty. Add a little sweetness first ♡</div>';
  } else {
    byId("cartItems").innerHTML = entries.map(([id, qty]) => {
      const product = products.find(item => item.id === Number(id));
      if (!product) return "";
      return `
        <div class="cart-item">
          <div class="cart-thumb">${productVisual(product, true)}</div>
          <div>
            <strong>${product.name}</strong>
            <div class="price">${money(product.price)}</div>
            <div class="qty">
              <button onclick="changeQty(${product.id},-1)">−</button>
              <span>${qty}</span>
              <button onclick="changeQty(${product.id},1)">+</button>
              <button class="remove-button" onclick="removeItem(${product.id})">Remove</button>
            </div>
          </div>
          <strong>${money(product.price * qty)}</strong>
        </div>
      `;
    }).join("");
  }
  renderTotals();
}

window.changeQty = (id, delta) => {
  state.cart[id] = Math.max(0, (state.cart[id] || 0) + delta);
  if (state.cart[id] === 0) delete state.cart[id];
  saveCart();
  updateCartCount();
  renderCart();
};

window.removeItem = id => {
  delete state.cart[id];
  saveCart();
  updateCartCount();
  renderCart();
};

function renderTotals() {
  const sub = subtotal();
  const gst = sub * 0.09;
  const total = sub + gst;
  byId("subtotal").textContent = money(sub);
  byId("gst").textContent = money(gst);
  byId("grandTotal").textContent = money(total);
}

byId("cartButton").addEventListener("click", () => {
  renderCart();
  showView("cartView");
});

byId("backButton").addEventListener("click", () => showView("shopView"));

byId("payButton").addEventListener("click", () => {
  if (totalQty() === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = byId("customerName").value.trim();
  const phone = byId("customerPhone").value.trim();
  if (!name || !phone) {
    alert("Please enter your name and mobile number.");
    return;
  }

  const sub = subtotal();
  const gst = sub * 0.09;
  const total = sub + gst;
  const date = byId("pickupDate").value;
  const time = byId("pickupTime").value;
  const orderNo = `SW${Date.now().toString().slice(-8)}`;

  byId("orderSummary").innerHTML = `
    <div><span>Order</span><strong>${orderNo}</strong></div>
    <div><span>Name</span><strong>${name}</strong></div>
    <div><span>Pickup</span><strong>${date} · ${time}</strong></div>
    <div><span>Total</span><strong>${money(total)}</strong></div>
  `;

  state.cart = {};
  saveCart();
  updateCartCount();
  showView("successView");
});

byId("newOrderButton").addEventListener("click", () => showView("shopView"));

if (products.length) {
  if (!products.some(product => product.category === state.category)) {
    state.category = products[0].category;
  }
  renderTabs();
  renderProducts();
}
updateCartCount();