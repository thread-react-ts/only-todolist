import { FC, useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import Note from "../components/note";
import CreateArea from "../components/create-area";
import { Spinner } from "../components/loading";
import Swal from "sweetalert2";
import Popup from "../components/pop-up";
import { NoteItem } from "../utils/types/note";
import { UserType } from "../utils/types/user";

const Homepage: FC = () => {
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<NoteItem | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [objectSubmit, setObjectSubmit] = useState<Partial<UserType>>({});
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const tokenStr = "16a40729d3574ceb9a23362c95e59b5bb977c0c2";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
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
                console.error("Error fetching data:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to fetch data",
                    icon: "error",
                    showCancelButton: false,
                });
            })
            .finally(() => setLoading(false));
    };

    const addNote = (newNote: NoteItem) => {
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
                console.error("Error adding note:", error);
                Swal.fire({
                    title: "Failed",
                    text: "Failed to add note",
                    icon: "error",
                    showCancelButton: false,
                });
            })
            .finally(() => setLoading(false));
    };

    const deleteNote = (id: string) => {
        setLoading(true);
        setIsDeleted(true);
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
                console.error("Error deleting note:", error);
                Swal.fire({
                    title: "Failed",
                    text: "Failed to delete note",
                    icon: "error",
                    showCancelButton: false,
                });
            })
            .finally(() => setLoading(false));
    };

    const openPopup = (id: string) => {
        axios
            .get(`tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            })
            .then((response) => {
                const { data } = response;
                setPopupData(data);
                setShowPopup(true);
            })
            .catch((error) => {
                console.error("Error opening popup:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to open popup",
                    icon: "error",
                    showCancelButton: false,
                });
            });
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof typeof objectSubmit) {
        let tmp: any = { ...objectSubmit };
        tmp[key] = event.target.value;
        setObjectSubmit(tmp);
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {loading ? (
                <Spinner />
            ) : (
                notes.map((item, idx) => (
                    <div key={idx}>
                        <Note
                            note={item}
                            onDelete={() => {
                            deleteNote(item.id);
                            setIsDeleted(true);
                            }}
                            onClick={() => {
                            if (!isDeleted) {
                                openPopup(item.id);
                                }
                            }}
                        />
                    </div>
                ))
            )}
            {!isDeleted && showPopup && popupData && (
                <Popup 
                    isOpen={showPopup} 
                    onClose={() => setShowPopup(false)} 
                    data={popupData} 
                    onEdit={() => console.log("Edit clicked")} 
                />
            )}
            <Footer />
        </div>
    );
};

export default Homepage;
