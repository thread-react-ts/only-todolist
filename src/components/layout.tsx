import { FC, ReactNode } from "react";

import Header from "../components/header";
import Contain from "../components/contain";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col bg-gradient-to-r from-[#83a4d4] to-[#b6fbff] dark:from-[#141E30] dark:to-[#243B55]">
      <Header />
      <div className="h-full w-full py-3 px-3 flex flex-col items-center justify-center ">
        <Contain>{props.children}</Contain>
      </div>
    </div>
  );
};

export default Layout;
