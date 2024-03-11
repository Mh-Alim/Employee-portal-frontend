import React, { useState } from "react";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import { useCenteredTree } from "../customHook/useCenteredTree";
import D3Logic from "./D3Logic";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import { MdAttachment } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

const containerStyles = {
  width: "100vw",
  height: "100vh",
};
const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.

export default function OrganizationTreeView() {
  const [data, setData] = useState<any>({});

  const [dimension, translate, containerRef] = useCenteredTree();
  D3Logic(data, setData);
  console.log("data for tree: ", data);

  const dfsChild = (copyData: any, output: any, email: string) => {
    if (copyData.attributes.email === email) {
      console.log("copyData: ", copyData);
      console.log("output: ", output);
      let emails = [""];
      let len = copyData.children.length;
      for (let i = 0; i < len; i++) {
        let child = copyData.children[i];
        emails.push(child.attributes.email);
      }
      emails.shift();
      console.log("emails: ", emails);

      const opLen = output.reportee.length;
      for (let i = 0; i < opLen; i++) {
        let reportee = output.reportee[i];
        if (!emails.includes(reportee.user_email)) {
          copyData.children.push({
            name: reportee.first_name,
            attributes: {
              department: reportee.designation,
              email: reportee.user_email,
            },
            children: [],
          });
        }
      }
      return;
    }

    let len = copyData.children.length;
    for (let i = 0; i < len; i++) {
      dfsChild(copyData.children[i], output, email);
    }
    return;
  };

  const dfsParent = (copyData: any, output: any, email: string) => {
    if (copyData.attributes.email === output.manager.user_email) {
      return true;
    }

    let len = copyData.children.length;
    for (let i = 0; i < len; i++) {
      if (dfsParent(copyData.children[i], output, email)) return true;
    }
    return false;
  };

  const parentHandler = async (email: any) => {
    console.log("parent handler calling ", email);

    let output = await getManagerAndReporteeByEmail(email);
    console.log("output in parenthandler: ", output);
    let copyData = { ...data };

    if (output.manager?.user_email && !dfsParent(data, output, email)) {
      copyData = {
        name: output.manager.first_name,
        attributes: {
          department: output.manager.designation,
          email: output.manager.user_email,
        },
        children: [{ ...data }],
      };
    }
    dfsChild(copyData, output, email);
    setData(copyData);
  };

  const renderRectSvgNode = ({
    nodeDatum,
    toggleNode,
  }: CustomNodeElementProps) => {
    console.log("nodeDatumn: ", nodeDatum);
    return (
      <g width="1000px">
        {/* <circle r="10" fill="blue" onClick={toggleNode} /> */}
        <foreignObject x="-200" y="-10" width="400px" height="300px">
          <div
            onClick={toggleNode}
            className=" flex relative gap-10  z-50 bg-slate-200 p-5 rounded-xl transition-all duration-500 overflow-y-scroll  "
          >
            <div className=" relative w-16 h-16 group  ">
              <img
                className="   relative z-0 rounded-full w-full h-full object-cover "
                src={img1}
              />
              <button
                onClick={() => {
                  parentHandler(nodeDatum?.attributes?.email);
                }}
                className=" flex justify-center items-center absolute top-0 left-0 w-full h-full bg-slate-200 opacity-0  transition-all duration-300 group-hover:opacity-100 z-10  text-xl rounded-full "
              >
                <CiCirclePlus className=" text-4xl " />
              </button>
            </div>

            <div>
              <p>{nodeDatum.name}</p>
              {nodeDatum.attributes && (
                <>
                  <p> Department: {nodeDatum.attributes?.department} </p>
                  <p> email : {nodeDatum.attributes?.email} </p>
                </>
              )}
            </div>
          </div>
        </foreignObject>

        <text fill="black" strokeWidth="1" x="30">
          <foreignObject x="-25" y="-10" width="200px" height="400px">
            <div className=" relative z-50 bg-slate-200 p-5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500  ">
              <p>{nodeDatum.name}</p>
              {nodeDatum.attributes && (
                <p> Department: {nodeDatum.attributes?.department} </p>
              )}
            </div>
          </foreignObject>
        </text>
      </g>
    );
  };

  return (
    <div
      className=" w-[10vw] bg-red-300   "
      style={containerStyles}
      ref={containerRef}
    >
      <Tree
        data={data}
        translate={translate}
        dimensions={dimension}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        nodeSize={{ x: 500, y: 300 }} // Adjust the nodeSize property here
        pathFunc={"step"}
      />
    </div>
  );
}
