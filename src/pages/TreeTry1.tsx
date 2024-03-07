import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  GoogleChartControlOptions,
  GoogleChartOptions,
} from "react-google-charts";

const getNodeJsx = (id: string, name: string) => {
  return `<div style=" background:"white"; color:"white" ; padding:15px; margin-bottom: 5px ;height:60px;border-radius:100%; display:flex; justify-content:center; align-item:center;flex-direction:column; " >
      <p style="display:none;"> ${id} </p>
      <p style="margin:10px; margin"  >${name}</p>
      <p style="margin:10px; margin"> ${"Senor Software Engineer"} </p>
    </div>`;
};

export const data = [
  ["", "", ""],
  [getNodeJsx("sparshId", "Sparsh"), "", "sparshId"],
  [getNodeJsx("myId", "Alim"), getNodeJsx("sparshId", "Sparsh"), "myId"],
  [
    getNodeJsx("alimSubId1", "alimSub1"),
    getNodeJsx("myId", "Alim"),
    "alimSubId1",
  ],
  [
    getNodeJsx("alimSubId2", "alimSub2"),
    getNodeJsx("myId", "Alim"),
    "alimSubId2",
  ],
  [
    getNodeJsx("alimSubId3", "alimSub3"),
    getNodeJsx("myId", "Alim"),
    "alimSubId3",
  ],
];

export const options = {
  allowHtml: true,
  allowCollapse: true,
  nodeClass:
    "text-white bg-glassmorphism cursor-pointer font-work_sans min-w-[14rem]",

  selectedNodeClass: "bg-red-300",
  size: "medium",
  compactRows: true,

  collapse: (e: any) => {
    console.log(e);
  },
};

let usersId = ["myId"];
const TreeTry1 = () => {
  const [dummyData, setDummyData] = useState<any>(data);
  const getMoreData = (id: string, row: number) => {
    // make api calls and get Data
    console.log(id);
    if (usersId.includes(id)) return;
    else usersId.push(id);

    console.log(id, typeof id, typeof usersId[0]);
    const moreData = {
      parent: {
        id: "3439834839834893",
        name: "Sachin",
      },
      childs: [
        { id: "unique1", name: "orjbcljzxhcz1" },
        { id: "unique2", name: "orsdbfldshbfsjdlfb2" },
        { id: "unique3", name: "odsbfjhsdfsdljbfsdr3" },
        { id: "unique4", name: "o,dsbfhsdbfsdr4" },
        { id: "unique5", name: "orbdsfhbdshfjbds5" },
        { id: "unique6", name: "bsf,sdfsdbsdb" },
        { id: "unique7", name: "nbsd,bsd" },
        { id: "unique8", name: "orbs,fdjbsdbfs,bf8" },
        { id: "unique9", name: "ojsbfsbfmsbfbsdbfsmr9" },
      ],
    };

    const copyData = [...dummyData];

    const parentId = moreData.parent.id;
    if (!usersId.includes(parentId)) {
      // sparsh
      console.log("copyData: ", copyData, typeof copyData);
      copyData.shift();
      row--;
      // here make the connection

      copyData[row][1] = getNodeJsx(parentId, moreData.parent.name);
      copyData.unshift([
        getNodeJsx(parentId, moreData.parent.name),
        "",
        parentId,
      ]);
      copyData.unshift(["", "", ""]);
      console.log(copyData);
    }

    for (let i = 0; i < moreData.childs.length; i++) {
      const child = moreData.childs[i];
      console.log("child : ", child);

      if (usersId.includes(child.id)) continue;
      copyData.push([
        getNodeJsx(child.id, child.name),
        copyData[1][0],
        child.id,
      ]);
    }

    console.log("final: ", copyData);
    setDummyData(copyData);
  };

  console.log(dummyData);
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
              // chart.container.addEventListener("click", (ev: any) =>
              //   console.log(ev.target)
              // );

              google.visualization.events.addListener(
                chart,
                "select",
                function () {
                  // alert('sel');
                  // this.blur;
                  const selectedItem = chart.getSelection()[0].row + 1;

                  // const id =

                  console.log(selectedItem);
                  const uniqueId = data[selectedItem][2];

                  getMoreData(uniqueId, selectedItem);
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
