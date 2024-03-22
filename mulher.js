const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333


function mostraOla(request, response){
    response.send("Olá, mundo!")
    // router = get(localhost:3333)
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

function mostraMulher(request, response){
    response.json({ nome: 'Simara Conceição',
    imagem:'https://github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora e instrutora'
})
       
}

app.use(router.get('/mulher', mostraMulher))
app.use(router.get('/ola', mostraOla))
app.listen(porta, mostraPorta)