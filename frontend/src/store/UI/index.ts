import { updateInfoPopupDefault } from "../defaultData/UI";
import {
  NotificationData,
  SuccessModelData,
  UIState,
  UpdatePopupData,
} from "../../common/interface/redux/ui";
import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction } from "../../common/interface/common/redux";
import { notificationDefault, successModelDefault } from "../defaultData/user";
const initialState: UIState = {
  isMatchOpen: true,
  isMessagesOpen: false,
  updatePopup: updateInfoPopupDefault,
  successModel: successModelDefault,
  notification: notificationDefault,
};

export const UI = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    resetState: () => {
      return { ...initialState };
    },
    openMatchUI: (state: UIState) => {
      return {
        ...state,
        isMatchOpen: true,
        isMessagesOpen: false,
      };
    },
    openMessagesUI: (state: UIState) => {
      return {
        ...state,
        isMatchOpen: false,
        isMessagesOpen: true,
      };
    },
    closeUpdatePopup: (state: UIState) => {
      return {
        ...state,
        updatePopup: updateInfoPopupDefault,
      };
    },
    setUpdatePopup: (
      state: UIState,
      { payload }: ReduxAction<UpdatePopupData>
    ) => {
      return {
        ...state,
        updatePopup: { ...payload },
      };
    },
    onCloseSuccessModel: (state: UIState) => {
      return {
        ...state,
        successModel: successModelDefault,
      };
    },
    setSuccessModel: (
      state: UIState,
      { payload }: ReduxAction<SuccessModelData>
    ) => {
      return {
        ...state,
        successModel: { ...payload },
      };
    },
    setNotification: (
      state: UIState,
      { payload }: ReduxAction<NotificationData>
    ) => {
      return {
        ...state,
        notification: { ...payload },
      };
    },
    onCloseNotification: (state: UIState) => {
      return {
        ...state,
        notification: notificationDefault,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const UIAction = { ...UI.actions };
export default UI.reducer;