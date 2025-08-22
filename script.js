
    let cart = [];
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const confirmOrderBtn = document.getElementById("confirm-order");
    const addressForm = document.getElementById("address-form");
    const placeOrderBtn = document.getElementById("place-order");
    const addressInput = document.getElementById("address-input");
    const orderSuccess = document.getElementById("order-success");

    // Sidebar toggle
    document.getElementById("cart-toggle").addEventListener("click", () => {
      cartSidebar.classList.add("open");
    });
    document.getElementById("close-cart").addEventListener("click", () => {
      cartSidebar.classList.remove("open");
    });

    // Render cart
    function renderCart() {
      cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <span>${item.name} - ₹${item.price}</span>
          <div class="qty-controls">
            <button class="qty-btn decrease" data-index="${index}">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn increase" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">❌</button>
        </div>
      `).join("");

      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      cartTotal.innerHTML = `<strong>Total:</strong> ₹${total}`;
      cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

      // Attach controls
      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          renderCart();
        });
      });
      document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", e => {
          const index = e.target.dataset.index;
          cart[index].qty++;
          renderCart();
        });
      });
      document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", e => {
          const index = e.target.dataset.index;
          if(cart[index].qty > 1) cart[index].qty--;
          renderCart();
        });
      });
    }

    // Add to cart
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", e => {
        const product = e.target.closest(".popular-card");
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        const existing = cart.find(item => item.name === name);
        if(existing) {
          existing.qty++;
        } else {
          cart.push({ name, price, qty: 1 });
        }
        renderCart();
        cartSidebar.classList.add("open");
      });
    });

    // Confirm order
    confirmOrderBtn.addEventListener("click", () => {
      if(cart.length === 0) return;
      confirmOrderBtn.style.display = "none";
      addressForm.classList.remove("hidden");
    });

    // Place order
    placeOrderBtn.addEventListener("click", () => {
      if(addressInput.value.trim() === "") {
        alert("Please enter your address.");
        return;
      }
      cart = [];
      renderCart();
      addressForm.classList.add("hidden");
      orderSuccess.classList.remove("hidden");

      setTimeout(() => {
        orderSuccess.classList.add("hidden");
        confirmOrderBtn.style.display = "block";
        cartSidebar.classList.remove("open");
        addressInput.value = "";
      }, 2500);
    });
  