import { FC, useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

import { UserType } from "../utils/types/user";
import { Input, TextArea } from "../components/input";
import Swal from "../utils/swal";
import Layout from "../components/layout";
import { ButtonBackHome } from "../components/button";
import { NoteItem } from "../utils/types/note";
import NotFound from "./not-found";

const Detailed: FC = () => {
    const [objectSubmit, setObjectSubmit] = useState<Partial<UserType>>({});
    const [data, setData] = useState<NoteItem>({
        id: "",
        content: "",
        description: "",
        priority: 0,
    });
    const [_, setLoading] = useState<boolean>(true);
    const [isUpdated, setIsUpdated] = useState<boolean>(true);
    const params = useParams();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    let tokenStr = "16a40729d3574ceb9a23362c95e59b5bb977c0c2";

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        const { detail: id } = params;
        axios
            .get(`tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            })
            .then((response) => {
                const { data } = response;
                document.title = `${data.title}`;
                setData(data);
            })
            .catch((error) => {
                alert(error.toString());
            })
            .finally(() => setLoading(false));
    }

    if (!data.id) {
        return <NotFound />;
    }

    function handleChange(value: string | File, key: keyof typeof objectSubmit) {
        let tmp: any = { ...objectSubmit };
        tmp[key] = value;
        setObjectSubmit(tmp);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { detail: id } = params;
        const formData: any = new FormData();
        let key: keyof typeof objectSubmit;
        for (key in objectSubmit) {
            formData.append(key, objectSubmit[key]);
        }
        axios
            .post(`tasks/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            })
            .then((response) => {
                const { message } = response.data;
                MySwal.fire({
                    title: "Success",
                    text: message,
                    icon: "success",
                    showCancelButton: false,
                });
                setObjectSubmit({});
                setIsUpdated(false);
            })
            .catch((error) => {
                const { data } = error.response;
                MySwal.fire({
                    title: "Failed",
                    text: data.message,
                    showCancelButton: false,
                    icon: "error",
                });
            })
            .finally(() => fetchData());
    }

    return (
        <Layout>
            <div className="task-detail-container">
                <div className="task-detail-title">Task Detail:</div>
                {isUpdated ? (
                    <form className="task-detail-form" onSubmit={(event) => handleSubmit(event)}>
                        <Input
                            placeholder="Your Todo"
                            defaultValue={data.content}
                            onChange={(event) =>
                                handleChange(event.target.value, "content")
                            }
                        />
                        <Input
                            placeholder="(Type 1 to mark as completed)"
                            onChange={(event) =>
                                handleChange(event.target.value, "priority")
                            }
                        />
                        <TextArea
                            placeholder="Your description here"
                            defaultValue={data.description}
                            onChange={(event) =>
                                handleChange(event.target.value, "description")
                            }
                        />
                        <div className="task-detail-buttons">
                            <button className="task-detail-submit-btn" type="submit">Submit</button>
                            <ButtonBackHome
                                label="Back to home"
                                onClick={() => navigate("/")}
                                className="task-detail-back-btn"
                            />
                        </div>
                    </form>
                ) : (
                    <div className="task-detail-info">
                        <p>id: {data.id}</p>
                        <p>content: {data.content}</p>
                        <p>description: {data.description}</p>
                        <p>priority: {data.priority}</p>
                        <ButtonBackHome
                            label="Back to home"
                            onClick={() => navigate("/")}
                            className="task-detail-back-btn"
                        />
                    </div>
                )}
            </div>
        </Layout>
    );    
};

export default Detailed;
