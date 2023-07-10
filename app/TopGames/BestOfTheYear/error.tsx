import Link from "next/link";
import React from "react";

type Props = {};

const error = (props: Props) => {
  return <Link href="/">ERROR PAGE! Back to Home</Link>;
};

export default error;
