import { fetchAllJobsAction, fetchProfileAction } from "@/actions";
import CandidateFilter from "@/components/CandidateFilter";
import JobsListing from "@/components/JobsListingRecruiter";
import PostJobButton from "@/components/PostJobButton";
import { filterMenuDataArray } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function JobsPage({ searchParams }) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");
  const filterCategories = await fetchAllJobsAction();

  const filterMenus = filterMenuDataArray.map((item) => {
    const uniqueOptions = Array.from(
      new Set(filterCategories.map((listItem) => listItem[item.id]))
    );
    return {
      id: item.id,
      name: item.label,
      options: uniqueOptions.map((option) => ({
        label: option,
        checked: false,
      })),
    };
  });

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row justify-between border-b py-4">
        <h1 className="text-4xl font-bold">
          {profileInfo?.role === "candidate"
            ? "Explore all jobs"
            : "Jobs Dasboard"}
        </h1>
        {profileInfo?.role === "candidate" ? (
          <CandidateFilter filterMenus={filterMenus} />
        ) : (
          <PostJobButton profileInfo={profileInfo} />
        )}
      </div>
      <div>
        <JobsListing profileInfo={profileInfo} searchParams={searchParams} />
      </div>
    </>
  );
}
