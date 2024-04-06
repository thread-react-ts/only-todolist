import React, { useState, ChangeEvent, FormEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

interface Note {
    title: string;
    content: string;
}

interface CreateAreaProps {
    onAdd: (note: Note) => void;
}

function CreateArea(props: CreateAreaProps) {
    const [isExpanded, setExpand] = useState(false);

    const [note, setNote] = useState<Note>({
        title: "",
        content: ""
    });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));
    }

    function submitNote() {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
    }

    function expand() {
        setExpand(true);
    }

    return (
        <div>
            <form className="create-note" onSubmit={e => e.preventDefault()}>
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    />
                )}
                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 2 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
