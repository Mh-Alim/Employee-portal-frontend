import React, { useState } from "react";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import { useCenteredTree } from "../customHook/useCenteredTree";
import D3Logic from "./D3Logic";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import { MdAttachment, MdEmail } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import "./Tree.css";
import { PiOfficeChairFill, PiTelegramLogoDuotone } from "react-icons/pi";
import { SiNamecheap } from "react-icons/si";
import { BsChevronExpand } from "react-icons/bs";
import { IoAddCircleOutline, IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.

let usersId: any[] = [];
export default function OrganizationTreeView() {
  const [data, setData] = useState<any>({});

  const [dimension, translate, containerRef] = useCenteredTree();

  const navigate = useNavigate();
  D3Logic(data, setData, usersId);
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
            className=" flex relative gap-10 text-slate-500 tracking-wide  z-50 bg-tree-glassmorphism p-5 rounded-xl transition-all duration-500 overflow-y-scroll  "
          >
            <div className=" relative w-16 h-16 group  ">
              <img
                className="   relative z-0 rounded-full w-full h-full object-cover "
                src={img1}
              />
            </div>

            <div>
              <p className=" absolute top-5 right-2  ">
                <IoAddCircleOutline
                  onClick={() => {
                    let email = nodeDatum?.attributes?.email;
                    if (usersId.includes(email)) return;
                    usersId.push(email);
                    parentHandler(nodeDatum?.attributes?.email);
                  }}
                  className=" text-2xl  mb-6 "
                />
                <PiTelegramLogoDuotone
                  onClick={() => {
                    navigate(`/user/search/${nodeDatum.attributes?.email}`);
                  }}
                  className=" text-xl   "
                />
              </p>
              <p className=" flex gap-4 items-center ">
                <span>
                  <SiNamecheap />
                </span>{" "}
                <span>
                  {nodeDatum?.name?.length > 21
                    ? `${nodeDatum?.name?.slice(0, 19)}...`
                    : nodeDatum?.name}
                </span>
              </p>
              {nodeDatum?.attributes && (
                <>
                  <p className="flex gap-4 items-center">
                    {" "}
                    <span>
                      <PiOfficeChairFill />
                    </span>
                    <span>
                      {nodeDatum.attributes?.department.toString().length > 21
                        ? `${nodeDatum.attributes?.department
                            .toString()
                            .slice(0, 19)}...`
                        : nodeDatum.attributes?.department}
                    </span>{" "}
                  </p>
                  <p className=" flex gap-4 items-center ">
                    {" "}
                    <span>
                      <MdEmail />
                    </span>{" "}
                    <span>
                      {nodeDatum.attributes?.email?.toString().length > 21
                        ? `${nodeDatum.attributes?.email
                            .toString()
                            .slice(0, 19)}...`
                        : nodeDatum.attributes?.email}
                    </span>{" "}
                  </p>
                </>
              )}
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className=" flex-1 h-[100vh]  " ref={containerRef}>
      <Tree
        data={data}
        translate={translate}
        // dimensions={dimension}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        nodeSize={{ x: 500, y: 300 }} // Adjust the nodeSize property here
        pathFunc={"step"}
        pathClassFunc={() => "tree-link"}
        collapsible
      />
    </div>
  );
}
