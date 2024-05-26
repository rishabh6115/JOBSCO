"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import JobIcon from "./Icon";
import { Button } from "./ui/button";

const CandidateActivity = ({
  jobList,
  userApplications,
  uniqueStatusArray,
}) => {
  const [selectedTab, setSelectedTab] = useState("Applied");

  const renderApplicationArray = () => {
    const arrayToReturn = [];
    const clonedUserApplication =
      selectedTab === "Applied"
        ? userApplications
        : userApplications.filter(
            (item) => item.status[item.status.length - 1] === selectedTab
          );

    for (const singleJob of jobList) {
      const jobApplication = clonedUserApplication.find(
        (item) => item.jobID === singleJob._id
      );
      if (jobApplication) {
        arrayToReturn.push({
          companyName: singleJob.companyName,
          title: singleJob.title,
          jobAppliedDate: jobApplication.jobAppliedDate,
        });
      }
    }
    return arrayToReturn;
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <div className="flex justify-between border-b pb-4 pt-24">
          <h1 className="text-4xl font-bold">Your Activity</h1>
          <TabsList>
            {uniqueStatusArray.map((status, i) => (
              <TabsTrigger key={i} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent
          value={selectedTab}
          className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 mt-6"
        >
          {renderApplicationArray().map((application, i) => (
            <div
              key={i}
              className="px-4 py-6 rounded-lg shadow-sm tracking-tight bg-slate-50 border hover:bg-white flex flex-col gap-2 transition-all duration-500"
            >
              <div className="flex justify-between items-center">
                <JobIcon />
                <h1>{application.jobAppliedDate}</h1>
              </div>

              <h2 className="text-2xl font-bold mt-2">
                {application.companyName}
              </h2>
              <p className="text-gray-500">{application.title}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
