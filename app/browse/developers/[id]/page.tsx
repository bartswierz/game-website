// "use client";
import React from "react";
// import { useSearchParams } from "next/navigation";
import { getDeveloperInfo } from "@/utils";
// type Props = {};

const DeveloperInfoPage = async ({ params }: { params: { id: string } }) => {
  console.log("params.id: ", params.id); // 405

  //TODO - make a function call to get data for developer with id of params.id

  const developerInfo = await getDeveloperInfo(params.id);
  console.log("inside DeveloperInfoPage: ", developerInfo);
  // const router = useSearchParams("id");
  // const { dev } = router.query;
  // const { name, age, id } = router.query;
  // const { id } = router.query;
  // console.log("name: ", name);
  // console.log("age: ", age);
  // console.log("id: ", id);
  return <div className="text-white">DEVELOPER INFO PAGE #2</div>;
};

export default DeveloperInfoPage;
