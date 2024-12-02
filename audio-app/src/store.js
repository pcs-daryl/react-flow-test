import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [
    {
      type: "osc",
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
    },
    {
      type: "amp",
      id: "b",
      data: { gain: 0.5 },
      position: { x: 10, y: 0 },
    },
    { id: "c", type: "out", position: { x: 20, y: 100 } },
  ],
  edges: [],

  isRunning: false,

  toggleAudio() {
    set({ isRunning: !get().isRunning });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
}));
