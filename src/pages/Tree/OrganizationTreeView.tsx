import React, { useEffect, useState } from "react";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import { useCenteredTree } from "../../customHook/useCenteredTree";
import D3Logic from "./D3Logic";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import { MdAttachment, MdEmail } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { PiOfficeChairFill, PiTelegramLogoDuotone } from "react-icons/pi";
import { SiNamecheap } from "react-icons/si";
import { BsChevronExpand } from "react-icons/bs";
import { IoAddCircleOutline, IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { parentHandler } from "./Dfs";
import { useRouteToLogin } from "@/customHook/useRouteToLogin";

const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.

let usersId: any[] = [];
export default function OrganizationTreeView() {
  useRouteToLogin();
  const [data, setData] = useState<any>({});

  const [dimension, translate, containerRef] = useCenteredTree();

  const navigate = useNavigate();
  D3Logic(data, setData, usersId);

  useEffect(() => {
    usersId = [];
    // console.log("use effect is running : inside org tree");
  }, []);

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
                src={nodeDatum?.attributes?.img_url.toString() || ""}
              />
            </div>

            <div>
              <p className=" absolute top-5 right-2  ">
                <IoAddCircleOutline
                  onClick={async () => {
                    let email = nodeDatum?.attributes?.email;
                    if (usersId.includes(email)) return;
                    usersId.push(email);
                    const copyData = await parentHandler(
                      nodeDatum?.attributes?.email,
                      data
                    );
                    setData(copyData);
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
