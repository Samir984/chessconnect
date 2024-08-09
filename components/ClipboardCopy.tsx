"use client";
import { FaRegCopy } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ClipboardCopy({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex gap-5 items-center bg-black p-4 rounded-lg">
      <input
        value={value}
        readOnly
        className="p-2 border border-gray-700 bg-gray-800 text-white rounded-md"
      />

      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <button
          className={`px-4 py-2 rounded-md transition-colors 
           bg-gray-600 text-gray-300
          `}
        >
          {copied ? (
            <div className="flex gap-2 items-center">
              <IoCheckmarkDoneOutline /> <span>Copied</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <FaRegCopy /> <span>copy</span>
            </div>
          )}
        </button>
      </CopyToClipboard>
    </div>
  );
}
