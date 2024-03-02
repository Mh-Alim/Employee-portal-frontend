import React from "react";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import { useCenteredTree } from "../customHook/useCenteredTree";

const orgChartJson = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Workers",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Workers",
            },
          ],
        },
      ],
    },
    {
      name: "Manager",
      attributes: {
        department: "Marketing",
      },
      children: [
        {
          name: "Sales Officer",
          attributes: {
            department: "A",
          },
          children: [
            {
              name: "Salespeople",
            },
          ],
        },
        {
          name: "Sales Officer",
          attributes: {
            department: "B",
          },
          children: [
            {
              name: "Salespeople",
            },
          ],
        },
      ],
    },
  ],
};

const containerStyles = {
  width: "100vw",
  height: "100vh",
};
const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({
  nodeDatum,
  toggleNode,
}: CustomNodeElementProps) => (
  <g width="1000px">
    {/* <circle r="10" fill="blue" onClick={toggleNode} /> */}
    <foreignObject x="-25" y="-10" width="300px" height="400px">
      <div className=" relative flex gap-5 group ">
        <img
          className=" z-0 rounded-full w-10 h-10 object-cover "
          src={img1}
          onClick={toggleNode}
        />

        <div className=" relative z-50 bg-slate-200 p-5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500  ">
          <p>{nodeDatum.name}</p>
          {nodeDatum.attributes && (
            <p> Department: {nodeDatum.attributes?.department} </p>
          )}
        </div>
      </div>
    </foreignObject>

    <text fill="black" strokeWidth="1" x="30">
      <foreignObject x="-25" y="-10" width="300px" height="400px">
        <div className=" relative z-50 bg-slate-200 p-5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500  ">
          <p>{nodeDatum.name}</p>
          {nodeDatum.attributes && (
            <p> Department: {nodeDatum.attributes?.department} </p>
          )}
        </div>
      </foreignObject>
    </text>
    {/* <text fill="black" strokeWidth="1" x="30">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="30" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )} */}
  </g>
);

export default function OrganizationTreeView() {
  const [dimension, translate, containerRef] = useCenteredTree();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={orgChartJson}
        translate={translate}
        dimensions={dimension}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        nodeSize={{ x: 200, y: 200 }} // Adjust the nodeSize property here
      />
    </div>
  );
}
