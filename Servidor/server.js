const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Array em memória para guardar as tarefas
let tarefas = [];
let proximoId = 1;

// 1. CREATE (Criar tarefa) - POST /tarefas
app.post('/tarefas', (req, res) => {
    const { titulo, descricao } = req.body;

    const novaTarefa = {
        id: proximoId++,
        titulo: titulo || 'Sem título',
        descricao: descricao || ''
    };

    tarefas.push(novaTarefa);
    return res.status(201).json(novaTarefa);
});

// 2. READ (Listar tarefas) - GET /tarefas
app.get('/tarefas', (req, res) => {
    return res.json(tarefas);
});

// 3. UPDATE (Editar tarefa) - PUT /tarefas/:id
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    const tarefa = tarefas.find(t => t.id === Number(id));

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    if (titulo !== undefined) tarefa.titulo = titulo;
    if (descricao !== undefined) tarefa.descricao = descricao;

    return res.json(tarefa);
});

// 4. DELETE (Apagar tarefa) - DELETE /tarefas/:id
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const index = tarefas.findIndex(t => t.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    tarefas.splice(index, 1);
    return res.status(204).send(); // Sucesso sem conteúdo de retorno
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});