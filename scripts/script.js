// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Sample product data
  const products = [
      { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Product 3', price: 30, image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Product 4', price: 40, image: 'https://via.placeholder.com/150' }
      
  ];

  const productList = document.getElementById('productList');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderProducts() {
      products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>$${product.price}</p>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          `;
          productList.appendChild(productDiv);
      });
  }

  function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const existingProduct = cart.find(p => p.id === productId);
      if (existingProduct) {
          existingProduct.quantity += 1;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      updateCart();
      alert('Product added to cart');
  }

  window.addToCart = addToCart;

  if (productList) {
      renderProducts();
  }

  if (document.getElementById('cart')) {
      renderCart();
  }

  if (document.getElementById('checkoutForm')) {
      renderCheckout();
  }

  function renderCart() {
      const cartContainer = document.getElementById('cart');
      cartContainer.innerHTML = '';
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <h2>${item.name}</h2>
              <p>$${item.price}</p>
              <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" onchange="updateQuantity(event)"></p>
              <button onclick="removeFromCart(${item.id})">Remove</button>
          `;
          cartContainer.appendChild(cartItem);
      });

      const checkoutButton = document.getElementById('checkoutButton');
      checkoutButton.addEventListener('click', () => {
          window.location.href = 'checkout.html';
      });
  }

  window.updateQuantity = function (event) {
      const id = parseInt(event.target.getAttribute('data-id'));
      const quantity = parseInt(event.target.value);
      const product = cart.find(p => p.id === id);
      product.quantity = quantity;
      updateCart();
      renderCart();
  };

  window.removeFromCart = function (id) {
      const index = cart.findIndex(p => p.id === id);
      cart.splice(index, 1);
      updateCart();
      renderCart();
  };

  function renderCheckout() {
      const summary = document.getElementById('summary');
      let total = 0;
      cart.forEach(item => {
          total += item.price * item.quantity;
          const itemDiv = document.createElement('div');
          itemDiv.innerHTML = `
              <p>${item.name} - $${item.price} x ${item.quantity}</p>
          `;
          summary.appendChild(itemDiv);
      });
      const totalDiv = document.createElement('div');
      totalDiv.innerHTML = `<p>Total: $${total}</p>`;
      summary.appendChild(totalDiv);

      const checkoutForm = document.getElementById('checkoutForm');
      checkoutForm.addEventListener('submit', (event) => {
          event.preventDefault();
          alert('Order placed successfully!');
          localStorage.removeItem('cart');
          window.location.href = 'index.html';
      });
  }
});
