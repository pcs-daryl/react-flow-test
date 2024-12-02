import React from "react";
import { Handle } from "@xyflow/react";

import { shallow } from "zustand/shallow";
import { useStore } from "../store";

import { tw } from "twind";

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});

export default function Amp({ id, data }) {
  const { setGain } = useStore(selector(id), shallow);
  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <div>
        <p
          className={tw(
            "rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm"
          )}
        >
          Gain Node
        </p>

        <label className={tw("flex flex-col px-2 py-1")}>
          <p className={tw("text-xs font-bold mb-2")}>Gain</p>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            value={data.gain}
            onChange={setGain}
          />
          <p className={tw("text-right text-xs")}>{data.gain}</p>
        </label>
      </div>

      <Handle type="source" position="bottom" />
    </div>
  );
}
