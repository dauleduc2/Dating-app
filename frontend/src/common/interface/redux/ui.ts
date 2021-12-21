export interface UpdatePopupData {
  isOpenning: boolean;
  name: string;
  description?: string;
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  isTextArea?: boolean;
  onConfirm?: () => any;
}
export interface SuccessModel {
  isOpenning: boolean;
  message: string;
  title: string;
}
export interface UIState {
  isMatchOpen: boolean;
  isMessagesOpen: boolean;
  updatePopup: UpdatePopupData;
  successModel: SuccessModel;
  notification: NotificationData;
}
export enum NotificationStatus {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}
export type NotificationStatusString = keyof typeof NotificationStatus;

export interface SuccessModelData {
  isOpenning: boolean;
  title: string;
  message: string;
}

export interface NotificationData {
  isOpenning: boolean;
  status: NotificationStatusString;
  title: string;
  message: string;
}