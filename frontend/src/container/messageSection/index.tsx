import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserState } from "../../common/interface/redux/user";
import AvatarCircle from "../../component/avatarCircle";
import { RootState } from "../../store";
import { getChatList } from "./action";
import { ChatBox } from "./interface";

interface MessageSectionProps {
  isOpenning: boolean;
}

const MessageSection: React.FunctionComponent<MessageSectionProps> = ({
  isOpenning,
}) => {
  const [messageList, setMessageList] = useState<ChatBox[]>([]);
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const callApiAndGetMessageList = async (): Promise<ChatBox[]> => {
    return await (
      await getChatList()
    ).data.data;
  };
  useEffect(() => {
    callApiAndGetMessageList().then((data) => {
      setMessageList([...data]);
      console.log([...data]);
    });

    return () => {};
  }, []);
  if (isOpenning)
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        {messageList.length > 0 &&
          messageList.map((messageBox) => {
            return (
              <NavLink
                to={`/messages/${messageBox.partner.id}`}
                key={messageBox.id}
                className={({ isActive }) =>
                  isActive
                    ? "flex px-5 py-4 cursor-pointer bg-gray-200 intro-y"
                    : "flex px-5 py-4 cursor-pointer hover:bg-gray-200 intro-y"
                }
              >
                <AvatarCircle
                  to={`/messages/${messageBox.partner.id}`}
                  url={`${process.env.REACT_APP_SERVER_URL}/${messageBox.partner.avatar}`}
                  className="w-14 h-14"
                />
                <div className="flex flex-col items-start ml-4">
                  <div className="text-lg font-bold tracking-wider ">
                    {messageBox.partner.name}
                  </div>
                  <div
                    className={`text-base text-gray-500 ${
                      messageBox.sender.id !== userState.data.id &&
                      messageBox.seen === false
                        ? "font-extrabold text-black"
                        : " "
                    }`}
                  >
                    {messageBox.sender.id === userState.data.id
                      ? "you: " + messageBox.content
                      : messageBox.content}
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div>
    );

  return <></>;
};

export default MessageSection;
