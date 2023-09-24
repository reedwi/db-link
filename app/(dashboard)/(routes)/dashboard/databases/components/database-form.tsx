"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { toast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatabaseConnectionFormValues, databaseConnectionSchema } from "@/lib/validations/database-connection";
import { databaseTypeOptions } from "@/lib/validations/database-connection";
import { useRouter } from "next/navigation";


interface DatabaseFormProps {
  initialData?: any; 
  create: boolean;
  id?: string;
  portalId?: any;
}


export const DatabaseForm: React.FC<DatabaseFormProps> = ({
  initialData,
  create,
  id,
  portalId
}) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<DatabaseConnectionFormValues>({
    resolver: zodResolver(databaseConnectionSchema),
    defaultValues: initialData
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const onSubmit = async (values: z.infer<typeof databaseConnectionSchema>) => {
    try {
      setIsLoading(true);
      if (create === true) {
        const response = await fetch(`/api/databases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            username: values.username,
            password: values.password,
            database_name: values.databaseName,
            port: values.port,
            host: values.host,
            type: values.type,
            hubspot_portal_id: portalId
          }),
        })
    
        const database = await response.json()
  
        window.location.assign(`/dashboard/databases/${database.id}`); //probably need to parse differently with supabase
      }
      else {
        const response = await fetch(`/api/databases/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            username: values.username,
            password: values.password,
            database_name: values.databaseName,
            port: values.port,
            host: values.host,
            type: values.type
          }),
        })
    
        if (response.status === 204) {
          router.refresh();
          return toast({
            title: "Database connection was successfully updated",
            variant: "default",
          })
        }
        else {
          throw new Error("");
        }
      }

    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your database connection action was unsuccessful. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connection Name</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Easily recognizable connection name" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Type</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a database type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {databaseTypeOptions.map((databaseType) => (
                          <SelectItem key={databaseType} value={databaseType}>{databaseType}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="databaseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Name</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Database Name" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="relative">
                      <div>
                      <Input disabled={ loading } placeholder="Password" type={isPasswordVisible ? "text" : "password"} {...field} />
                      <div 
                        onClick={togglePasswordVisibility} 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {isPasswordVisible ? (
                            <span>👁️‍🗨️</span> // Replace with your "visible" icon
                        ) : (
                            <span>👁️</span>  // Replace with your "hidden" icon
                        )}
                      </div>
                      </div>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Host" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Port" {...field} onChange={e => field.onChange(Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <div className="pt-6 flex items-center justify-center w-full">
                <Button disabled={loading } type="submit">{create ? "Create" : "Save"}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
  );
};