import { useEffect } from "react";
import notFound from "./th.png";
export const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <img
      src={notFound}
      alt="Not found"
      style={{ width: "100%", height: "auto" }}
    />
  );
};
