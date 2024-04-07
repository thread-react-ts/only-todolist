import { FC, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";

interface NoteItem {
    title: string;
    content: string;
}

const Homepage: FC = () => {
    const [notes, setNotes] = useState<NoteItem[]>([]);

    function addNote(newNote: NoteItem) {
        setNotes(prevNotes => [...prevNotes, newNote]);
    }

    function deleteNote(id: number) {
        setNotes(prevNotes => prevNotes.filter((_, index) => index !== id));
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((item, index) => (
                <Note
                    key={index}
                    id={index}
                    title={item.title}
                    content={item.content}
                    onDelete={deleteNote}
                />
            ))}
            <Footer />
        </div>
    );
}

export default Homepage;