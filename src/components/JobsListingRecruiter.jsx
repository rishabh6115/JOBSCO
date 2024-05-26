import {
  fetchApplicationsForCandidateAction,
  fetchApplicationsForRecruiterAction,
  fetchJobsForCandidateWithFilter,
  fetchJobsForRecruiterAction,
} from "@/actions";
import CommonCard from "./CommonCard";

const JobsListingRecruiter = async ({ profileInfo, searchParams }) => {
  const jobs =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateWithFilter(searchParams)
      : await fetchJobsForRecruiterAction(profileInfo?.userId);

  const applications =
    profileInfo?.role === "candidate"
      ? await fetchApplicationsForCandidateAction(profileInfo?.userId)
      : await fetchApplicationsForRecruiterAction(profileInfo?.userId);
  return (
    <div className="grid lg:grid-cols-4 grid-col-2 gap-5 mt-5">
      {jobs?.map((job) => (
        <CommonCard
          key={job._id}
          job={job}
          role={profileInfo?.role}
          applications={applications}
          profileInfo={profileInfo}
        />
      ))}
    </div>
  );
};

export default JobsListingRecruiter;
