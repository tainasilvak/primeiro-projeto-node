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

app.put('/users/:id', (request, response) => {
    const {id} = request.params // pegar o id do user
    const {name, age} = request.body // pegar as informações que quero atualizar

    const updateUser = {id, name, age} // usuário atualizado

    const index = users.findIndex( user => user.id === id) // encontrar a posição que o usuário está dentro do array

    if(index < 0) {
        return response.status(404).json({message: "User not found"}) // usuário não encontrado
    }

    users[index] = updateUser // atualizo o usuário

    return response.json(updateUser) // mostra na tela o usuário atualizado
})

app.delete('/users/:id', (request, response) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)
    
    if(index < 0) {
        return response.status(404).json({message: "User not found"}) // usuário não encontrado
    }

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${port}`)
})