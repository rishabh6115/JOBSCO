import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { fetchCandidateInfoAction } from "@/actions";
import { Label } from "./ui/label";
import Link from "next/link";
import ViewResumePage from "./ViewResume";
import SelecteRejectBtn from "./SelecteRejectBtn";

const ProfileViewDialog = async ({ candidateUserID, id, status }) => {
  const profileInfo = await fetchCandidateInfoAction(candidateUserID);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Candidate Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Candidate Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Name</Label>
                <p>{profileInfo.candidateInfo.name}</p>
              </div>
              <div>
                <Label>Current Job Location</Label>
                <p>{profileInfo.candidateInfo.currentJobLocation}</p>
              </div>
              <div>
                <Label>Preferred Job Location</Label>
                <p>{profileInfo.candidateInfo.preferedJobLocation}</p>
              </div>
              <div>
                <Label>Current Salary</Label>
                <p>{profileInfo.candidateInfo.currentSalary}</p>
              </div>
              <div>
                <Label>Notice Period</Label>
                <p>{profileInfo.candidateInfo.noticePeriod} days</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Skills</Label>
                <p>{profileInfo.candidateInfo.skills} </p>
              </div>
              <div>
                <Label>Current Company</Label>
                <p>{profileInfo.candidateInfo.currentCompany}</p>
              </div>
              <div>
                <Label>Previous Companies</Label>
                <p>{profileInfo.candidateInfo.previousCompanies} </p>
              </div>
              <div>
                <Label>Total Experience</Label>
                <p>{profileInfo.candidateInfo.totalExperience}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>College</Label>
                <p>{profileInfo.candidateInfo.college} </p>
              </div>
              <div>
                <Label>College Location</Label>
                <p>{profileInfo.candidateInfo.collegeLocation} </p>
              </div>
              <div>
                <Label>Graduated Year</Label>
                <p>{profileInfo.candidateInfo.graduatedYear} </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Profiles</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>LinkedIn</Label>
                <p>{profileInfo.candidateInfo.linkedinProfile} </p>
              </div>
              <div>
                <Label>GitHub</Label>
                <p>{profileInfo.candidateInfo.githubProfile} </p>
              </div>
              <div>
                <ViewResumePage link={profileInfo.candidateInfo?.resume} />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <SelecteRejectBtn id={id} status={status} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileViewDialog;
