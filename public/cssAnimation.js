const frame = document.getElementById('frame')

const appendAnimation = (node, name, callbackFn) => {
  node.style.animationName = name

  const onAnimationEnd = () => {
    node.removeEventListener("webkitAnimationEnd", onAnimationEnd)
    node.removeEventListener("animationend", onAnimationEnd)
    node.removeEventListener("oanimationend", onAnimationEnd)

    callbackFn && callbackFn()
  }

  node.addEventListener("webkitAnimationEnd", onAnimationEnd);
  node.addEventListener("animationend", onAnimationEnd);
  node.addEventListener("oanimationend", onAnimationEnd);
}

export const handleNextSlideAnimation = () => {
  appendAnimation(frame, 'frame-next-slide-exit', () => appendAnimation(frame, 'frame-next-slide-enter'))
}

export const handlePreviousSlideAnimation = () => {
  appendAnimation(frame, 'frame-previous-slide-exit', () => appendAnimation(frame, 'frame-previous-slide-enter'))
}