"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/jobs";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

export async function fetchJobsForCandidateWithFilter(filterParams = {}) {
  let updatedParams = {};

  Object.keys(filterParams).forEach((key) => {
    updatedParams[key] = { $in: filterParams[key].split(",") };
  });
  await connectToDB();
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );
  return JSON.parse(JSON.stringify(result));
}

export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;

  const res = await Profile.findOneAndUpdate(
    {
      _id,
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );
  console.log(res, "res");
  revalidatePath(pathToRevalidate);
}

export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: { interval: "year" },
    product_data: {
      name: "Premium Membership",
    },
  });
  return {
    id: session?.id,
  };
}

export async function createStripePaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership?status=cancel`,
  });
  return {
    id: session?.id,
  };
}
