"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/lib/utils";
import CommonForm from "./CommonForm";
import { postJobAction } from "@/actions";
import { toast } from "sonner";

export default function PostJobButton({ profileInfo, jobsPostedByRecruiter }) {
  const [formData, setFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo.companyName,
  });
  console.log(jobsPostedByRecruiter);

  const [popUpState, setPopUpState] = useState(false);

  const isBtnDisabled = Object.values(formData).some((value) => !value);
  const createJob = async () => {
    await postJobAction(
      {
        ...formData,
        recruiterId: profileInfo.userId,
        applicants: [],
      },
      "/jobs"
    );
    setFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo.recruiterInfo.companyName,
    });
    setPopUpState(false);
  };

  const handlePostJob = () => {
    if (
      jobsPostedByRecruiter.length >= 2 &&
      profileInfo?.isPremiumUser === false
    ) {
      toast.error("Choose a premium plan to post more than 2 jobs.");
      return;
    } else if (
      jobsPostedByRecruiter.length >= 10 &&
      profileInfo?.memberShipType === "basic"
    ) {
      toast.error("Please upgrade your membership to post more jobs.");
      return;
    } else if (
      jobsPostedByRecruiter.length >= 100 &&
      profileInfo?.memberShipType === "teams"
    ) {
      toast.error("Please upgrade your membership to post more jobs.");
      return;
    }
    setPopUpState(true);
  };

  return (
    <div>
      <Dialog open={popUpState} onOpenChange={(v) => setPopUpState(v)}>
        <Button onClick={handlePostJob}>Post a Job</Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Job</DialogTitle>
            <div className="grid gap-4 py-2">
              <CommonForm
                buttonText="Post Job"
                formData={formData}
                setFormData={setFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={isBtnDisabled}
                action={createJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
