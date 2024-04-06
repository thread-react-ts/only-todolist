import React, { useState, ChangeEvent, FormEvent } from "react";

interface Note {
    title: string;
    content: string;
}

interface CreateAreaProps {
    onAdd: (note: Note) => void;
}

function CreateArea(props: CreateAreaProps) {
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

    function submitNote(event: FormEvent<HTMLFormElement>) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={submitNote}>
                <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={2}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
