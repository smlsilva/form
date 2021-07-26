const express = require("express")
const bodyParser = require("body-parser")
const app = express()

function criarColecao(){

    const MongoClient = require("mongodb").MongoClient
    const url = 'mongodb://localhost:27017/';
    
    MongoClient.connect(url, (err, dataBase) => {

        const datab = dataBase.db("formulario_1")

        datab.createCollection("informacoes", err => {
            if(err) throw err;
        
            console.log("Coleção Criada ...")
            dataBase.close()
        })
    })
}

function inserirDados(dados){
    const MongoClient = require("mongodb").MongoClient

    MongoClient.connect('mongodb://localhost:27017/', (err, dataBase) =>{
        
        const datab = dataBase.db("formulario_1")

        datab.collection("informacoes").insertOne(dados, function(err, res) {
            
            if(err) throw err;

            console.log("Inserido com sucesso ...")
            dataBase.close()
        })
    })
}

function consultar(){
    const MongoClient = require("mongodb").MongoClient

    MongoClient.connect("mongodb://localhost:27017/", (err, dataBase) => {

    const datab = dataBase.db("formulario_1")
    datab.collection("informacoes").find({}).toArray((error, result)=>{
        console.log(result)
        dataBase.close()
    })
    })
}
//criarColecao()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html")
})

app.post("/", (req, res) => {

    const dados = {
        name: req.body.nome,
        email: req.body.email
    }

    inserirDados(dados)
    consultar()
    res.sendFile(__dirname + "/src/index.html")
})

app.listen(8000, () => console.log("Executando ... http://127.0.0.1:8000/"))