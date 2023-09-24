"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useEffect } from "react";

import { DatabaseModal } from "./modals/database-modal"

interface DatabaseCreateButtonProps extends ButtonProps {portalId: any}

export function DatabaseCreateButton({
  className,
  variant,
  portalId,
  ...props
}: DatabaseCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false); // New state to control modal visibility
  async function onClick() {
    setIsModalOpen(true);
  }
  // const isOpen = useDatabaseConnectionModal((state) => state.isOpen);

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);
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
      New db connection
    </button>
    {isModalOpen && <DatabaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} portalId={portalId}/>} {/* Conditionally render the modal based on state */}
  </>
  )
}