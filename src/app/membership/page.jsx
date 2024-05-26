import { fetchProfileAction } from "@/actions";
import JobIcon from "@/components/Icon";
import PricingButton from "@/components/PricingButton";
import { membershipPlans } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MembershipPage = async ({ searchParams }) => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");
  const isPremiumUser = profileInfo?.isPremiumUser;
  const premiumPlan = isPremiumUser && profileInfo?.memberShipType;

  const checkCondition = (plan) => {
    if (premiumPlan === "teams") {
      if (plan === "basic") return false;
    } else if (premiumPlan === "enterprise") {
      if (plan === "basic" || plan === "teams") return false;
    }
    return true;
  };

  return (
    <>
      <div className="mt-10 flex  gap-4 lg:flex-row items-baseline justify-between border-b py-4">
        <h1 className="font-bold text-4xl">
          {isPremiumUser ? " You are a premium user" : "Choose your best plan"}
        </h1>
        {isPremiumUser && (
          <h1 className="text-2xl font-bold">{premiumPlan?.toUpperCase()}</h1>
        )}
      </div>
      <div className="mt-5 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {membershipPlans.map((plan, i) => (
          <div
            key={i}
            className="px-6 py-10 rounded-lg shadow-sm tracking-tight bg-slate-50 border hover:bg-white flex flex-col  transition-all duration-500"
          >
            <div className="flex justify-between items-start">
              <JobIcon />
              <h1 className="font-bold text-2xl">{plan.heading}</h1>
            </div>

            <h2 className="text-2xl font-bold mt-2">₹ {plan.price} /yr</h2>
            <h2 className="text-gray-400 ">{plan.type}</h2>
            <h2 className="text-gray-800 font-semibold mt-4 text-lg ">
              {profileInfo?.role === "candidate"
                ? plan.candidateDescription
                : plan.recruiterDescription}
            </h2>
            {!premiumPlan ? (
              <PricingButton
                plan={plan}
                searchParams={searchParams}
                profileInfo={profileInfo}
                currentPlan={premiumPlan}
              />
            ) : (
              premiumPlan &&
              premiumPlan !== plan.type &&
              checkCondition(plan.type) && (
                <PricingButton
                  plan={plan}
                  searchParams={searchParams}
                  profileInfo={profileInfo}
                  currentPlan={premiumPlan}
                />
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MembershipPage;
