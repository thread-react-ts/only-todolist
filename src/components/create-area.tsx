import { useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

interface objSubmitType {
    id: number;
    content: string;
    description: string;
    priority: string;
}

interface CreateAreaProps {
    onAdd: (newNote: objSubmitType) => void;
}

function CreateArea(props: CreateAreaProps) {
    const [isExpanded, setExpand] = useState(false);
    const [note, setNote] = useState<objSubmitType>({
        id: 0,
        content: "",
        description: "",
        priority: "2"
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
            id: 0,
            content: "",
            description: "",
            priority: "2"
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
                        name="content"
                        onChange={handleChange}
                        value={note.content}
                        placeholder="Title"
                    />
                )}
                <textarea
                    name="description"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.description}
                    placeholder="Add content ..."
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
