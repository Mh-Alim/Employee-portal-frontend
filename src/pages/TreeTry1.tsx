import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  GoogleChartControlOptions,
  GoogleChartOptions,
} from "react-google-charts";
import { useAppSelector } from "../app/hooks";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "../utility";

const getNodeJsx = (id: string, name: string, designation: string) => {
  return `<div style=" background:"white"; color:"white" ; padding:15px; margin-bottom: 5px ;height:60px;border-radius:100%; display:flex; justify-content:center; align-item:center;flex-direction:column; " >
      <p style="display:none;"> ${id} </p>
      <p style="margin:10px; margin"  >${name}</p>
      <p style="margin:10px; margin"> ${designation} </p>
    </div>`;
};

// export const data = [
//   ["", "", ""],
//   [getNodeJsx("sparshId", "Sparsh"), "", "sparshId"],
//   [getNodeJsx("myId", "Alim"), getNodeJsx("sparshId", "Sparsh"), "myId"],
//   [
//     getNodeJsx("alimSubId1", "alimSub1"),
//     getNodeJsx("myId", "Alim"),
//     "alimSubId1",
//   ],
//   [
//     getNodeJsx("alimSubId2", "alimSub2"),
//     getNodeJsx("myId", "Alim"),
//     "alimSubId2",
//   ],
//   [
//     getNodeJsx("alimSubId3", "alimSub3"),
//     getNodeJsx("myId", "Alim"),
//     "alimSubId3",
//   ],
// ];

const options = {
  allowHtml: true,
  allowCollapse: true,
  nodeClass:
    "text-white bg-glassmorphism cursor-pointer font-work_sans min-w-[14rem]",

  selectedNodeClass: "red",
  size: "medium",
  compactRows: true,

  animation: {
    duration: 1000,
    easing: "out",
  },
  collapse: (e: any) => {
    console.log(e);
  },
};

// let usersId = ["myId"];

// this is the email of the user for which we dont have to do the api call  to get their neightbours data

let usersId = [""];

type ChildType = {
  user_email: string;
  first_name: string;
  designation: string;
};

const TreeTry1 = () => {
  const [dummyData, setDummyData] = useState<any>(["", "", ""]);

  const mySelf = useAppSelector((state) => state.user);

  // start main thing

  const getNeighboursDetails = async () => {
    let user_email = getEmailFromLocalStorage();
    let token = getTokenFromLocalStorage();
    if (!token || !user_email) {
      alert("Login to access this resource");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ user_email, requested_user_email: user_email }), // Convert data to JSON string
    };
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/getNeighbours`,
      options
    );
    const json = await res.json();
    const output = json.data;

    console.log("output: ", output);

    const childs = output.reportee.map((child: ChildType) => {
      return [
        getNodeJsx(child.user_email, child.first_name, child.designation),
        getNodeJsx(
          user_email ? user_email : "",
          mySelf.name,
          mySelf.designation
        ),
        child.user_email,
      ];
    });

    console.log("name: ", mySelf.name);
    const firstLevelData = [
      ["", "", ""],
      [
        getNodeJsx(
          output.manager.user_email,
          output.manager.first_name,
          output.manager.designation
        ),
        "",
        output.manager.user_email,
      ],
      [
        getNodeJsx(user_email, mySelf.name, mySelf.designation),
        getNodeJsx(
          output.manager.user_email,
          output.manager.first_name,
          output.manager.designation
        ),
        user_email,
      ],
      ...childs,
    ];
    console.log("firstLevelData: ", firstLevelData);
    setDummyData(firstLevelData);
  };

  useEffect(() => {
    // api call to setup first level and me

    console.log("mySelf", mySelf);
    usersId = [];
    getNeighboursDetails();

    // to restrict neightbours api call
    usersId.push(mySelf.email);
  }, [mySelf]);

  // end main thing

  const getNeighboursByEmail = async (id: string, row: number, prev: any) => {
    let token = getTokenFromLocalStorage();
    let user_email = id;
    let requested_user_email = getEmailFromLocalStorage();

    console.log(
      "getNeighboursBgEmail : ",
      token,
      user_email,
      requested_user_email
    );
    if (!user_email || !requested_user_email || !token) {
      alert("Login to access this resource");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ user_email, requested_user_email }), // Convert data to JSON string
    };
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/getNeighbours`,
      options
    );
    const json = await res.json();
    const moreData = json.data;

    console.log("more-data: ", user_email, moreData);

    // for parent

    const copyData = [...prev];

    const parentId = moreData.manager?.user_email;
    if (parentId && !usersId.includes(parentId)) {
      // sparsh
      console.log("copyData: ", copyData, typeof copyData);
      copyData.shift();
      row--;
      // here make the connection
      console.log("copyDataRow: ", copyData[row]);
      copyData[row][1] = getNodeJsx(
        parentId,
        moreData.manager.first_name,
        moreData.manager.designation
      );
      copyData.unshift([
        getNodeJsx(
          parentId,
          moreData.manager.first_name,
          moreData.manager.designation
        ),
        "",
        parentId,
      ]);
      copyData.unshift(["", "", ""]);
    }

    // for childs
    const childs = moreData.reportee.map((child: ChildType) => {
      if (usersId.includes(child.user_email)) return;
      return [
        getNodeJsx(child.user_email, child.first_name, child.designation),
        getNodeJsx(
          user_email ? user_email : "", // this is correct - node clicked kiya vo email
          moreData.node.first_name, // jis email pe click hua uska name
          moreData.node.designation //
        ),
        child.user_email,
      ];
    });

    const newChilds = [];
    for (let i = 0; i < childs.length; i++) {
      if (childs[i]) newChilds.push(childs[i]);
    }

    console.log("childs: ", newChilds);
    const final = [...copyData, ...newChilds];

    console.log("final: ", final);
    setDummyData(final);
    return final;
  };
  const getMoreData = async (id: string, row: number, prev: any) => {
    console.log("getMoreData: ", id, row, prev);
    if (usersId.includes(id)) {
      console.log("id Exists");
      return;
    } else usersId.push(id);
    console.log("User ids: ", usersId);
    console.log(id, typeof id, typeof usersId[0]);

    // make api call for extra data
    return await getNeighboursByEmail(id, row, prev);
  };

  return (
    <div className=" relative w-full h-[100vh] overflow-scroll no-scrollbar  ">
      <Chart
        chartType="OrgChart"
        data={dummyData}
        options={options}
        height={"100%"}
        className=" p-10 absolute left-10 top-10 no-scrollbar  "
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart: any = chartWrapper.getChart();

              google.visualization.events.addListener(
                chart,

                // after selection sending request
                "select",
                function () {
                  // console.log("data curr: ",dummyData)

                  setDummyData((prev: any) => {
                    const cprev = [...prev];
                    let selectedItem = 1;
                    if (chart.getSelection().length > 0)
                      selectedItem = chart.getSelection()[0].row + 1;
                    else return prev;

                    console.log(chart.getSelection());
                    const uniqueId = prev[selectedItem][2]; // email
                    console.log("selectedItem: ", selectedItem, uniqueId);
                    getMoreData(uniqueId, selectedItem, cprev);
                    return prev;
                  });
                }
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default TreeTry1;
