import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router";
import { UIState } from "../../common/interface/redux/ui";
import { UserState } from "../../common/interface/redux/user";
import CropperBox from "../cropper";
import LoadingAnimation from "../../component/loading";
import Notification from "../../component/notification";
import SuccessModel from "../../component/successModel";
import { contentRoutes } from "../../constants/route";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { renderHelper } from "../../utils/renderHelper";
import SideBar from "../sidebar";
import * as socketIo from "socket.io-client";
import {
  NOTIFICATIONS_CONNECTION,
  NOTIFICATIONS_GET,
} from "../../constants/event";
import { SocketNotificationPayload } from "../../store/UI/interface";

const clientIo = socketIo.connect(
  `${process.env.REACT_APP_SERVER_URL}/notifications`,
  { path: "/socket.io" }
);

function App() {
  const onHandleGetData = (data: SocketNotificationPayload) => {
    store.dispatch(UIAction.setSocketNotification(data));
  };
  useEffect(() => {
    clientIo.emit(NOTIFICATIONS_CONNECTION);
    clientIo.on(NOTIFICATIONS_GET, onHandleGetData);
    return () => {
      clientIo.off(NOTIFICATIONS_GET);
    };
  }, []);
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const userState = useSelector<RootState, UserState>((state) => state.user);

  const onCloseSuccessModel = () => {
    store.dispatch(UIAction.onCloseSuccessModel());
  };
  const onCloseNotification = () => {
    store.dispatch(UIAction.onCloseNotification());
  };

  return (
    <>
      <div className="flex text-4xl ">
        {userState.isLogin && <SideBar />}
        <div className="justify-center flex-1 w-full h-screen bg-gray-50 align-center">
          <Suspense fallback={<LoadingAnimation isLoading={true} />}>
            <Routes>{renderHelper(contentRoutes, true)}</Routes>
          </Suspense>
        </div>
      </div>
      <Notification
        status={UIState.notification.status}
        isOpenning={UIState.notification.isOpenning}
        title={UIState.notification.title}
        message={UIState.notification.message}
        onCloseNotification={onCloseNotification}
      />
      <SuccessModel
        isOpenning={UIState.successModel.isOpenning}
        message={UIState.successModel.message}
        title={UIState.successModel.title}
        onCloseSuccessModel={onCloseSuccessModel}
      />
      <CropperBox />
      <LoadingAnimation isLoading={UIState.isLoading} />
    </>
  );
}

export default App;
