import {
  fetchAllJobsAction,
  fetchApplicationsForCandidateAction,
} from "@/actions";
import CandidateActivity from "@/components/CandidateActivity";
import { currentUser } from "@clerk/nextjs/server";

const ActivityPage = async () => {
  const user = await currentUser();
  const jobList = await fetchAllJobsAction();
  const userApplications = await fetchApplicationsForCandidateAction(user?.id);

  const uniqueStatusArray = [
    ...new Set(userApplications.map((item) => item.status).flat(1)),
  ];
  console.log(uniqueStatusArray);

  return (
    <div>
      <CandidateActivity
        jobList={jobList}
        userApplications={userApplications}
        uniqueStatusArray={uniqueStatusArray}
      />
    </div>
  );
};

export default ActivityPage;
