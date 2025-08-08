import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import React from 'react';
import { Card, CardContent } from './ui/card';

const SettlementsList = ({
  settlements,
  isGroupSettlement = false,
  userLookupMap,
}) => {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  console.log("settlements", settlements);

  if (!settlements || !settlements.length) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No settlements found
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up
  const getUserDetails = (userId) => {
    // Simplified fallback
    return {
      name: userId === currentUser?._id
      ? "You" 
      : userLookupMap[userId]?.name || "Other User",
    imageUrl: null,
    id: userId,
    };
  };

  return (
    <div className="flex flex-col gap-4">
      {settlements.map((settlement) => {
        const payer = getUserDetails(settlement.paidByUserId);
        const receiver = getUserDetails(settlement.rec)
      })}
    </div>
  )
}

export default SettlementsList;