import React, { ChangeEvent, useState } from "react";
import Task from "./Task";
import uuid from "react-uuid";

interface TaskFieldProps {}

interface todo {
    task: string;
    edit: boolean;
    checked: boolean;
    id: any;
}

const TaskField: React.FC<TaskFieldProps> = () => {
    const getInitialObj = () => {
        return {
            task: "",
            edit: false,
            checked: false,
            id: uuid(),
        };
    };

    const [todo, setTodo] = useState(getInitialObj());
    const [notes, setNotes] = useState<todo[]>([]);

    const editTodo = (id: number, par: string, varNote: any, setVarNote: any) =>
        setVarNote(
            varNote.map((note: any) => {
                if (id === note.id) {
                    return { ...note, [par]: !note[par] };
                } else {
                    return note;
                }
            })
        );

    const changeTask = (
        id: number,
        e: ChangeEvent<HTMLInputElement>,
        varNote: any,
        setVarNote: any
    ) => {
        setVarNote(
            varNote.map((note: todo) => {
                if (id === note.id) {
                    return { ...note, task: e.target?.value };
                } else {
                    return note;
                }
            })
        );
    };

    const deleteTodo = (id: number, varNote: any, setVarNote: any) => {
        setVarNote(varNote.filter((note: any) => id !== note.id && note));
    };

    const getValue = (id: number, varNote: any) => {
        varNote.reduce((res: any, note: any) =>
            note.id === id ? note.task : res
        );
    };

    const addTodo = (varNote: any, setVarNote: any) => {
        setVarNote([...varNote, todo]);
        setTodo(getInitialObj());
    };

    const keyUpChange = (
        id: number,
        e: React.KeyboardEvent<HTMLElement>,
        varNote: any,
        setVarNote: any
    ) => {
        if (e.key === "Enter") {
            editTodo(id, "edit", varNote, setVarNote);
        }
    };

    const createTodo = (e: any) => {
        setTodo({ ...todo, task: e.target.value });
    };

    const tasks = notes.map((note) => (
        <Task
            notes={notes}
            setNotes={setNotes}
            keyUpChange={keyUpChange}
            id={note.id}
            checked={note.checked}
            edit={note.edit}
            taskTitle={note.task}
            key={note.id}
            deleteTodo={deleteTodo}
            getValue={getValue}
            changeTask={changeTask}
            editTodo={editTodo}
            addTodo={addTodo}
        />
    ));

    return (
        <div className="main">
            <div>
                <div className="inner">
                    <h1 className="header">Todo List</h1>
                    <input
                        value={todo.task}
                        type="text"
                        onChange={(e) => createTodo(e)}
                    />
                    <button
                        className="add-btn pos-rel"
                        onClick={() => addTodo(notes, setNotes)}
                    >
                        Add Todo
                    </button>
                </div>
                <ul className="list">{tasks}</ul>
            </div>
        </div>
    );
};

export default TaskField;
