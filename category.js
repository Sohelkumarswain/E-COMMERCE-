// Category page specific functionality
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 324,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tOZoKGIcg0Fa249me2Y2FziOGQwKJ0.png",
    badge: "Best Seller",
    brand: "TechSound",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch Series 5",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 156,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yMSZbKFmGJS1h1lnaQQCiTHwlrNTb1.png",
    badge: "New Arrival",
    brand: "FitTech",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Premium Coffee Maker Breville",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviews: 89,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p7tsz6Zz3nXcXWdrERV8VcuXpkik5p.png",
    badge: "Sale",
    brand: "Breville",
    category: "Home & Kitchen",
  },
  {
    id: 4,
    name: "Professional Business Backpack",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 203,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gaOMCTRhOjj7KozdzdJIu4Cs9X9uvx.png",
    badge: "Popular",
    brand: "StylePack",
    category: "Fashion",
  },
  {
    id: 5,
    name: "Personal Care Essentials",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 145,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AzDhhPZESy6v6Mx3ftHYIRiuTkbmZU.png",
    badge: "",
    brand: "BeautyTech",
    category: "Personal Care",
  },
  {
    id: 6,
    name: "Fashion Collection Premium",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 267,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5mXh0dk7ruY9Xb74xOyShRd67nBQUC.png",
    badge: "Top Rated",
    brand: "StyleWave",
    category: "Fashion",
  },
]

let currentView = "grid"
let currentSort = "featured"
let currentFilters = {
  priceMin: 0,
  priceMax: 500,
  brands: [],
  ratings: [],
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCategoryPage()
})

function initializeCategoryPage() {
  setupCategoryEventListeners()
  loadFilters()
  loadProducts()
  updateResultsCount()
}

function setupCategoryEventListeners() {
  // View toggle
  const gridViewBtn = document.getElementById("gridViewBtn")
  const listViewBtn = document.getElementById("listViewBtn")

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", () => setView("grid"))
    listViewBtn.addEventListener("click", () => setView("list"))
  }

  // Sort dropdown
  const sortSelect = document.getElementById("sortSelect")
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      currentSort = this.value
      loadProducts()
    })
  }

  // Price range sliders
  const priceMin = document.getElementById("priceMin")
  const priceMax = document.getElementById("priceMax")

  if (priceMin && priceMax) {
    priceMin.addEventListener("input", updatePriceRange)
    priceMax.addEventListener("input", updatePriceRange)
  }

  // Clear filters
  const clearFilters = document.getElementById("clearFilters")
  if (clearFilters) {
    clearFilters.addEventListener("click", resetFilters)
  }

  // Mobile filters
  const mobileFiltersBtn = document.getElementById("mobileFiltersBtn")
  const filtersModal = document.getElementById("filtersModal")
  const closeFiltersModal = document.getElementById("closeFiltersModal")

  if (mobileFiltersBtn && filtersModal && closeFiltersModal) {
    mobileFiltersBtn.addEventListener("click", () => {
      filtersModal.classList.add("active")
    })

    closeFiltersModal.addEventListener("click", () => {
      filtersModal.classList.remove("active")
    })
  }
}

function loadFilters() {
  loadBrandFilters()
  loadRatingFilters()
  updatePriceDisplay()
}

function loadBrandFilters() {
  const brandFilters = document.getElementById("brandFilters")
  if (!brandFilters) return

  const brands = [...new Set(products.map((p) => p.brand))]

  brandFilters.innerHTML = brands
    .map(
      (brand) => `
        <div class="filter-option">
            <input type="checkbox" id="brand-${brand}" value="${brand}" onchange="updateBrandFilter('${brand}', this.checked)">
            <label for="brand-${brand}">${brand}</label>
        </div>
    `,
    )
    .join("")
}

function loadRatingFilters() {
  const ratingFilters = document.getElementById("ratingFilters")
  if (!ratingFilters) return

  const ratings = [5, 4, 3, 2, 1]

  ratingFilters.innerHTML = ratings
    .map(
      (rating) => `
        <div class="filter-option">
            <input type="checkbox" id="rating-${rating}" value="${rating}" onchange="updateRatingFilter(${rating}, this.checked)">
            <label for="rating-${rating}">
                ${generateStars(rating)} & Up
            </label>
        </div>
    `,
    )
    .join("")
}

function updatePriceRange() {
  const priceMin = document.getElementById("priceMin")
  const priceMax = document.getElementById("priceMax")

  if (priceMin && priceMax) {
    currentFilters.priceMin = Number.parseInt(priceMin.value)
    currentFilters.priceMax = Number.parseInt(priceMax.value)

    // Ensure min doesn't exceed max
    if (currentFilters.priceMin > currentFilters.priceMax) {
      currentFilters.priceMin = currentFilters.priceMax
      priceMin.value = currentFilters.priceMin
    }

    updatePriceDisplay()
    loadProducts()
  }
}

