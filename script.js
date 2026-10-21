
(() => {
  const products = [
    {
      id: 1,
      name: "DDR4 8GB RAM",
      category: "Components",
      price: 850,
      image: "image/ram.jpg",
      desc: "Memory upgrade for everyday computing",
      tag: "Popular"
    },
    {
      id: 2,
      name: "256GB SATA SSD",
      category: "Storage",
      price: 1150,
      image: "image/ssd.jpg",
      desc: "Faster boot and app loading times",
      tag: "Upgrade"
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      category: "Accessories",
      price: 1450,
      image: "image/mechanical.jpg",
      desc: "Comfortable typing with tactile keys",
      tag: "Accessory"
    },
    {
      id: 4,
      name: "Gaming Mouse",
      category: "Accessories",
      price: 550,
      image: "image/mouse.jpg",
      desc: "Adjustable DPI for precise control",
      tag: "Best Value"
    },
    {
      id: 5,
      name: "500W Power Supply",
      category: "Components",
      price: 1850,
      image: "image/powersupply.jpg",
      desc: "Power for compatible desktop builds",
      tag: "Essential"
    },
    {
      id: 6,
      name: "1TB HDD",
      category: "Storage",
      price: 1650,
      image: "image/hdd.jpg",
      desc: "Extra space for files and backups",
      tag: "Storage"
    },
    {
      id: 7,
      name: "24-inch Monitor",
      category: "Displays",
      price: 4590,
      image: "image/monitor.jpg",
      desc: "Clear workspace for study and work",
      tag: "Display"
    },
    {
      id: 8,
      name: "USB Wi-Fi Adapter",
      category: "Accessories",
      price: 390,
      image: "image/adapter.jpg",
      desc: "Wireless connectivity for compatible PCs",
      tag: "Compact"
    }
  ];

  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const productCount = document.getElementById("productCount");

  const formatPrice = price =>
    "₱" + price.toLocaleString("en-PH");

  function displayProducts() {
    if (!grid) {
      console.error('Missing HTML element: productGrid');
      return;
    }

    const searchText = (
      searchInput ? searchInput.value : ""
    ).toLowerCase().trim();

    const category = categoryFilter
      ? categoryFilter.value
      : "All";

    const filteredProducts = products.filter(product => {
      const searchableText =
        `${product.name} ${product.desc} ${product.category}`
          .toLowerCase();

      const matchesSearch = searchableText.includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
      grid.innerHTML = `
        <p class="sub">
          No computer parts found. Try another search.
        </p>
      `;
    } else {
      grid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">

          <div class="product-image">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
              onerror="this.alt='Image not found'; this.classList.add('image-error');"
            >
          </div>

          <div class="product-info">
            <span class="product-tag">${product.tag}</span>

            <h3>${product.name}</h3>

            <p>${product.desc}</p>

            <div class="product-bottom">
              <strong>${formatPrice(product.price)}</strong>

              <button
                class="btn add-button"
                type="button"
                data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>

          </div>
        </article>
      `).join("");
    }

    if (productCount) {
      productCount.textContent =
        `${filteredProducts.length} products found`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", displayProducts);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", displayProducts);
  }

  displayProducts();
})();
