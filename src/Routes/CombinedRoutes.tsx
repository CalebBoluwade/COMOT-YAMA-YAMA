import React, {useEffect} from "react";
import { useServerStatusQuery } from "../Context/API/AUTH_API";
import { initData } from "../Context/Data/Server";
import BottomTabs from "./BottomTabs";
import UserNav from "./UserOnboardingRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import Response from "../Components/Response";
import * as Location from "expo-location";
import { Inactive } from "../Context/Data/Server";

const CombinedRoutes: Function = () => {
  const { data, isLoading, isError } = useServerStatusQuery();
  const { isUserAuth, userData } = useSelector(
    (state: RootState) => state.UserData
  );
  const { status } = useSelector((state: RootState) => state.Server);

  const Dispatch = useDispatch();

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Dispatch(
          Inactive({ message: "Permission to access location was denied" })
        );
      }
    }
    }, [])

  return (
    <>
      {isUserAuth ? (
        <>
          <Response />
          <BottomTabs />
        </>
      ) : (
        <>
          <Response />
          <UserNav />
        </>
      )}
    </>
  );
};

export default CombinedRoutes;
