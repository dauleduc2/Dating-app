import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import Badge from "../../component/badge";
import DeviderWithText from "../../component/deviderWithText";
import InputOutline from "../../component/inputOutline";
import TextField from "../../component/textField";
import ToggleButton from "../../component/toggleButton";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { userAction } from "../../store/user";
import { parseDate } from "../../utils/dataHelper";
import HighlightImage from "../highlightImage";
import LogoutSection from "../logout";

interface MyProfileProps {}

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { showAge, showBio, showHobbies, showStudyAt } =
    userState.data.showOptions;

  const {
    name,
    address,
    phone,
    email,
    dateOfBirth,
    bio,
    hobbies,
    studyAt,
    highlightImgs,
    avatar,
  } = userState.data;
  const dateOfBirthString = parseDate(dateOfBirth);
  const onRemoveHobby = (hobby: string) => {
    console.log(`removing ${hobby}....`);
  };

  return (
    <div className="absolute top-0 bottom-0 z-10 flex flex-col flex-1 w-full pb-5 overflow-y-scroll bg-white moveInFromLeft">
      <div className="flex flex-col justify-start w-full ">
        <HighlightImage highlightImgs={highlightImgs} avatar={avatar} />
        <InputOutline
          label="Name"
          name="name"
          value={name}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "name",
                label: "Name",
                defaultValue: name,
              })
            )
          }
        />
        <InputOutline
          label="Address"
          name="address"
          value={address}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "address",
                label: "address",
                defaultValue: address,
              })
            )
          }
        />
        <InputOutline
          label="Study at"
          name="studyAt"
          value={studyAt}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "studyAt",
                label: "school/university",
                description:
                  "Update to let everyone know where you are studying",
                defaultValue: studyAt,
              })
            )
          }
        />
        <InputOutline
          label="Phone number"
          name="phone"
          value={phone}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "phone",
                label: "phone number",
                defaultValue: phone,
              })
            )
          }
        />
        <InputOutline
          label="Email"
          updatable={false}
          name="email"
          value={email}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "email",
                label: "email",
                defaultValue: email,
              })
            )
          }
        />
        <InputOutline
          label="Birthdate"
          name="birthdate"
          type="date"
          value={parseDate(dateOfBirthString)}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "dateOfBirth",
                label: "birthdate",
                defaultValue: dateOfBirthString,
                type: "date",
              })
            )
          }
        />
        <TextField
          editable={false}
          name="bio"
          label="Bio"
          defaultValue={bio}
          value={bio}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "bio",
                label: "bio",
                defaultValue: bio,
                type: "textarea",
                isTextArea: true,
              })
            )
          }
        />
        <div className="mt-5">
          <div className="flex flex-row justify-between px-2">
            <label
              htmlFor="hobbies"
              className="block text-base font-medium text-gray-500"
            >
              Hobbies
            </label>
          </div>
          <div className="flex mt-3 border-gray-300 focus-within:border-indigo-600">
            {hobbies.map((hobby) => {
              return (
                <Badge
                  value={hobby.name}
                  onRemove={() => onRemoveHobby(hobby.name)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <DeviderWithText label="Control you profile" />
      <div className="flex flex-col justify-start w-full text-base text-left">
        <div className="flex items-center justify-between px-3 mt-5">
          <div className="block font-medium text-black">Show age</div>
          <ToggleButton
            enabled={showAge}
            onToggle={() => {
              store.dispatch(userAction.toggleShowOptions("showAge"));
            }}
          />
        </div>
        <div className="flex items-center justify-between px-3 mt-5">
          <div className="block font-medium text-black">
            Show where you are studying
          </div>
          <ToggleButton
            enabled={showStudyAt}
            onToggle={() => {
              store.dispatch(userAction.toggleShowOptions("showStudyAt"));
            }}
          />
        </div>
        <div className="flex items-center justify-between px-3 mt-5">
          <div className="block font-medium text-black">Show your bio</div>
          <ToggleButton
            enabled={showBio}
            onToggle={() => {
              store.dispatch(userAction.toggleShowOptions("showBio"));
            }}
          />
        </div>
        <div className="flex items-center justify-between px-3 mt-5">
          <div className="block font-medium text-black">Show your hobbies</div>
          <ToggleButton
            enabled={showHobbies}
            onToggle={() => {
              store.dispatch(userAction.toggleShowOptions("showHobbies"));
            }}
          />
        </div>
        <LogoutSection />
      </div>
    </div>
  );
};

export default MyProfile;