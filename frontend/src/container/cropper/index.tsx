import { ScissorsIcon } from "@heroicons/react/solid";
import * as React from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import { UIState } from "../../common/interface/redux/ui";
import { UserState } from "../../common/interface/redux/user";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { updateAvatar, updateHighlightImg } from "./action";
import getCroppedImg from "./cropImage";
interface CropperProps {}

const CropperBox: React.FunctionComponent<CropperProps> = () => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [rotateImage, setRotateImage] = React.useState<number>(0);
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = (await getCroppedImg(
        UIState.cropper.imageUrl,
        croppedAreaPixels,
        rotateImage
      )) as any;
      let file = await fetch(croppedImage)
        .then((r) => r.blob())
        .then(
          (blobFile) => new File([blobFile], "image", { type: "image/png" })
        );
      if (!userState.data.avatar) {
        updateAvatar(file);
      } else {
        updateHighlightImg(file);
      }
      store.dispatch(UIAction.setCropImage(""));
      //remove previous blob image url
      URL.revokeObjectURL(UIState.cropper.imageUrl);
      store.dispatch(UIAction.setCroppedImage(croppedImage));
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotateImage, UIState.cropper.imageUrl]);

  const onRotateChange = (e: any) => {
    setRotateImage(e.target.valueAsNumber);
  };
  const onZoomChange = (e: any) => {
    setZoom(e.target.valueAsNumber);
  };
  if (UIState.cropper.imageUrl)
    return (
      <div className="absolute inset-0 z-40">
        <div className="absolute inset-0 bg-white bottom-20">
          <Cropper
            image={UIState.cropper.imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={5 / 7}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            rotation={rotateImage}
          />
        </div>
        <div className="absolute bottom-0  flex justify-center w-full bg-white items-center h-20">
          <div className="flex items-center justify-center mr-5">
            <div className="text-base font-semibold mr-3">Zoom</div>
            <input
              type="range"
              min="1"
              max="3"
              step={0.1}
              defaultValue={1}
              onChange={onZoomChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="text-base font-semibold mr-3">Rotate</div>
            <input
              type="range"
              min="0"
              max="360"
              defaultValue={0}
              onChange={onRotateChange}
            />
          </div>
          <button
            onClick={showCroppedImage}
            type="button"
            className="inline-flex ml-5 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crop and update
            <ScissorsIcon className="text-white w-5 h-5 ml-3" />
          </button>
        </div>
      </div>
    );

  return <></>;
};

export default CropperBox;
