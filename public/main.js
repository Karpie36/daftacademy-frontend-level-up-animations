import { handleNextSlideAnimation, handlePreviousSlideAnimation } from "../cssAnimation.js"
import { handleCanvasAnimation } from "../canvasAnimation.js"
import { handleThreeNextSlideAnimation, handleThreePreviousSlideAnimation } from "../threeAnimation.js"
import { SLIDES_COUNT } from "../utils.js"

const title = document.getElementById('title')

let slideIndex = 0

export const nextSlide = () => {
  if(slideIndex >= SLIDES_COUNT){
    slideIndex = 0
  } else {
    slideIndex++
  }

  title.innerHTML = ''
  const text = document.createTextNode(`slide${slideIndex+1}`)
  title.appendChild(text)

  handleNextSlideAnimation()
  handleCanvasAnimation(slideIndex)
  handleThreeNextSlideAnimation(360)
}

export const previousSlide = () => {
  if(slideIndex <= 0){
    slideIndex = SLIDES_COUNT
  } else {
    slideIndex--
  }

  title.innerHTML = ''
  const text = document.createTextNode(`slide${slideIndex+1}`)
  title.appendChild(text)

  handlePreviousSlideAnimation()
  handleCanvasAnimation(slideIndex)
  handleThreePreviousSlideAnimation(-360)
}