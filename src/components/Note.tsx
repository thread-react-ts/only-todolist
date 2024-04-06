import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Note {
    id: number,
    title: string;
    content: string;
    onDelete: (id: number) => void;
}

function Note(props:Note) {
    function handleClick() {
        props.onDelete(props.id)
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleClick}>
                <DeleteOutlineIcon />
            </button>
        </div>
    );
}

export default Note;