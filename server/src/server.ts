import Fastify from 'fastify'
import {PrismaClient} from '@prisma/client'
import cors from '@fastify/cors'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

/*
- Método HTTTP: Get (Busca os dados), Post(Cria alguma coisa), Put(Atualiza um recurso por completo), Patch(Atualiza um recurso especifico ), Delete(Deleta um recurso do banco de dados)
*/

app.get('/hello', async () => {
    const habits = await prisma.habit.findMany({
        where: {
          title: {
            startsWith: 'Beber'
          }
        }
    })

    return habits
})


app.listen({
    port: 3333
}).then(() => {
    console.log('Server running')
})