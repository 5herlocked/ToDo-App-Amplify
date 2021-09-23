import React, {useEffect, useState} from "react";
import Amplify, {API, graphqlOperation} from "aws-amplify";
import {createTodo, updateTodo} from "./graphql/mutations";
import {listTodos} from "./graphql/queries";
import awsExports from './aws-exports';
import {withAuthenticator} from "@aws-amplify/ui-react";
import ToDoList from "./components/ToDoList";
import AmplifyBar from "./components/AmplifyBar";
import NewNote from "./components/NewNote";

import "./App.css";

Amplify.configure(awsExports);

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, [])

    async function fetchTodos() {
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos));
            const todos = todoData.data.listTodos.items;
            setTodos(todos);
        } catch (err) {
            console.log('error fetching todos', err)
        }
    }

    async function addTodo(formState) {
        try {
            // basic validation
            if (!formState.name || !formState.description) return

            const todo = {...formState};
            // create an array of all previous todos with the new todo
            setTodos([...todos, todo]);
            // reset to default of empty, empty

            await API.graphql(graphqlOperation(createTodo, {input: todo}));
        } catch (err) {
            console.log('error creating todo: ', err);
        }
    }

    function handleDelete(todo) {
        // Saves network traffic by locally removing the item after
        // a network request has been sent
        // const newTodos = todos.filter((item) => item.id !== todo.id);

        fetchTodos();
    }

    return (
        <div>
            <AmplifyBar/>
            <div className="NoteArea">
                    <NewNote onAdd={addTodo}/>
                    <ToDoList todos={todos} onRemove={handleDelete}/>
            </div>
        </div>
    )
}

export default withAuthenticator(App);
