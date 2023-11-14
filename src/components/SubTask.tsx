import React, { ChangeEvent } from "react";

interface SubTaskProps {
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
    subNotes: any;
    setSubNotes: any;
    checked: boolean;
    edit: boolean;
    taskTitle: string;
    id: any;
}

const Task: React.FC<SubTaskProps> = (props) => {
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
                                props.subNotes,
                                props.setSubNotes
                            )
                        }
                    >
                        {props.taskTitle}
                    </span>
                    <input
                        className="pos-rel"
                        style={{ right: "1.6vh" }}
                        type="checkbox"
                        checked={props.checked}
                        onChange={() => {
                            props.editTodo(
                                props.id,
                                "checked",
                                props.subNotes,
                                props.setSubNotes
                            );
                        }}
                    />
                    <button
                        style={{ right: "1.5vh" }}
                        className="dlt-btn pos-rel"
                        onClick={() =>
                            props.deleteTodo(
                                props.id,
                                props.subNotes,
                                props.setSubNotes
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
                                props.subNotes,
                                props.setSubNotes
                            )
                        }
                        value={props.getValue(props.id, props.subNotes)}
                        onChange={(e) =>
                            props.changeTask(
                                props.id,
                                e,
                                props.subNotes,
                                props.setSubNotes
                            )
                        }
                        onKeyUp={(e) =>
                            props.keyUpChange(
                                props.id,
                                e,
                                props.subNotes,
                                props.setSubNotes
                            )
                        }
                    />
                </div>
            )}
        </li>
    );
};

export default Task;
