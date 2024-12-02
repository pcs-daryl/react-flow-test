import React from "react";
import { ReactFlow, Panel, Background } from "@xyflow/react";
import { shallow } from "zustand/shallow";

import { useStore } from "./store";
import Osc from "./nodes/Osc";
import Amp from "./nodes/Amp";
import Out from "./nodes/Out";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes,
  createNode: store.createNode,
});

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

export default function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onNodesDelete={store.onNodesDelete}
      onConnect={store.addEdge}
    >
      <Panel position="top-right">
        <button onClick={() => store.createNode("osc")}>osc</button>
        <button onClick={() => store.createNode("amp")}>amp</button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
