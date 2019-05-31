import { prisma } from '../prisma/generated/prisma-client'

async function main() {
  const fruits = await prisma.fruits()
  console.log(`Fetch all fruits: `, fruits)

  // const newFruit = await prisma.createFruit({
  //   name: 'coconut'
  // })
  // console.log(`Created a new fruit: `, newFruit)


  // const fruits2 = await prisma.fruits()
  // console.log(`Retrieved all fruits after creation: `, fruits2)

  const newPosition = await prisma.createPosition({
    x: 0,
    y: 0,
    fruit: {
      connect: {
        name: 'coconut',
      },
    },
  })
  console.log(`Created a new position: `, newPosition)

  const positions = await prisma.positions()
  console.log(`Fetch all positions: `, positions)

  const fruitsWithPositions = await prisma
    .fruit({ name: 'coconut' })
    .positions()
  console.log('Fetch coconut with positions', fruitsWithPositions)

}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(e => console.error(e))
