"use client"

import { Icons } from "@/components/ui/icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DatabaseConnection } from "@/types"
import React, { useState } from "react";
interface DatabaseConnectionTestCardProps {
  database: DatabaseConnection;
}


export const DatabaseConnectionTestCard: React.FC<DatabaseConnectionTestCardProps> = ({
  database 
}) => {
  const [connectionStatus, setConnectionStatus] = useState<string | null>(() => {
    if (database.connection_status === 'valid') return "success";
    else if (database.connection_status === 'invalid') return "error";
    else return null;
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(() => {
    if (database.connection_status === 'invalid') return database.connection_message;
    else return null;
  });
  
  const handleTestConnection = async () => {
      try {
        console.log('here')
        const response = await fetch(`/api/databases/connection-test`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            database
          }),
          // cache: 'no-store'
        })
        const testResult = await response.json();
        if (testResult.success) {
            setConnectionStatus("success");
            setErrorMessage(null);
        } else {
            setConnectionStatus("error");
            setErrorMessage(testResult.message);
        }
      } catch (error) {
        console.log(error)
        setConnectionStatus("error");
        setErrorMessage("An unexpected error occurred.");
      }
  };
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>Validate Connection</CardTitle>
          <CardDescription>
            To continue the setup, please ensure your connection is valid. You will not be able to set up
            anything else with this connection until it is validated.
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button onClick={handleTestConnection}>Click to Validate</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-foreground">
          <div className="flex items-center">
            <b>Current Status:&nbsp;  </b> 
              {connectionStatus === null && (
                <>
                  Not Tested&nbsp;
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                </>
              )}
              {connectionStatus === 'success' && (
                <>
                  Valid&nbsp;
                  <Icons.check className="mr-2" style={{ color: 'green' }} />
                  
                </>
              )}
              {connectionStatus === 'error' && (
                <>
                  Invalid&nbsp;
                  <Icons.xcircle className="mr-2" style={{ color: 'red' }} />
                </>
              )}
          </div>
          {errorMessage && (
            <div className="flex items-center">
              <b>Error Message:&nbsp;</b>
              <div className="error-box">
                {errorMessage}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}