import React, { ChangeEvent, useState } from "react";
import SubTask from "./SubTask";

interface TaskProps {
    getValue: (id: number, varNote: any) => any;
    deleteTodo: (id: number, varNote: any, setVarNote: any) => void;
    changeTask: (
        id: number,
        e: ChangeEvent<HTMLInputElement>,
        varNote: any,
        setVarNote: any
    ) => void;
    editTodo: (id: number, par: string, varNote: any, setVarNote: any) => any;
    keyUpChange: (
        id: number,
        e: React.KeyboardEvent<HTMLElement>,
        varNote: any,
        setVarNote: any
    ) => void;
    addTodo: (varNote: any, setVarNote: any) => void;
    notes: any;
    setNotes: any;
    checked: boolean;
    edit: boolean;
    taskTitle: string;
    id: any;
}

const Task: React.FC<TaskProps> = (props) => {
    const [subNotes, setSubNotes] = useState<any[]>([]);

    const subTasks = subNotes.map((subNote) => (
        <SubTask
            subNotes={subNotes}
            setSubNotes={setSubNotes}
            keyUpChange={props.keyUpChange}
            id={subNote.id}
            checked={subNote.checked}
            edit={subNote.edit}
            taskTitle={subNote.task}
            key={subNote.id}
            deleteTodo={props.deleteTodo}
            getValue={props.getValue}
            changeTask={props.changeTask}
            editTodo={props.editTodo}
        />
    ));

    return (
        <li>
            {!props.edit ? (
                <div>
                    <span
                        className="pos-rel"
                        onClick={() =>
                            props.editTodo(
                                props.id,
                                "edit",
                                props.notes,
                                props.setNotes
                            )
                        } //tut notes vrode  and  prokinut notes through props
                    >
                        {props.taskTitle}
                    </span>
                    <input
                        className="pos-rel"
                        style={{ right: "2vh" }}
                        type="checkbox"
                        checked={props.checked}
                        onChange={() => {
                            props.editTodo(
                                props.id,
                                "checked",
                                props.notes,
                                props.setNotes
                            );
                        }}
                    />
                    <button
                        className="dlt-btn pos-rel edit-btn"
                        onClick={() => props.addTodo(subNotes, setSubNotes)}
                    >
                        +
                    </button>
                    <button
                        style={{ right: "3vh", top: "0.1vh" }}
                        className="dlt-btn pos-rel"
                        onClick={() =>
                            props.deleteTodo(
                                props.id,
                                props.notes,
                                props.setNotes
                            )
                        }
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        onBlur={() =>
                            props.editTodo(
                                props.id,
                                "edit",
                                props.notes,
                                props.setNotes
                            )
                        }
                        value={props.getValue(props.id, props.notes)}
                        onChange={(e) =>
                            props.changeTask(
                                props.id,
                                e,
                                props.notes,
                                props.setNotes
                            )
                        }
                        onKeyUp={(e) =>
                            props.keyUpChange(
                                props.id,
                                e,
                                props.notes,
                                props.setNotes
                            )
                        }
                    />
                </div>
            )}
            <ul>{subTasks}</ul>
        </li>
    );
};

export default Task;
