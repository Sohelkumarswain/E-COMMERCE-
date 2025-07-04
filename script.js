// Global variables
let cart = JSON.parse(localStorage.getItem("cart")) || []
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

// Sample data
const categories = [
  {
    name: "Electronics & Accessories",
    description: "Latest tech gadgets and accessories",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-euf6d3u19gVCOlRGh5KU40NXerWJnz.png",
    href: "category.html",
  },
  {
    name: "Fashion & Clothing",
    description: "Trendy fashion for every style",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5mXh0dk7ruY9Xb74xOyShRd67nBQUC.png",
    href: "category.html",
  },
  {
    name: "Home & Kitchen",
    description: "Essential items for your home",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-J57OskmKFnkiBA1LR7wpvtzXS8qPgf.png",
    href: "category.html",
  },
  {
    name: "Personal Care",
    description: "Beauty and wellness products",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AzDhhPZESy6v6Mx3ftHYIRiuTkbmZU.png",
    href: "category.html",
  },
  {
    name: "Fitness & Lifestyle",
    description: "Stay active and healthy",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-57oP7R5SU8lQf2Gotve6ch0LtfUI8T.png",
    href: "category.html",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 324,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tOZoKGIcg0Fa249me2Y2FziOGQwKJ0.png",
    badge: "Best Seller",
    brand: "TechSound",
  },
  {
    id: 2,
    name: "Smart Fitness Watch Series 5",
    price: 199.99,
    originalPrice: 249.99,
    category: "Fitness",
    rating: 4.9,
    reviews: 156,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yMSZbKFmGJS1h1lnaQQCiTHwlrNTb1.png",
    badge: "New Arrival",
    brand: "FitTech",
  },
  {
    id: 3,
    name: "Premium Coffee Maker Breville",
    price: 149.99,
    originalPrice: 179.99,
    category: "Home & Kitchen",
    rating: 4.7,
    reviews: 89,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p7tsz6Zz3nXcXWdrERV8VcuXpkik5p.png",
    badge: "Sale",
    brand: "BrewMaster",
  },
  {
    id: 4,
    name: "Professional Business Backpack",
    price: 59.99,
    originalPrice: 79.99,
    category: "Fashion",
    rating: 4.6,
    reviews: 203,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gaOMCTRhOjj7KozdzdJIu4Cs9X9uvx.png",
    badge: "Popular",
    brand: "StylePack",
  },
]

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize application
function initializeApp() {
  setupEventListeners()
  updateCartCount()
  updateWishlistCount()

  // Load page-specific content
  if (document.getElementById("categoriesGrid")) {
    loadCategories()
  }
  if (document.getElementById("featuredProductsGrid")) {
    loadFeaturedProducts()
  }
}

// Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.toggle("fa-bars")
      icon.classList.toggle("fa-times")
    })
  }

  // Search functionality
  const searchBtn = document.getElementById("searchBtn")
  const searchInput = document.getElementById("searchInput")

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", performSearch)
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }

  // Cart modal
  const cartBtn = document.getElementById("cartBtn")
  const cartModal = document.getElementById("cartModal")
  const closeCartModal = document.getElementById("closeCartModal")

  if (cartBtn && cartModal && closeCartModal) {
    cartBtn.addEventListener("click", () => {
      showCartModal()
    })

    closeCartModal.addEventListener("click", () => {
      cartModal.classList.remove("active")
    })

    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove("active")
      }
    })
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      showToast("Thank you for subscribing!", "success")
      this.reset()
    })
  }

  // Hero buttons
  const startShoppingBtn = document.getElementById("startShoppingBtn")
  const browseCategoriesBtn = document.getElementById("browseCategoriesBtn")

  if (startShoppingBtn) {
    startShoppingBtn.addEventListener("click", () => {
      scrollToSection("featured-products")
    })
  }

  if (browseCategoriesBtn) {
    browseCategoriesBtn.addEventListener("click", () => {
      scrollToSection("categories")
    })
  }

  // View all products button
  const viewAllProductsBtn = document.getElementById("viewAllProductsBtn")
  if (viewAllProductsBtn) {
    viewAllProductsBtn.addEventListener("click", () => {
      window.location.href = "category.html"
    })
  }
}

// Load categories
function loadCategories() {
  const categoriesGrid = document.getElementById("categoriesGrid")
  if (!categoriesGrid) return

  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <div class="category-card" onclick="window.location.href='${category.href}'">
            <div class="category-image">
                <img src="${category.image}" alt="${category.name}" loading="lazy">
            </div>
            <div class="category-content">
                <h3 class="category-title">${category.name}</h3>
                <p class="category-description">${category.description}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

// Load featured products
function loadFeaturedProducts() {
  const productsGrid = document.getElementById("featuredProductsGrid")
  if (!productsGrid) return

  productsGrid.innerHTML = featuredProducts
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" title="Add to wishlist">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
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
    `,
    )
    .join("")
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHTML = ""

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star star"></i>'
  }

  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt star"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star star empty"></i>'
  }

  return starsHTML
}

// Cart functionality
function addToCart(productId) {
  const product = featuredProducts.find((p) => p.id === productId)
  if (!product) return

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

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  showCartModal() // Refresh cart modal
}

function updateCartQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = newQuantity
      localStorage.setItem("cart", JSON.stringify(cart))
      showCartModal() // Refresh cart modal
    }
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

function showCartModal() {
  const cartModal = document.getElementById("cartModal")
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartModal || !cartItems || !cartTotal) return

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Your cart is empty</p>'
    cartTotal.textContent = "Total: $0.00"
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="color: #ef4444;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `,
      )
      .join("")

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.textContent = `Total: $${total.toFixed(2)}`
  }

  cartModal.classList.add("active")
}

// Wishlist functionality
function toggleWishlist(productId) {
  const product = featuredProducts.find((p) => p.id === productId)
  if (!product) return

  const existingIndex = wishlist.findIndex((item) => item.id === productId)

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1)
    showToast(`${product.name} removed from wishlist`, "info")
  } else {
    wishlist.push(product)
    showToast(`${product.name} added to wishlist!`, "success")
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  updateWishlistCount()
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlistCount")
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length
  }
}

// Search functionality
function performSearch() {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  const query = searchInput.value.trim()
  if (query) {
    showToast(`Searching for "${query}"...`, "info")
    // In a real app, this would redirect to search results
    setTimeout(() => {
      window.location.href = `category.html?search=${encodeURIComponent(query)}`
    }, 1000)
  }
}

// Utility functions
function scrollToSection(sectionClass) {
  const section = document.querySelector(`.${sectionClass}`)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #6b7280;">&times;</button>
        </div>
    `

  toastContainer.appendChild(toast)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove()
    }
  }, 3000)
}

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }
})

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img)
  })
}
