// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const nav = document.querySelector(".nav")

mobileMenuToggle.addEventListener("click", () => {
  nav.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav a")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Form submission handler
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    whatsapp: document.getElementById("whatsapp").value,
    message: document.getElementById("message").value,
  }

  // Create WhatsApp message
  const whatsappMessage = `Olá, meu nome é *${formData.name}*.

Entrei em contato através do site da RBT Immigration porque tenho interesse em seus serviços de consultoria de imigração.

*Motivo do contato:*
${formData.message}

*Meus dados para contato:*
E-mail: ${formData.email}
WhatsApp: ${formData.whatsapp}

Aguardo retorno. Obrigado!`

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage)

  // Your WhatsApp number (remove + and spaces)
  const whatsappNumber = "5583986146231"

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  // Open WhatsApp in new tab
  window.open(whatsappURL, "_blank")

  // Show success message
  alert("Obrigado pelo contato! Você será redirecionado para o WhatsApp.")

  // Reset form
  contactForm.reset()
})

// Schedule consultation button handler
const scheduleButtons = document.querySelectorAll(".btn-schedule, .btn-primary")
scheduleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const contactSection = document.getElementById("contato")
    if (contactSection) {
      const headerOffset = 80
      const elementPosition = contactSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add scroll effect to header
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = "translateY(-100%)"
  } else {
    header.style.transform = "translateY(0)"
  }

  lastScroll = currentScroll
})
