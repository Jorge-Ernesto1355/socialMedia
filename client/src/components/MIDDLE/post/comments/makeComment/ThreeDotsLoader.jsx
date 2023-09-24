import { ThreeDots } from "react-loader-spinner";

export const ThreeDotsLoader = () => {
  return (
    <ThreeDots
      height="20"
      width="20"
      radius="3"
      color="#9368FF"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};
