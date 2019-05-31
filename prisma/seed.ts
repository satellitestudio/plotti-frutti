import { prisma } from './generated/prisma-client'

const fruits = ['coconut', 'apple']

async function main() {
  fruits.map(async(fruit) => {
    await prisma.createFruit({
      name: fruit
    })
  })
}

main().catch(e => console.error(e))
