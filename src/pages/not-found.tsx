import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonBackHome } from "../components/button";

const NotFound: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 Not Found</h1>
                <ButtonBackHome
                    label="Back to home"
                    onClick={() => navigate("/")}
                    className="task-detail-back-btn"
                />
        </div>
    );
}

export default NotFound;
