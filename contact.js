// Contact page specific functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeContactPage()
})

function initializeContactPage() {
  setupContactForm()
  setupFAQ()
}

function setupContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Validate form
    if (!validateContactForm(data)) {
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Message sent successfully! We'll get back to you within 24 hours.") // showToast function is undeclared, using alert as a temporary solution
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

function validateContactForm(data) {
  const errors = []

  if (!data.firstName.trim()) {
    errors.push("First name is required")
  }

  if (!data.lastName.trim()) {
    errors.push("Last name is required")
  }

  if (!data.email.trim()) {
    errors.push("Email is required")
  } else if (!isValidEmail(data.email)) {
    errors.push("Please enter a valid email address")
  }

  if (!data.subject) {
    errors.push("Please select a subject")
  }

  if (!data.message.trim()) {
    errors.push("Message is required")
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long")
  }

  if (errors.length > 0) {
    alert(errors.join("<br>")) // showToast function is undeclared, using alert as a temporary solution
    return false
  }

  return true
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function setupFAQ() {
  const faqList = document.getElementById("faqList")
  if (!faqList) return

  faqList.addEventListener("click", (e) => {
    const question = e.target.closest(".faq-question")
    if (!question) return

    const faqItem = question.parentElement
    const isActive = faqItem.classList.contains("active")

    // Close all other FAQ items
    document.querySelectorAll(".faq-item.active").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active")
      }
    })

    // Toggle current item
    faqItem.classList.toggle("active", !isActive)
  })
}
