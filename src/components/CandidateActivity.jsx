import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const CandidateActivity = ({
  jobList,
  userApplications,
  uniqueStatusArray,
}) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
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
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
