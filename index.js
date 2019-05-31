let fruit = null

const userFruits = {}

const plot = document.querySelector('#plot')
const bottomBar = document.querySelector('#bottomBar')

const getFruitValue = (fruit) => {
  const bottomBarHeight = bottomBar.getBoundingClientRect().height
  const fruitRect = fruit.getBoundingClientRect()
  const x = ( parseInt(fruit.style.left, 10) + fruitRect.width / 2 ) / window.innerWidth
  const y = ( parseInt(fruit.style.top, 10) + fruitRect.height / 2 ) / ( window.innerHeight - bottomBarHeight )
  return { x, y }
}

const completeUserSelection = () => {
  document.querySelectorAll('#plot li').forEach(fruit => {
    const id = fruit.getAttribute('data-fruit')
    userFruits[id] = getFruitValue(fruit)
  })
  console.log(userFruits)
}

const onFruitMove = (e) => {
  plot.appendChild(fruit)
  const rect = fruit.getBoundingClientRect()
  fruit.style.left = `${e.pageX - rect.width/2}px`
  fruit.style.top = `${e.pageY - rect.height/2}px`
  fruit.style.position = 'absolute'
}
const onFruitup = (e) => {
  const id = fruit.getAttribute('data-fruit')
  userFruits[id] = getFruitValue(fruit)
  console.log(userFruits)

  document.removeEventListener('mousemove', onFruitMove)
  fruit = null

  if (document.querySelectorAll('#user-fruits li').length === 0) {
    completeUserSelection()
  }
}

const onFruitSelect = (e) => {
  fruit = e.target
  if (fruit.tagName !== 'LI') return
  if (fruit.parentNode.id === 'user-fruits') {
    fruit.classList.toggle('-disabled', true)
    fruit = fruit.cloneNode(true)
  }
  document.addEventListener('mousemove', onFruitMove)
}

document.querySelector('#user-fruits').addEventListener('mousedown', onFruitSelect);
document.querySelector('#plot').addEventListener('mousedown', onFruitSelect);

document.addEventListener('mouseup', onFruitup)