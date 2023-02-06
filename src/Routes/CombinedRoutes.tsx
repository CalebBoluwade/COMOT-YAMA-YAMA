import React from "react";
import { useServerStatusQuery } from "../Context/API/AUTH_API";
import { initData } from "../Context/Server";
import BottomTabs from "./BottomTabs";
import UserNav from "./UserOnboardingRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import Response from "../Components/Response";

const CombinedRoutes: Function = () => {
  const { data, isLoading } = useServerStatusQuery();
  const { isUserAuth, userData } = useSelector(
    (state: RootState) => state.UserData
  );
  const { status } = useSelector((state: RootState) => state.Server);

  const Dispatch = useDispatch();

  //   if (!isLoading) {
  //  Dispatch(initData({initData: data}));
  // }

  return (
    <>
      {isUserAuth ? (
        <>
          <BottomTabs />
          <Response />
        </>
      ) : (
        <>
          <UserNav />
          <Response />
        </>
      )}
    </>
  );
};

export default CombinedRoutes;
