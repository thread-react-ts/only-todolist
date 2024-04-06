import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

interface NoteItem {
    title: string;
    content: string;
}

function App() {
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

export default App;
