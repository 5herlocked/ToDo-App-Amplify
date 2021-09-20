import React from "react";
import {deleteTodo} from '../graphql/mutations.js';
import {API, graphqlOperation} from "aws-amplify";
import ToDoItem from "./ToDoItem";

const ToDoList = ({todos, onRemove}) => {

    async function handleDelete (id) {
        try {
            const todo = {id};
            await API.graphql(graphqlOperation(deleteTodo, {input: todo}));
            onRemove(todo.id);
        } catch (err) {
            console.log('error deleting toDo: ', err);
        }
    }

    return (
        todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index} style={{display: "flex", flexDirection: "column"}}>
                <ToDoItem todo={todo} handleDelete={handleDelete}/>
            </div>
        ))
    )
}
export default ToDoList;