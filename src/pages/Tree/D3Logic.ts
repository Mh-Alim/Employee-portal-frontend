import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import { useAppSelector } from "@/app/hooks";
import { useStateLoad } from "@/customHook/useStateLoad";
import { getEmailFromLocalStorage } from "@/utility";
import React, { useEffect, useState } from "react";

const D3Logic = (data: any, setData: any, usersId: string[]) => {
  const mySelf = useAppSelector((state) => state.user);

  // to load the state while refreshing
  useStateLoad();

  const getNeighboursDetails = async () => {
    let user_email = getEmailFromLocalStorage() || "";

    let output = await getManagerAndReporteeByEmail(user_email);
    if (!output || !user_email) return;
    console.log("output: ", output);

    let firstLevelData: any;
    if (output.manager) {
      firstLevelData = {
        name: output.manager?.first_name,
        attributes: {
          department: output.manager?.designation,
          email: output.manager?.user_email,
          img_url: output?.manager?.profile_image_url,
        },
        children: [
          {
            name: output.node?.first_name,
            attributes: {
              department: output.node?.designation,
              email: output.node?.user_email,
              img_url: output?.node?.profile_image_url,
            },
            children: output.reportee.map((child: any) => ({
              name: child?.first_name,
              attributes: {
                department: child?.designation,
                email: child?.user_email,
                img_url: child.profile_image_url,
              },
              children: [],
            })),
          },
        ],
      };
    } else {
      firstLevelData = {
        name: output.node?.first_name,
        attributes: {
          department: output.node?.designation,
          email: output.node?.user_email,
          img_url: output?.node?.profile_image_url,
        },
        children: output.reportee.map((child: any) => ({
          name: child?.first_name,
          attributes: {
            department: child?.designation,
            email: child?.user_email,
            img_url: child.profile_image_url,
          },
          children: [],
        })),
      };
    }

    setData(firstLevelData);
    return data;
  };

  useEffect(() => {
    usersId = [];
    console.log("user id cleanijng in d3: ", usersId);
    getNeighboursDetails();
    usersId.push(mySelf?.email);
  }, []);

  // this is for state loading
};

export default D3Logic;
