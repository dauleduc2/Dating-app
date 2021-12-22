import { FindingOptions } from "./../../common/interface/redux/user";
import { UserDataDTO } from "../../common/interface/dto/user";
import {
  CropperData,
  NotificationData,
  SuccessModel,
} from "../../common/interface/redux/ui";
import { ShowOptions } from "../../common/interface/entity/showOptions";
export const findingOptionsDefault: FindingOptions = {
  sexOption: "FEMALE",
  minAge: 18,
  maxAge: 20,
};
export const showOptionsDefault: ShowOptions = {
  showAge: true,
  showBio: true,
  showHobbies: false,
  showStudyAt: true,
};
export const userDataDefault: UserDataDTO = {
  id: "",
  address: "",
  avatar: "",
  bio: "",
  email: "",
  highlightImgs: [],
  hobbies: [
    // { id: "1", name: "game" },
    // { id: "2", name: "travel" },
    // { id: "3", name: "sleep" },
  ],
  matchList: [],
  phone: "",
  name: "",
  dateOfBirth: "",
  studyAt: "",
  findOptions: findingOptionsDefault,
  showOptions: showOptionsDefault,
  sex: "MALE",
  createDate: "",
};

export const successModelDefault: SuccessModel = {
  isOpenning: false,
  message: "",
  title: "",
};

export const notificationDefault: NotificationData = {
  status: "SUCCESS",
  title: "",
  message: "",
  isOpenning: false,
};

export const cropperDefault: CropperData = {
  imageUrl: "",
  croppedImage: "",
};
