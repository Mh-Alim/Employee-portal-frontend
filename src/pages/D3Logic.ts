import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import { useAppSelector } from "@/app/hooks";
import { getEmailFromLocalStorage } from "@/utility";
import React, { useEffect, useState } from "react";

let usersId = [""];
const D3Logic = (data: any, setData: any) => {


  const mySelf = useAppSelector((state) => state.user);
  console.log("selfData: ", mySelf);

  // start main thing










  

  const getNeighboursDetails = async () => {
    let user_email = getEmailFromLocalStorage() || "";

    let output = await getManagerAndReporteeByEmail(user_email);
    if (!output || !user_email) return;
    console.log("output: ", output);

    const firstLevelData = {
      name: output.manager.first_name,
      attributes: {
        department: output.manager.designation,
        email: output.manager.user_email,
      },
      children: [
        {
          name: output.node.first_name,
          attributes: {
            department: output.node.designation,
            email: output.node.user_email,
          },
          children: output.reportee.map((child: any) => ({
            name: child.first_name,
            attributes: {
              department: child.designation,
              email: child.user_email,
            },
            children:[]
          })),
        },
      ],
    };
    setData(firstLevelData);
    return data;
  };





  useEffect(() => {
    // api call to setup first level and me

    console.log("mySelf", mySelf);
    usersId = [];
    getNeighboursDetails();

    // to restrict neightbours api call
    usersId.push(mySelf.email);
  }, [mySelf]);
};

export default D3Logic;
