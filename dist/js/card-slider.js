// get our elements
const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide')),
  slider2 = document.querySelector('.slider-container-2'),
  slides2 = Array.from(document.querySelectorAll('.slide-2'))


// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0
let isDragging2 = false,
  startPos2 = 0,
  currentTranslate2 = 0,
  prevTranslate2 = 0,
  animationID2,
  currentIndex2 = 0

// add our event listeners
slides.forEach((slide, index) => {
  const slideCard = slide.querySelector('.card')
  // disable default image drag
  slideCard.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)
  // mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mousemove', touchMove)
  slide.addEventListener('mouseleave', touchEnd)
})

// add our event listeners for 2nd slider
slides2.forEach((slide2, index2) => {
  const slideCard2 = slide2.querySelector('.card-2')
  // disable default image drag
  slideCard2.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events
  slide2.addEventListener('touchstart', touchStart2(index2))
  slide2.addEventListener('touchend', touchEnd2)
  slide2.addEventListener('touchmove', touchMove2)
  // mouse events
  slide2.addEventListener('mousedown', touchStart2(index2))
  slide2.addEventListener('mouseup', touchEnd2)
  slide2.addEventListener('mousemove', touchMove2)
  slide2.addEventListener('mouseleave', touchEnd2)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

// use a HOF so we have index in a closure
function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}
function touchStart2(index2) {
  return function (event) {
    currentIndex2 = index2
    startPos2 = getPositionX(event)
    isDragging2 = true
    animationID2 = requestAnimationFrame(animation2)
    slider2.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}
function touchMove2(event) {
  if (isDragging2) {
    const currentPosition2 = getPositionX(event)
    currentTranslate2 = prevTranslate2 + currentPosition2 - startPos2
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()

  slider.classList.remove('grabbing')
}
function touchEnd2() {
  cancelAnimationFrame(animationID2)
  isDragging = false
  const movedBy2 = currentTranslate2 - prevTranslate2

  // if moved enough negative then snap to next slide if there is one
  if (movedBy2 < -100 && currentIndex2 < slides2.length - 1) currentIndex2 += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy2 > 100 && currentIndex2 > 0) currentIndex2 -= 1

  setPositionByIndex2()

  slider2.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}
function animation2() {
  setSliderPosition2()
  if (isDragging2) requestAnimationFrame(animation2)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * (-window.innerWidth + 40)
  prevTranslate = currentTranslate
  setSliderPosition()
}
function setPositionByIndex2() {
  currentTranslate2 = currentIndex2 * (-window.innerWidth + 40)
  prevTranslate2 = currentTranslate2
  setSliderPosition2()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}
function setSliderPosition2() {
  slider2.style.transform = `translateX(${currentTranslate2}px)`
}