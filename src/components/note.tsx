import { FC } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NoteItem } from "../utils/types/note";

interface NoteProps {
    note: NoteItem;
    onDelete: () => void;
    onClick: () => void;
}

const Note: FC<NoteProps> = ({ note, onDelete, onClick }) => {
    const { content, description } = note;
    const handleDelete = () => {
        onDelete();
    };

    return (
        <div className="note" onClick={onClick}>
            <h1>{content}</h1>
            <p>{description}</p>
            {(
                <button onClick={handleDelete}>
                    <DeleteOutlineIcon />
                </button>
            )}
        </div>
    );
};

export default Note;
