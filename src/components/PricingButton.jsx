"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  createPriceIdAction,
  createStripePaymentAction,
  updateProfileAction,
} from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PricingButton = ({ plan, searchParams, profileInfo, currentPlan }) => {
  const router = useRouter();

  const updateProfile = async () => {
    const plan = JSON.parse(sessionStorage.getItem("plan"));
    const updatedProfile = {
      ...profileInfo,
      memberShipType: plan?.type,
      memberShipStartDate: new Date().toLocaleString(),
      memberShipEndDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toLocaleString(),

      isPremiumUser: true,
    };
    await updateProfileAction(updatedProfile, "/membership");
    router.replace("/membership", undefined, { shallow: true });
    sessionStorage.removeItem("plan");
  };

  useEffect(() => {
    if (searchParams?.status === "success") updateProfile();
  }, [searchParams]);

  const handlePayment = async () => {
    sessionStorage.setItem("plan", JSON.stringify(plan));
    const stripe = await stripePromise;
    const priceId = await createPriceIdAction({
      amount: Number(plan?.price),
    });

    if (priceId) {
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: priceId?.id,
            quantity: 1,
          },
        ],
      });

      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }
  };
  return (
    <Button className="w-fit mt-4" onClick={() => handlePayment()}>
      {!currentPlan
        ? "Get Premium"
        : currentPlan && currentPlan !== plan && "Update Plan"}
    </Button>
  );
};

export default PricingButton;
