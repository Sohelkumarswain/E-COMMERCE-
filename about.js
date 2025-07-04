// About page specific functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeAboutPage()
})

function initializeAboutPage() {
  animateStats()
  setupScrollAnimations()
}

function animateStats() {
  const statCards = document.querySelectorAll(".stat-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target
          const targetCount = Number.parseInt(card.dataset.count)
          const numberElement = card.querySelector(".stat-number")

          animateNumber(numberElement, targetCount)
          observer.unobserve(card)
        }
      })
    },
    { threshold: 0.5 },
  )

  statCards.forEach((card) => observer.observe(card))
}

function animateNumber(element, target) {
  const duration = 2000 // 2 seconds
  const start = 0
  const startTime = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(start + (target - start) * easeOutQuart)

    if (target === 4.8) {
      element.textContent = (current / 10).toFixed(1)
    } else if (target >= 1000) {
      element.textContent = (current / 1000).toFixed(0) + "K+"
    } else {
      element.textContent = current + "+"
    }

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(".value-card, .mission-text, .mission-image")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}
