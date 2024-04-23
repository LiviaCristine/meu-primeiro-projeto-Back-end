const express = require("express") // aqui estou  iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa api no front-end
const ConectaBancoDeDados = require('./bancodeDados') // aqui estou ligando ao arquivo banco de dados
ConectaBancoDeDados() //  estou chamando a função que conecta o banco de dados


const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // aqui estou criando a porta


async function mostraMulheres(request, response){
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro) {
        console.log(erro)
    }
   
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log()
    }

}

// PATCH
async function corrigeMulher(request, response) {
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
        
        if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
        }

        if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
       try{
            await Mulher.findByIdAndDelete(request.params.id)
            response.json({ mensagem: 'Mulher deletada com sucesso'})
       }catch(erro) {
        console.log(erro)
       }

    
}



app.get('/mulheres', mostraMulheres); // Rota GET /mulheres
app.post('/mulheres', criaMulher); // Rota POST /mulheres
app.patch('/mulheres/:id', corrigeMulher); // Rota PATCH /mulheres/:id
app.delete('/mulheres/:id', deletaMulher); // Rota DELETE /mulheres/:id

app.listen(porta, mostraPorta); // Inicia o servidor na porta especificada


// https://back-end-nuo7.onrender.com/mulheres
