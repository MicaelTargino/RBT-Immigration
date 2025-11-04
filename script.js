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
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset

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

  // Build message (no manual encoding tweaks)
  const whatsappMessage = `Olá! Meu nome é *${formData.name}*

  Encontrei vocês pelo site da RBT Immigration e gostaria de saber mais sobre os serviços de consultoria de imigração.

  *Meu objetivo nos EUA:*
  ${formData.message}

  E-mail: ${formData.email}
  WhatsApp: ${formData.whatsapp}

  Aguardo o retorno de vocês!`;

  // Encode once
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Your WhatsApp number (E.164, no + or spaces)
  const whatsappNumber = "12035900986"; // company
  // const whatsappNumber = "5583986146231"; // personal

  // Prefer Web on desktop, API on mobile
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  const baseURL = "https://api.whatsapp.com/send"
  // const baseURL = isMobile
  //   ? "https://api.whatsapp.com/send"
  //   : "https://web.whatsapp.com/send";

  // Create WhatsApp URL
  const whatsappURL = `${baseURL}?phone=${whatsappNumber}&text=${encodedMessage}`;

  // Open WhatsApp in new tab
  window.open(whatsappURL, "_blank", "noopener,noreferrer");

  // Show success message
  // alert("Obrigado pelo contato! Você será redirecionado para o WhatsApp.")

  // Reset form
  contactForm.reset()
})

// Schedule consultation button handler - scroll to contact section
document.addEventListener("DOMContentLoaded", () => {
  const scheduleButtons = document.querySelectorAll(".btn-schedule, .btn-primary")
  console.log("Found schedule buttons:", scheduleButtons.length)

  scheduleButtons.forEach((button, index) => {
    console.log(`Attaching listener to button ${index + 1}`)
    button.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Scrolling to contact section...")

      // Scroll to the contact section
      const contactSection = document.querySelector("#contato")
      if (contactSection) {
        const headerOffset = 85
        const elementPosition = contactSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const carouselTrack = document.querySelector(".carousel-track")
  const carouselItems = Array.from(document.querySelectorAll(".carousel-item"))
  const prevBtn = document.querySelector(".carousel-btn-left")
  const nextBtn = document.querySelector(".carousel-btn-right")

  if (!carouselTrack || carouselItems.length === 0) return

  const totalOriginalItems = carouselItems.length

  // Clone ALL items and add them to both sides for seamless infinite loop
  const startClones = carouselItems.map(item => item.cloneNode(true))
  const endClones = carouselItems.map(item => item.cloneNode(true))

  // Add clones: [all clones] [original items] [all clones]
  endClones.forEach(clone => carouselTrack.appendChild(clone))
  startClones.reverse().forEach(clone => carouselTrack.insertBefore(clone, carouselTrack.firstChild))

  // Get all items including clones
  const allItems = Array.from(carouselTrack.querySelectorAll(".carousel-item"))

  // Start at the first real item (after all start clones)
  let currentIndex = totalOriginalItems
  let isTransitioning = false

  // Get responsive item width based on screen size
  function getItemWidth() {
    const screenWidth = window.innerWidth
    if (screenWidth <= 768) {
      // Mobile: 280px
      return 280
    } else if (screenWidth <= 1024) {
      // Tablet: 220px
      return 220
    } else {
      // Desktop: 280px
      return 280
    }
  }

  function updateCarousel(animated = true) {
    if (!animated) {
      // Disable ALL transitions including item transitions
      carouselTrack.style.transition = "none"
      allItems.forEach(item => {
        item.style.transition = "none"
      })
    } else {
      carouselTrack.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      allItems.forEach(item => {
        item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      })
    }

    // Calculate the offset to center the active item
    const itemWidth = getItemWidth()
    const gap = 0
    const itemTotalWidth = itemWidth + gap
    const containerWidth = document.querySelector(".carousel-container").offsetWidth
    const offset = -(currentIndex * itemTotalWidth) + (containerWidth / 2) - (itemWidth / 2)

    carouselTrack.style.transform = `translateX(${offset}px)`

    // Update classes for styling
    allItems.forEach((item, index) => {
      item.classList.remove("active", "adjacent")
      const distance = Math.abs(index - currentIndex)

      if (index === currentIndex) {
        item.classList.add("active")
      } else if (distance === 1) {
        item.classList.add("adjacent")
      }
    })

    if (!animated) {
      // Force reflow to ensure transitions are disabled
      void carouselTrack.offsetHeight
      requestAnimationFrame(() => {
        carouselTrack.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        allItems.forEach(item => {
          item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        })
      })
    }
  }

  function handleTransitionEnd() {
    if (!isTransitioning) return

    // Check if we need to loop back
    if (currentIndex >= totalOriginalItems * 2) {
      isTransitioning = false
      currentIndex = totalOriginalItems
      updateCarousel(false)
    } else if (currentIndex < totalOriginalItems) {
      isTransitioning = false
      currentIndex = totalOriginalItems * 2 - 1
      updateCarousel(false)
    } else {
      isTransitioning = false
    }
  }

  // Listen for transition end
  carouselTrack.addEventListener("transitionend", handleTransitionEnd)

  function nextSlide() {
    if (isTransitioning) return
    isTransitioning = true
    currentIndex++
    updateCarousel(true)
  }

  function prevSlide() {
    if (isTransitioning) return
    isTransitioning = true
    currentIndex--
    updateCarousel(true)
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)
  }

  // Initialize carousel
  updateCarousel(false)

  // Handle window resize for responsive behavior
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      updateCarousel(false)
    }, 150)
  })
})

// Add scroll effect to header - hide on scroll down, show on scroll up
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    header.style.transform = "translateY(-100%)"
  } else {
    // Scrolling up
    header.style.transform = "translateY(0)"
  }

  lastScroll = currentScroll
})
