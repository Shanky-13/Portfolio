/**
 * Central GSAP entry — every module imports gsap from here so the
 * ScrollTrigger plugin is registered exactly once.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
