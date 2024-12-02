import React from "react";
import { ReactFlow, Background } from "@xyflow/react";
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
      onConnect={store.addEdge}
    >
      <Background />
    </ReactFlow>
  );
}
