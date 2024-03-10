import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  GoogleChartControlOptions,
  GoogleChartOptions,
} from "react-google-charts";
import { useAppSelector } from "../app/hooks";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "../utility";
import "./Tree.css";
import {  getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
const getNodeJsx = (id: string, name: string, designation: string) => {
  return `<div class="each-node" >
      <div><img src="https://www.shutterstock.com/image-vector/young-man-anime-style-character-600nw-2313503433.jpg" ></div>
      <p style="display:none;"> ${id} </p>
      <p>${name}</p>
      <p> ${designation} </p>
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
  nodeClass: "tree-node",

  selectedNodeClass: "selected-tree-node",
  size: "medium",
  compactRows: true,

  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
  },
  vAxis: {minValue:0, maxValue:1000},
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
    let user_email = getEmailFromLocalStorage()||"";
    
    let output = await getManagerAndReporteeByEmail(user_email);
    if(!output || !user_email) return;
    console.log("output: ", output);

    const childs = output.reportee.map((child: ChildType) => {
      return [
        getNodeJsx(child.user_email, child.first_name, child.designation),
        getNodeJsx(
          user_email ? user_email : "",
          `${mySelf.firstName} ${mySelf.lastName}`,
          mySelf.designation
        ),
        child.user_email,
      ];
    });

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
        getNodeJsx(user_email, `${mySelf.firstName} ${mySelf.lastName}`, mySelf.designation),
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
    const moreData = await getManagerAndReporteeByEmail(id);
    const user_email = id;

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
