import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
    id: string,
    text: string
};

let todos: Array<Todo> = [];

router.get('/todo', ctx => {
    ctx.response.body = { 
        result: 'success',
        message: 'Activities fetched successfully',
        todos: todos
    };
});

router.post('/todo', async ctx => {
    // no need for bodyparser anymore!
    // but now it returns a promise
    const body = await ctx.request.body();
    // and to extract our text attribute we have to do this:
    const text = body.value.text;

    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: text
    };

    todos.push(newTodo);

    ctx.response.body = { 
        result: 'success',
        message: 'Activity created successfully',
        todo: newTodo
    };
});

router.put('/todo/:id', async ctx => {
    const id = ctx.params.id;
    
    const body = await ctx.request.body();
    const text = body.value.text;

    const todoIndex = todos.findIndex(todo => todo.id === id);

    todos[todoIndex] = {
        id: todos[todoIndex].id, 
        text: text
    };

    ctx.response.body = { 
        result: 'success',
        message: 'To do updated successfully',
        todo: todos[todoIndex]
    };
});

router.delete('/todo/:id', ctx => {
    const id = ctx.params.id;

    todos = todos.filter(todo => todo.id !== id);

    ctx.response.body = { 
        result: 'success',
        message: 'To do deleted successfully'
    };
});

export default router;