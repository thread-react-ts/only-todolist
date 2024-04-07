import { FC, useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import Note from "../components/note";
import CreateArea from "../components/create-area";
import { Spinner } from "../components/loading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

interface NoteItem {
    id: number;
    content: string;
    description: string;
    priority: string;
}

const Homepage: FC = () => {
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const tokenStr = "16a40729d3574ceb9a23362c95e59b5bb977c0c2";

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        setLoading(true);
        axios
            .get("tasks", {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            })
            .then((response) => {
                const { data } = response;
                setNotes(data);
            })
            .catch((error) => {
                alert(error.toString());
            })
            .finally(() => setLoading(false));
    }

    function addNote(newNote: NoteItem) {
        setLoading(true);
        axios
            .post("tasks", newNote, {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            })
            .then((response) => {
                const { data, message } = response.data;
                Swal.fire({
                    title: "Success",
                    text: message,
                    icon: "success",
                    showCancelButton: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            })
            .catch((error) => {
                const { data } = error.response;
                Swal.fire({
                    title: "Failed",
                    text: data.message,
                    icon: "error",
                    showCancelButton: false,
                });
            })
            .finally(() => setLoading(false));
    }
    

    function deleteNote(id: number) {
        setLoading(true);
        axios
            .delete(`tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            })
            .then((response) => {
                const { message } = response.data;
                setNotes((prevNotes) =>
                    prevNotes.filter((note) => note.id !== id)
                );
                Swal.fire("Deleted!", message, "success");
            })
            .catch((error) => {
                const { data } = error.response;
                Swal.fire({
                    title: "Failed",
                    text: data.message,
                    icon: "error",
                    showCancelButton: false,
                });
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {loading ? (
                <Spinner />
            ) : (
                notes.map((item, idx) => (
                    <Link key={idx} to={`/detailed/${item.id}`}>
                        <Note
                            id={item.id}
                            title={item.content}
                            content={item.description}
                            onDelete={() => deleteNote(item.id)}
                        />
                    </Link>
                ))
            )}
            <Footer />
        </div>
    );
};

export default Homepage;
