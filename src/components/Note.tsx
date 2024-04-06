import React from "react";

interface Note {
    title: string;
    content: string;
}

function Note(props:Note) {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button>DELETE</button>
        </div>
    );
}

export default Note;