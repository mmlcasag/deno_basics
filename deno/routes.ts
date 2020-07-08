import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

import { getDatabaseConnection } from "./database.ts";

const router = new Router();

interface Todo {
    id?: string, // this makes this attribute is optional
    text: string
};

let todos: Array<Todo> = [];

router.get('/todo', async ctx => {
    // this returns the todos list from the database in the mongo format
    // so this is an array of objects of type _id objectid and text string
    const todos = await getDatabaseConnection().collection('todos').find();
    
    const transformedTodos = todos.map((todo: { _id: ObjectId, text: string }) => {
        return { 
            id: todo._id.$oid, // this converts it to string
            text: todo.text
        };
    });

    ctx.response.body = { 
        result: 'success',
        message: 'Activities fetched successfully',
        todos: transformedTodos
    };
});

router.post('/todo', async ctx => {
    // no need for bodyparser anymore!
    // but now it returns a promise
    const body = await ctx.request.body();
    // and to extract our text attribute we have to do this:
    const text = body.value.text;

    const newTodo: Todo = {
        text: text
    };
    
    const id = await getDatabaseConnection().collection('todos').insertOne(newTodo);

    newTodo.id = id.$oid; // this converts it to string

    ctx.response.body = { 
        result: 'success',
        message: 'Activity created successfully',
        todo: newTodo
    };
});

router.put('/todo/:id', async ctx => {
    const id = ctx.params.id!; // to make it clear to typescript that this will never be undefined
    
    const body = await ctx.request.body();
    const text = body.value.text;

    const todo = {
        id: id,
        text: text
    };

    await getDatabaseConnection()
        .collection('todos')
        .updateOne({ _id: ObjectId(id) }, { $set: { text: text } });
    
    ctx.response.body = { 
        result: 'success',
        message: 'To do updated successfully',
        todo: todo
    };
});

router.delete('/todo/:id', async ctx => {
    const id = ctx.params.id!; // to make it clear to typescript that this will never be undefined

    await getDatabaseConnection()
        .collection('todos')
        .deleteOne({ _id: ObjectId(id) });

    ctx.response.body = { 
        result: 'success',
        message: 'To do deleted successfully'
    };
});

export default router;