const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body // recebendo as informações do body

    const user = { id: uuid.v4(), name, age } // criando meu usuário

    users.push(user) // usuário adicionado ao array users

    return response.json(user)

})

app.listen(port, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${port}`)
})