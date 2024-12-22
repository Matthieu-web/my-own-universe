import { PrismaClient } from '@prisma/client'
var bcrypt = require('bcryptjs');
const prisma = new PrismaClient()

async function main() {
    const password1 = await bcrypt.hash("azeazeaze", 10)
    const password2 = await bcrypt.hash("qsdqsdqsd", 10)
    const password3 = await bcrypt.hash("azeqsdaze", 10)
    const user = await prisma.user.create({
        data: {
          pseudonyme: 'Alice',
          email: 'alice@prisma.io',
          posts:{
            create: {
              content: "<p>Bonjour voici un post que je tiens à partager</p>"
            }
          },

          password: password1
        },
      })
      console.log(user)
      const user2 = await prisma.user.create({
        data: {
          pseudonyme: 'Matthieu',
          email: 'matthieu@prisma.io',
          posts:{
            create: {
              content: "<p>Bonjour voici un post que je tiens à partager</p>"
            }
          },
          password: password2
        },
      })
      console.log(user2)
      const user3 = await prisma.user.create({
        data: {
          pseudonyme: 'mouloud',
          email: 'mouloud@prisma.io',
          posts:{
            create: {
              content: "<p>Bonjour voici un post que je tiens à partager</p>"
            }
          },
          password: password3
        },
      })
      console.log(user3)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })