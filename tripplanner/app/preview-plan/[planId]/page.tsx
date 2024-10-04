"use client";

import { useParams } from 'next/navigation';
import PreviewPlan from '@/app/preview-plan/page'; // Adjust the path based on your structure

const PreviewPlanPage = () => {
  const params = useParams(); // Use useParams to get dynamic route params
  const { planId } = params;

  if (!planId) {
    return <div>Loading...</div>;
  }

  return <PreviewPlan planId={planId as string} />;
};

export default PreviewPlanPage;
