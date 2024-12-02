import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";
import { updateAudioNode, removeAudioNode } from "./audio";

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [
    {
      id: "a",
      type: "osc",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
    },
    {
      id: "b",
      type: "amp",
      data: { gain: 0.5 },
      position: { x: -100, y: 250 },
    },
    { id: "c", type: "out", position: { x: 100, y: 500 } },
  ],
  edges: [],

  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
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
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  removeNodes(nodes) {
    for (const { id } of nodes) {
      removeAudioNode(id);
    }
  },
}));
