"use client";

import { createClient } from "@supabase/supabase-js";
import { Button } from "./ui/button";

const supabaseUrl = "https://ftwbzusgatvyjbjacgpg.supabase.co";
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0d2J6dXNnYXR2eWpiamFjZ3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1Nzk3NDksImV4cCI6MjAzMjE1NTc0OX0.D7xbzXDMeUqeIKkYmaGzvosedmr8So0J4RlUswNbNFA"
);

const ViewResumePage = ({ link }) => {
  const handleResumePreview = async () => {
    const { data } = supabase.storage.from("job-board").getPublicUrl(link);
    if (data?.publicUrl) {
      window.open(data.publicUrl, "_blank");
    }
  };

  return <Button onClick={handleResumePreview}>View Resume</Button>;
};

export default ViewResumePage;
