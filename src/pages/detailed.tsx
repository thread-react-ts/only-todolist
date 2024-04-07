import { FC, useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content"
import axios from "axios";

import { UserType } from "../utils/types/user";
import { Input, TextArea } from "../components/input";
import Swal from "../utils/swal";
import Layout from "../components/layout";
import { CardDetail } from "../components/card-detail"
import { Button, ButtonGreen } from "../components/button"


interface StateType {
    data: Partial<UserType>;
    loading:boolean;
    isUpdated:boolean;
    image: string;
    objectSubmit: Partial<UserType>;
}

interface DataNotPartial {
    id: string;
    title: string;
    content: string;
    priority: number;
}

const Detailed:FC = () => {
    const [objectSubmit, setObjectSubmit] = useState<Partial<UserType>>({});
    const [data, setData] = useState<DataNotPartial>({
        id: "",
        title: "",
        content: "",
        priority: 0,
    });
    const [_, setLoading] = useState<boolean>(true);
    const [isUpdated, setIsUpdated] = useState<boolean>(true);
    const params = useParams();
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    let tokenStr = "16a40729d3574ceb9a23362c95e59b5bb977c0c2";

    useEffect(() => {
        fetchData();
    },[]);

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

    function handleChange(value:string | File, key: keyof typeof objectSubmit) {
        let tmp: any = {...objectSubmit};
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
            .post(`task/${id}`, formData, {
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
            .finally(() => fetchData())
    }

    return (
        <Layout>
            <div className="w-[70%] h-[90%] md:h-[80%] ">
        <div className="flex flex-col gap-4 mb-7 w-full h-min">
          <p className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wider">
            Task Detail:
          </p>
          {isUpdated ? (
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="flex flex-col gap-3 w-full h-full">
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    placeholder="Your Todo"
                    id="input-content"
                    defaultValue={data.content}
                    onChange={(event) =>
                      handleChange(event.target.value, "content")
                    }
                  />
                  <Input
                    placeholder="(type 1 to make it completed, ignore if not yet done)"
                    id="input-content"
                    onChange={(event) =>
                      handleChange(event.target.value, "priority")
                    }
                  />
                </div>
                <TextArea
                  placeholder="your content here"
                  id="input-content"
                  defaultValue={data.content}
                  onChange={(event) =>
                    handleChange(event.target.value, "content")
                  }
                />
                <div className="flex gap-4">
                  <Button label="Submit" id="button-submit" type="submit" />
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center w-full ">
              <CardDetail
                id={data.id}
                title={data.title}
                content={data.content}
                priority={data.priority}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full gap-2">
          <ButtonGreen
            label="Back to home"
            id="nav-home"
            onClick={() => navigate("/")}
          />

          <Button
            label="Edit Task"
            id="button-edit"
            onClick={() => {
              setIsUpdated(!isUpdated);
            }}
          />
        </div>
      </div>
        </Layout>
        
    );
}

export default Detailed;