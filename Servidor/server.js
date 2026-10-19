const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        message: "Bem-vindo ao servidor!",
        status: "Servidor rodando com sucesso!",
        tecnologias: ["Node.js", "Express", "JavaScript"]
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});