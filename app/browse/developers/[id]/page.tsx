// "use client";
import React from "react";
// import { useSearchParams } from "next/navigation";
import { getDeveloperInfo } from "@/utils";
// type Props = {};

const DeveloperInfoPage = async ({ params }: { params: { id: string } }) => {
  const developerInfo = await getDeveloperInfo(params.id);

  return <div className="text-white">DEVELOPER INFO PAGE #2</div>;
};

export default DeveloperInfoPage;
