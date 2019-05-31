let currentFruit = null

const userFruits = {}

const plot = document.querySelector('#plot')
const bottomBar = document.querySelector('#bottomBar')

const fruitIds = []
const fruitEmojis = []
document.querySelectorAll('#user-fruits li').forEach(fruit => {
  const id = fruit.getAttribute('data-fruit')
  fruitIds.push(id)
  fruitEmojis.push(fruit.innerText)
})

const mock = {}
const generateMock = () => {
  fruitIds.forEach(fruitId => {
    const num = Math.floor(100 + Math.random() * 30)
    mock[fruitId] = []
    for (let i = 0; i < num; i++) {
      mock[fruitId].push({
        x: Math.random(),
        y: Math.random()
      })
    }
  })
}
generateMock()
console.log(mock)


fruitIds.forEach((fruitId, i) => {
  const fruitValues = mock[fruitId]
  fruitValues.forEach(fruitValue => {
    const node = document.createElement('li')
    node.innerText = fruitEmojis[i]
    plot.appendChild(node)
  })
})


const getFruitValue = (fruit) => {
  const bottomBarHeight = bottomBar.getBoundingClientRect().height
  const fruitRect = fruit.getBoundingClientRect()
  const x = ( parseInt(fruit.style.left, 10) + fruitRect.width / 2 ) / window.innerWidth
  const y = 1 - ( parseInt(fruit.style.top, 10) + fruitRect.height / 2 ) / ( window.innerHeight - bottomBarHeight )
  return { x, y }
}

const getFruitCoords = ({ x, y }) => {
  
}

const completeUserSelection = () => {
  document.querySelectorAll('#plot li').forEach(fruit => {
    const id = fruit.getAttribute('data-fruit')
    userFruits[id] = getFruitValue(fruit)
  })
  console.log(userFruits)
}

const onFruitMove = (e) => {
  const rect = currentFruit.getBoundingClientRect()
  currentFruit.style.left = `${e.pageX - rect.width/2}px`
  currentFruit.style.top = `${e.pageY - rect.height/2}px`
}
const onFruitup = (e) => {
  const id = currentFruit.getAttribute('data-fruit')
  userFruits[id] = getFruitValue(currentFruit)

  document.removeEventListener('mousemove', onFruitMove)
  currentFruit = null

  if (document.querySelectorAll('#user-fruits li').length === 0) {
    completeUserSelection()
  }
}

const onFruitSelect = (e) => {
  currentFruit = e.target
  if (currentFruit.tagName !== 'LI') return
  if (currentFruit.parentNode.id === 'user-fruits') {
    currentFruit.classList.toggle('-disabled', true)
    currentFruit = currentFruit.cloneNode(true)
    currentFruit.classList.add('user')
    plot.appendChild(currentFruit)
  }
  document.addEventListener('mousemove', onFruitMove)
}

document.querySelector('#user-fruits').addEventListener('mousedown', onFruitSelect);
document.querySelector('#plot').addEventListener('mousedown', onFruitSelect);

document.addEventListener('mouseup', onFruitup)