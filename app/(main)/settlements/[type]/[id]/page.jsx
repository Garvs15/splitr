"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import SettlementForm from './components/settlement-form';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { BarLoader } from 'react-spinners';

const SettlementPage = () => {
    // Fetch the id and details
    const params = useParams();
    const router = useRouter();
    const { type, id } = params;

    const { data, isLoading } = useConvexQuery(
        api.settlements.getSettlementData,
        {
            entityType: type,
            entityId: id,
        }
    );

    if (isLoading) {
        return (
            <div className="container mx-auto py-12">
                <BarLoader width={"100%"} className='#36d7b7' />
            </div>
        );
    }

    // Function to handle after successful statement creation
    const handleSuccess = () => {
        // Redirect based on type
        if (type === "user") {
            router.push(`/person/${id}`);
        } else if (type === "group") {
            router.push(`/groups/${id}`);
        }
    };
 
    return (
    <div className='conatiner mx-auto py-6 max-w-lg'>
       <Button variant="outline"
       size="sm"
       className="mb-4"
       onClick={() => router.back()}
       >
        <ArrowLeft className='h-4 w-4 mr-2' />
        Back
       </Button>

       <div className="mb-6">
        <h1 className="text-5xl gradient-title">Record a Settlement</h1>
        <p className="text-muted-foreground mt-1">
            {type === "user" ? `Setting up with ${data?.counterpart?.name}`
            : `Setting up in ${data?.group?.name}`}
        </p>
       </div>

       <Card>
         <CardHeader>
            <div className="flex items-center gap-3">
                {type === "user" ? (
                 <Avatar className="h-10 w-10">
                  <AvatarImage src={data?.counterpart?.imageUrl} />
                  <AvatarFallback>
                    {data?.counterpart?.name?.charAt(0) || "?"}
                  </AvatarFallback>
                 </Avatar>   
                ) : (
                    <div className="bg-primary/10 p-2 rounded-md">
                        <Users className='h-6 w-6 text-primary' />
                    </div>
                )}
                <CardTitle>
                    {type === "user" ? data?.counterpart?.name : data?.group?.name}
                </CardTitle>
            </div>
         </CardHeader>
         <CardContent>
            <SettlementForm 
            entityType={type}
            entityData={data}
            onSuccess={handleSuccess}
            />
         </CardContent>
       </Card>
    </div>
  );
}

export default SettlementPage;