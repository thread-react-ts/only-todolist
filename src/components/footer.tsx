import { FC } from "react";

const Footer:FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>Copyright ⓒ {currentYear}</p>
        </footer>
    );
}

export default Footer;