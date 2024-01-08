"use client";

import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";

interface ClipboardBtnProps {
  text: string;
}

// User will click the button to copy the demo account email/password text for a better user experience
const ClipboardBtn = ({ text }: ClipboardBtnProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const iconStyles = "text-red-500 hover:cursor-pointer transition-all duration-300";

  const handleCopyClick = () => {
    // Icon change => TRUE = Checked Clipboard Icon, FALSE = Default Clipboard Icon
    setIsCopied(true);

    // Reset isCopied after a 2 second delay to the default clipboard.
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex justify-center items-center">
      <CopyToClipboard text={text} onCopy={(text, result) => handleCopyClick()}>
        {isCopied ? (
          <LuClipboardCheck size={26} color="green" className={iconStyles} />
        ) : (
          <LuClipboard size={26} color="green" className={iconStyles} />
        )}
      </CopyToClipboard>
    </div>
  );
};

export default ClipboardBtn;
