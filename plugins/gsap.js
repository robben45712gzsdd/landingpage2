import Vue from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

gsap.registerPlugin(ScrollTrigger)

Vue.prototype.$gsap = gsap
Vue.prototype.$ScrollTrigger = ScrollTrigger

// Initialize AOS
if (process.client) {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: false,
    offset: 120
  })

  // Initialize smooth scroll with GSAP
  document.addEventListener('DOMContentLoaded', () => {
    // Enable smooth scroll behavior
    gsap.to('html', {
      autoKills: false,
      duration: 0
    })
  })
}

