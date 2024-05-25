"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/jobs";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData, pathToRevalidate) {
  await connectToDB();
  const newUser = new Profile(formData);
  await newUser.save();
  revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function postJobAction(formData, pathToRevalidate) {
  await connectToDB();
  const newJob = new Job(formData);
  await newJob.save();
  revalidatePath(pathToRevalidate);
}

export async function fetchJobsForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchAllJobsAction() {
  await connectToDB();
  const result = await Job.find();
  return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(formData, pathToRevalidate) {
  await connectToDB();
  const newApplication = new Application(formData);
  await newApplication.save();
  revalidatePath(pathToRevalidate);
}

export async function fetchApplicationsForRecruiterAction(id) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: id });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchApplicationsForCandidateAction(id) {
  await connectToDB();
  const result = await Application.find({ candidateUserID: id });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchApplicationAction(id) {
  await connectToDB();
  const result = await Application.find({ jobID: id });
  return JSON.parse(JSON.stringify(result));
}

export async function updateApplicationAction(id, status, pathToRevalidate) {
  console.log(id, status, pathToRevalidate);
  await connectToDB();
  await Application.findByIdAndUpdate(id, { $push: { status } });
  revalidatePath(pathToRevalidate);
}

export async function fetchCandidateInfoAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}
