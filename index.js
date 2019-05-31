let fruit = null



const onFruitMove = (e) => {
  fruit.style.left = `${e.pageX}px`
  fruit.style.top = `${e.pageY}px`
}
const onFruitup = (e) => {
  document.removeEventListener('mousemove', onFruitMove)
  document.removeEventListener('mouseup', onFruitUp)
  fruit = null
}

document.querySelector('#user-fruits').addEventListener('mousedown', (e) => {
  fruit = e.target
  fruit.style.position = 'absolute'
  document.addEventListener('mousemove', onFruitMove)
  document.addEventListener('mouseup', onFruitup)
})