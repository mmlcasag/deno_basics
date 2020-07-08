const express = require('express');

const router = express.Router();

let todos = [];

router.get('/todo', (req, res, next) => {
    res.status(200).json({
        result: 'success',
        message: 'To do list fetched successfully',
        todos: todos
    });
});

router.post('/todo', (req, res, next) => {
    const newTodo = { 
        id: new Date().toISOString(),
        text: req.body.text
    };
    
    todos.push(newTodo);

    res.status(201).json({
        result: 'success',
        message: 'To do created successfully',
        todo: newTodo
    });
});

router.put('/todo/:id', (req, res, next) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    todos[todoIndex] = {
        id: todos[todoIndex].id, 
        text: req.body.text
    };

    res.status(200).json({
        result: 'success',
        message: 'To do updated successfully',
        todo: todos[todoIndex]
    });
});

router.delete('/todo/:id', (req, res, next) => {
    const id = req.params.id;
    
    todos = todos.filter(todo => todo.id !== id);

    res.status(200).json({
        result: 'success',
        message: 'To do deleted successfully'
    });
});

module.exports = router;
