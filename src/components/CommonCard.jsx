"use client";

import { useState } from "react";
import JobIcon from "./Icon";
import { Button } from "./ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaRegCalendarAlt,
  FaFileAlt,
  FaTools,
} from "react-icons/fa";
import { createJobApplicationAction } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CommonCard({ job, role, applications, profileInfo }) {
  const router = useRouter();
  const [drawerState, setDrawerState] = useState(false);

  const handleApplyJob = () => {
    if (applications.length >= 2 && profileInfo?.isPremiumUser === false) {
      toast.error("Choose a premium plan to apply more than 2 jobs.");
      return false;
    } else if (
      applications.length >= 10 &&
      profileInfo?.memberShipType === "basic"
    ) {
      toast.error("Please upgrade your membership to apply more jobs.");
      return false;
    } else if (
      applications.length >= 100 &&
      profileInfo?.memberShipType === "teams"
    ) {
      toast.error("Please upgrade your membership to apply more jobs.");
      return false;
    }
    return true;
  };

  const clickHandler = async () => {
    if (!handleApplyJob()) return;
    const data = {
      jobID: job._id,
      candidateUserID: profileInfo?.userId,
      recruiterUserID: job.recruiterId,
      jobAppliedDate: new Date().toLocaleDateString(),
      status: ["Applied"],
      name: profileInfo?.candidateInfo.name,
      email: profileInfo?.email,
    };

    await createJobApplicationAction(data, "/jobs");
    setDrawerState(false);
  };

  const checkApplied = () => {
    return applications.some((app) => app.jobID === job._id);
  };

  const applicationsCount = applications.filter(
    (app) => app.jobID === job._id
  ).length;

  return (
    <>
      <div className="p-4 rounded-md shadow-sm tracking-tight bg-slate-50 border hover:bg-white flex flex-col gap-4 transition-all duration-500">
        <JobIcon />
        <p>{job.title}</p>
        <Button
          className="w-fit"
          onClick={
            role === "recruiter"
              ? () => {
                  router.push(`applications/${job._id}`);
                }
              : () => setDrawerState(true)
          }
        >
          {role === "candidate"
            ? "View Details"
            : ` ${applicationsCount} Applicants`}
        </Button>
      </div>
      <Drawer open={drawerState} onOpenChange={setDrawerState}>
        <DrawerContent className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between pb-5">
            <h1 className="text-4xl font-bold text-gray-800">{job.title}</h1>
            <Button
              onClick={checkApplied() ? () => {} : clickHandler}
              disabled={checkApplied()}
            >
              {checkApplied() ? "Applied" : "Apply"}
            </Button>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaBuilding className=" mr-3 mt-1" />
              <div>
                <strong>Company:</strong> {job.companyName}
              </div>
            </li>
            <li className="flex items-start">
              <FaMapMarkerAlt className=" mr-3 mt-1" />
              <div>
                <strong>Location:</strong> {job.location}
              </div>
            </li>
            <li className="flex items-start">
              <FaBriefcase className=" mr-3 mt-1" />
              <div>
                <strong>Type:</strong> {job.type}
              </div>
            </li>
            <li className="flex items-start">
              <FaRegCalendarAlt className=" mr-3 mt-1" />
              <div>
                <strong>Experience:</strong> {job.experience}
              </div>
            </li>
            <li className="flex items-start">
              <FaFileAlt className=" mr-3 mt-1" />
              <div>
                <strong>Description:</strong> {job.description}
              </div>
            </li>
            <li className="flex items-start">
              <FaTools className=" mr-3 mt-1" />
              <div>
                <strong>Skills:</strong> {job.skills}
              </div>
            </li>
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  );
}
