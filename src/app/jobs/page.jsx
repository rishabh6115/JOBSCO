import { fetchProfileAction } from "@/actions";
import JobsListing from "@/components/JobsListingRecruiter";
import PostJobButton from "@/components/PostJobButton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function JobsPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");

  return (
    <>
      <div className="mt-10 flex justify-between border-b py-4">
        <h1 className="text-4xl font-bold">
          {profileInfo?.role === "candidate"
            ? "Explore all jobs"
            : "Jobs Dasboard"}
        </h1>
        {profileInfo?.role === "candidate" ? (
          <p>Filter</p>
        ) : (
          <PostJobButton profileInfo={profileInfo} />
        )}
      </div>
      <div>
        <JobsListing profileInfo={profileInfo} />
      </div>
    </>
  );
}
