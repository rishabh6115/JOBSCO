"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "./CommonForm";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ftwbzusgatvyjbjacgpg.supabase.co";
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0d2J6dXNnYXR2eWpiamFjZ3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1Nzk3NDksImV4cCI6MjAzMjE1NTc0OX0.D7xbzXDMeUqeIKkYmaGzvosedmr8So0J4RlUswNbNFA"
);

export default function Onboard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [file, setFile] = useState(null);
  const { user } = useUser();
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleFileUploadToSupabase = async () => {
    console.log("inside");
    const { data, error } = await supabase.storage
      .from("job-board")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (error) {
      console.log(error);
    }
    if (data) {
      setCandidateFormData({ ...candidateFormData, resume: data.path });
    }
  };

  const validateRecruiterForm = () => {
    return Object.values(recruiterFormData).every((item) => item !== "");
  };
  const validateCandidateForm = () => {
    return Object.values(candidateFormData).every((item) => item !== "");
  };
  const formAction = async () => {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
          };
    console.log(data);
    await createProfileAction(data, "/onboard");
  };

  useEffect(() => {
    if (file) handleFileUploadToSupabase();
  }, [file]);

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value)}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24 ">
            <h1 className="text-4xl font-bold tracking-light text-gray-900 ">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard As Candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            isBtnDisabled={!validateCandidateForm()}
            handleFileChange={handleFileChange}
            action={formAction}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFormControls}
            buttonText={"Onboard As Recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!validateRecruiterForm()}
            action={formAction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
