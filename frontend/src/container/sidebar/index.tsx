import { useSelector } from "react-redux";
import NotLoginMessage from "../../component/notLogin";
import TopSideBar from "../topSideBar";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import SideBarNav from "../sideBarNav";
import MatchList from "../matchList";
import MessageSection from "../messageSection";
import { UIState } from "../../common/interface/redux/ui";
import { Routes } from "react-router-dom";
import { renderHelper } from "../../utils/renderHelper";
import { sideBarRoute } from "../../constants/route";
import { Suspense } from "react";
import LoadingAnimation from "../../component/loading";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const UIState = useSelector<RootState, UIState>((state) => state.UI);

  return (
    <div
      className={`flex flex-col lg:w-full lg:h-screen w-screen lg:max-w-sm bg-white`}
    >
      <TopSideBar isLogin={userState.isLogin} />
      <div
        className={`flex flex-auto flex-col  ${
          userState.isLogin ? "justify-start" : "justify-center"
        } flex-auto  py-3 text-center overflow-hidden lg:relative fixed inset-0  ${
          UIState.isSideBarOpen ? "" : "-translate-x-full"
        } duration-300 transition-all`}
      >
        {userState.isLogin ? (
          <>
            <div className="flex w-full h-10 px-5 mt-2 text-base">
              <SideBarNav
                isMatchOpen={UIState.isMatchOpen}
                isMessagesOpen={UIState.isMessagesOpen}
              />
            </div>
            <MatchList isOpenning={UIState.isMatchOpen} />
            <MessageSection isOpenning={UIState.isMessagesOpen} />
          </>
        ) : (
          <NotLoginMessage />
        )}
        <Suspense fallback={<LoadingAnimation isLoading={true} />}>
          <Routes>{renderHelper(sideBarRoute, false)}</Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default SideBar;