function updatePriceDisplay() {
  const priceMinValue = document.getElementById("priceMinValue")
  const priceMaxValue = document.getElementById("priceMaxValue")

  if (priceMinValue && priceMaxValue) {
    priceMinValue.textContent = `$${currentFilters.priceMin}`
    priceMaxValue.textContent = `$${currentFilters.priceMax}`
  }
}

function updateBrandFilter(brand, checked) {
  if (checked) {
    if (!currentFilters.brands.includes(brand)) {
      currentFilters.brands.push(brand)
    }
  } else {
    currentFilters.brands = currentFilters.brands.filter((b) => b !== brand)
  }
  loadProducts()
}

function updateRatingFilter(rating, checked) {
  if (checked) {
    if (!currentFilters.ratings.includes(rating)) {
      currentFilters.ratings.push(rating)
    }
  } else {
    currentFilters.ratings = currentFilters.ratings.filter((r) => r !== rating)
  }
  loadProducts()
}

function resetFilters() {
  currentFilters = {
    priceMin: 0,
    priceMax: 500,
    brands: [],
    ratings: [],
  }

  // Reset form elements
  document.getElementById("priceMin").value = 0
  document.getElementById("priceMax").value = 500

  document.querySelectorAll('#brandFilters input[type="checkbox"]').forEach((cb) => {
    cb.checked = false
  })

  document.querySelectorAll('#ratingFilters input[type="checkbox"]').forEach((cb) => {
    cb.checked = false
  })

  updatePriceDisplay()
  loadProducts()
}

function setView(view) {
  currentView = view

  const gridBtn = document.getElementById("gridViewBtn")
  const listBtn = document.getElementById("listViewBtn")
  const container = document.getElementById("productsContainer")

  if (gridBtn && listBtn && container) {
    gridBtn.classList.toggle("active", view === "grid")
    listBtn.classList.toggle("active", view === "list")

    container.className = `products-container ${view}-view`

    // Reload products with new view
    loadProducts()
  }
}

function loadProducts() {
  const productsContainer = document.getElementById("productsContainer")
  if (!productsContainer) return

  const filteredProducts = filterProducts()
  const sortedProducts = sortProducts(filteredProducts)

  if (sortedProducts.length === 0) {
    productsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6b7280;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `
    return
  }

  productsContainer.innerHTML = sortedProducts
    .map((product) => {
      if (currentView === "list") {
        return createListProductCard(product)
      } else {
        return createGridProductCard(product)
      }
    })
    .join("")

  updateResultsCount(sortedProducts.length)
}

function filterProducts() {
  return products.filter((product) => {
    // Price filter
    if (product.price < currentFilters.priceMin || product.price > currentFilters.priceMax) {
      return false
    }

    // Brand filter
    if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(product.brand)) {
      return false
    }

    // Rating filter
    if (currentFilters.ratings.length > 0) {
      const hasMatchingRating = currentFilters.ratings.some((rating) => product.rating >= rating)
      if (!hasMatchingRating) {
        return false
      }
    }

    return true
  })
}

function sortProducts(products) {
  const sorted = [...products]

  switch (currentSort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "newest":
      return sorted.sort((a, b) => b.id - a.id)
    default:
      return sorted
  }
}

function createGridProductCard(product) {
  return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" title="Add to wishlist">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-content">
                <div class="product-category">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        <span class="original-price">$${product.originalPrice}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Add to cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `
}

function createListProductCard(product) {
  return `
        <div class="product-card list-view">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
            </div>
            <div class="product-content">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <div>
                        <div class="product-category">${product.brand}</div>
                        <h3 class="product-title">${product.name}</h3>
                    </div>
                    <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" title="Add to wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-rating" style="margin-bottom: 1rem;">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        <span class="original-price">$${product.originalPrice}</span>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `
}

function updateResultsCount(count = null) {
  const resultsCount = document.getElementById("resultsCount")
  if (resultsCount) {
    const total = count !== null ? count : products.length
    resultsCount.textContent = `Showing ${total} product${total !== 1 ? "s" : ""}`
  }
}

// Add to cart function for category page
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  showToast(`${product.name} added to cart!`, "success")
}

// Declare the missing functions
function generateStars(rating) {
  let stars = ""
  for (let i = 0; i < rating; i++) {
    stars += '<i class="fas fa-star"></i>'
  }
  return stars
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    cartCount.textContent = cart.length
  }
}

function showToast(message, type) {
  const toastContainer = document.getElementById("toastContainer")
  if (toastContainer) {
    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.textContent = message
    toastContainer.appendChild(toast)

    // Remove the toast after 3 seconds
    setTimeout(() => {
      toastContainer.removeChild(toast)
    }, 3000)
  }
}
