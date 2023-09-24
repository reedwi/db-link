"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/ui/icons"
import { useEffect } from "react";

interface RecordCreateButtonProps extends ButtonProps {portalId: any, recordType: string}

export function RecordCreateButton({
  className,
  variant,
  portalId,
  recordType,
  ...props
}: RecordCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function onClick() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/${recordType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hubspot_portal_id: portalId
        }),
      })
      const record = await response.json()

      window.location.assign(`/dashboard/${recordType}/${record.id}`)
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Could not create a new record card. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <>
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New Card
    </button>
  </>
  )
}