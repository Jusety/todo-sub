import React, { ChangeEvent, useState } from "react";
import Task from "./Task";

interface TaskFieldProps {}

interface todo {
    task: string;
    edit: boolean;
    checked: boolean;
}

const TaskField: React.FC<TaskFieldProps> = () => {
    const getInitialObj = () => {
        return {
            task: "",
            edit: false,
            checked: false,
        };
    };

    const [todo, setTodo] = useState(getInitialObj());
    const [notes, setNotes] = useState<todo[]>([]);

    const editTodo = (id: number, par: string) =>
        setNotes(
            notes.map((note: any, index: number) => {
                if (id === index) {
                    return { ...note, [par]: !note[par] };
                } else {
                    return note;
                }
            })
        );

    const changeTask = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        setNotes(
            notes.map((note: todo, index: number) => {
                if (id === index) {
                    return { ...note, task: e.target?.value };
                } else {
                    return note;
                }
            })
        );
    };

    const deleteTodo = (id: number) => {
        setNotes(notes.filter((note, index) => id !== index && note));
    };

    const getValue = (id: number) => {
        notes.reduce((res: any, note: any, index: number) =>
            index === id ? note.task : res
        );
    };

    const addTodo = () => {
        setNotes([...notes, todo]);
        setTodo(getInitialObj());
    };

    const keyUpChange = (id: number, e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            editTodo(id, "edit");
        }
    };

    const createTodo = (e: any) => {
        setTodo({ ...todo, task: e.target.value });
    };

    const tasks = notes.map((note, index) => (
        <Task
            keyUpChange={keyUpChange}
            id={index}
            checked={note.checked}
            edit={note.edit}
            taskTitle={note.task}
            key={index}
            deleteTodo={deleteTodo}
            getValue={getValue}
            changeTask={changeTask}
            editTodo={editTodo}
        />
    ));

    return (
        <div className="main">
            <div>
                <div className="inner">
                    <h1>Todo List</h1>
                    <input
                        value={todo.task}
                        type="text"
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                createTodo(e);
                            }
                        }}
                        onChange={(e) => createTodo(e)}
                    />
                    <button onClick={() => addTodo()}>Add Todo</button>
                </div>
                <ul className="list">{tasks}</ul>
            </div>
        </div>
    );
};

export default TaskField;
