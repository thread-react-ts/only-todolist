import { FC } from 'react';
import { NoteItem } from "../utils/types/note";
import { ButtonEdit, ButtonClose } from './button';
import "../styles/index.css";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    data: NoteItem;
    onEdit: () => void;
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, data, onEdit }) => {
    console.log("Popup data:", data);
    const { content, description, priority } = data;
    const isCompleted = priority === 1 ? "completed" : "not completed";

    return (
        isOpen && (
            <div className="popup-overlay">
                <div className="popup-container">
                    <h2>Title: {content}</h2>
                    <p>Content: {description}</p>
                    <p>Priority: {isCompleted}</p>
                    <ButtonEdit label="Edit" onClick={onEdit} />
                    <ButtonClose label="Close" onClick={onClose} />
                </div>
            </div>
        )
    );
};

export default Popup;
