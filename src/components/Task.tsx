import React, { ChangeEvent } from "react";

interface TaskProps {
    getValue: (id: number) => any;
    deleteTodo: (id: number) => void;
    changeTask: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
    editTodo: (id: number, par: string) => any;
    keyUpChange: (id: number, e: React.KeyboardEvent<HTMLElement>) => void;
    checked: boolean;
    edit: boolean;
    taskTitle: string;
    id: number;
}

const Task: React.FC<TaskProps> = (props) => {
    return (
        <li>
            {!props.edit ? (
                <div>
                    <span
                        className="pos-rel"
                        onClick={() => props.editTodo(props.id, "edit")}
                    >
                        {props.taskTitle}
                    </span>
                    <input
                        className="pos-rel"
                        style={{ right: "2vh" }}
                        type="checkbox"
                        checked={props.checked}
                        onChange={() => {
                            props.editTodo(props.id, "checked");
                        }}
                    />
                    <button className="dlt-btn pos-rel edit-btn">+</button>
                    <button
                        style={{ right: "3vh" }}
                        className="dlt-btn pos-rel"
                        onClick={() => props.deleteTodo(props.id)}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        onBlur={() => props.editTodo(props.id, "edit")}
                        value={props.getValue(props.id)}
                        onChange={(e) => props.changeTask(props.id, e)}
                        onKeyUp={(e) => props.keyUpChange(props.id, e)}
                    />
                </div>
            )}
        </li>
    );
};

export default Task;
