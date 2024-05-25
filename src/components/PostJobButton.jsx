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

export default function PostJobButton({ profileInfo }) {
  const [formData, setFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo.companyName,
  });

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
  return (
    <div>
      <Dialog open={popUpState} onOpenChange={(v) => setPopUpState(v)}>
        <DialogTrigger>
          <Button>Post a Job</Button>
        </DialogTrigger>
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
