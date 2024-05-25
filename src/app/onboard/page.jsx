import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/Onboard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function OnBoardPage() {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);
  console.log(profileInfo);
  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else return <OnBoard />;
}

export default OnBoardPage;
