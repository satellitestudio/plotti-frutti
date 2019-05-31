let fruit = null

const userFruits = {}

const plot = document.querySelector('#plot')

const completeUserSelection = () => {
  document.querySelectorAll('#plot li').forEach(fruit => {
    const id = fruit.getAttribute('data-fruit')
    const x = parseInt(fruit.style.left, 10) / window.innerWidth
    const y = parseInt(fruit.style.top, 10) / window.innerHeight
    userFruits[id] = { x, y }
  })
  console.log(userFruits)
}

const onFruitMove = (e) => {
  const rect = fruit.getBoundingClientRect()
  fruit.style.left = `${e.pageX - rect.width/2}px`
  fruit.style.top = `${e.pageY - rect.height/2}px`
  plot.appendChild(fruit)
  fruit.style.position = 'absolute'
}
const onFruitup = (e) => {
  document.removeEventListener('mousemove', onFruitMove)
  fruit = null

  if (document.querySelectorAll('#user-fruits li').length === 0) {
    completeUserSelection()
  }
}

const onFruitSelect = (e) => {
  fruit = e.target
  if (fruit.tagName !== 'LI') return
  document.addEventListener('mousemove', onFruitMove)
}

document.querySelector('#user-fruits').addEventListener('mousedown', onFruitSelect);
document.querySelector('#plot').addEventListener('mousedown', onFruitSelect);

document.addEventListener('mouseup', onFruitup)