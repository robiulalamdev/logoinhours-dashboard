import { BASE_URL } from "../api/global";

const useViewImage = () => {
  const viewImg = (img) => {
    if (img instanceof File && img.type.startsWith("image/")) {
      return URL.createObjectURL(
        new Blob([img], { type: "application/octet-stream" })
      );
    } else {
      return `${BASE_URL}/uploads/${img}`;
    }
  };
  return { viewImg };
};

export default useViewImage;
