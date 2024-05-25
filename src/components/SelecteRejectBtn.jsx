"use client";

import { updateApplicationAction } from "@/actions";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const SelecteRejectBtn = ({ id, status }) => {
  const handleCandidateSelection = async (text) => {
    await updateApplicationAction(id, text, "/applications");
  };

  console.log(status);

  if (status === "Selected" || status === "Rejected") {
    return <Button disabled>{status}</Button>;
  }
  return (
    <div className="flex gap-2">
      <DialogClose asChild>
        <Button
          variant="outline"
          onClick={() => {
            handleCandidateSelection("Rejected");
          }}
        >
          Reject
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button
          onClick={() => {
            handleCandidateSelection("Selected");
          }}
        >
          Select
        </Button>
      </DialogClose>
    </div>
  );
};

export default SelecteRejectBtn;
