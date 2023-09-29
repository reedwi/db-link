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
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RecordFormValues, recordSchema } from "@/lib/validations/record-form";
import { dynamicFormSchema, rowSchema } from "@/lib/validations/card-builder-form";
import { useRouter } from "next/navigation";
import { DatabaseConnection } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";


interface RecordFormProps {
  initialData?: any; 
  id?: string;
  portalId?: any;
  connections: Array<DatabaseConnection>;
  onUpdate?: any
}


export const RecordForm: React.FC<RecordFormProps> = ({
  initialData,
  id,
  portalId,
  connections,
  onUpdate
}) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const recordForm = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: initialData
  });


  const onSubmit = async (values: z.infer<typeof recordSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          query: values.query,
          database_id: values.connectionId,
          hubspot_property: values.hubspotProperty,
        }),
      })
  
      if (response.status === 204) {
        router.refresh();
        // onUpdate(values);
        return toast({
          title: "Card was successfully updated",
          variant: "default",
        })
      }
      else {
        throw new Error("");
      }

    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Your card update was unsuccessful. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...recordForm}>
            <form onSubmit={recordForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={recordForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Easily recognizable card name" {...field || ""} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            <FormField
                control={recordForm.control}
                name="hubspotProperty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HubSpot Property Internal Name</FormLabel>
                    <FormControl>
                        <Input disabled={ loading } placeholder="Internal property name of ID property" {...field || ""} />
                    </FormControl>
                    <FormDescription>
                      This is the internal name of the HubSpot property you wish to include in your query. The value of
                      the record will be inserted in the where clause of your SQL query.
                    </FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={recordForm.control}
                name="connectionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Connection</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a configured database connection" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {connections.map((connection) => (
                          <SelectItem key={connection.id} value={connection.id || ""}>{connection.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={recordForm.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query</FormLabel>
                    <FormControl>
                      <Textarea disabled={ loading } placeholder={`Example: SELECT * FROM your_table WHERE column_name = '{{${recordForm.watch('hubspotProperty')}}}'`} {...field || ""} />
                    </FormControl>
                    <FormDescription>
                      This is the query that will be used to find the record/records for each individual HubSpot record. 
                      I.e. select * from public.addresses where email = {`'{{ hubspot_property }}'`}
                    </FormDescription>
                    <div className="pt-6 flex items-center justify-end w-full">
                      <Button 
                          type="button" 
                          onClick={() => {
                              const hubspotProperty = recordForm.getValues().hubspotProperty;
                              recordForm.setValue(
                                  'query', 
                                  field.value ? `${field.value} {{${hubspotProperty}}}` : `{{${hubspotProperty}}}`
                              );
                          }}
                          variant="outline"
                      >
                        Insert Property in Query
                      </Button>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <Separator />
              <div className="pt-6 flex items-center justify-center w-full">
                <Button disabled={loading } type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
  );
};