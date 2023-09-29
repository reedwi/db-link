"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ColumnDef
} from "@tanstack/react-table"
 

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
import { dynamicFormSchema, rowSchema } from "@/lib/validations/card-builder-form";
import { useRouter } from "next/navigation";
import { DatabaseConnection } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import generateColumns from "@/components/query-test-columns";
import { DynamicCol } from "@/components/query-test-columns";
import { DataTable } from "@/components/ui/data-table";
import CardGeneration from "./card-generation";


interface QueryTestDataTableProps {
  id?: string;
  record?: any;
}


export const testValueSchema = z.object({
  testValue: z.string().min(1),
});
export type TestQueryFormValues = z.infer<typeof testValueSchema>;

export const QueryTestDataTable: React.FC<QueryTestDataTableProps> = ({
  id,
  record
}) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<DynamicCol[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnDef<DynamicCol>[]>([]); 
  const recordForm = useForm<TestQueryFormValues>({
    resolver: zodResolver(testValueSchema)
  });

  const testValue = recordForm.watch("testValue");
  const replaceQueryPlaceholderWithValue = (query: string | undefined, value: string | undefined): string => {
    if (!query) return '';
    else if (testValue && testValue.trim().length > 0) {
      return query?.replace(/{{.*?}}/g, testValue);
    }
    return query;
  }
  


  const onSubmit = async (values: z.infer<typeof testValueSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyValue: values.testValue,
          query: record.query,
          connectionId: record.connectionId
        }),
      })
      
      if (response.status === 200) {
        const data = await response.json();
        let title;
        if (data.length > 0) {
          setTableData(data)
          const columns = generateColumns(data[0])
          setTableColumns(columns)
          title = "Query ran successfully, see results"
        } else {
          title = "Query ran successfully, but no data was found for this query."
        }
        router.refresh();
        return toast({
          title: title,
          variant: "default",
        })
      }
      else {
        throw new Error("");
      }

    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Query was unsuccessful. Please see message here and below",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...recordForm}>
            <form onSubmit={recordForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={recordForm.control}
                name="testValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Value</FormLabel>
                    <FormControl>
                        <Input disabled={ loading } placeholder="Test value for query" {...field || ""} />
                    </FormControl>
                    <FormMessage></FormMessage>
                    <FormDescription>
                      {replaceQueryPlaceholderWithValue(record.query, testValue)}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="pt-6 flex items-center justify-center w-full">
                <Button disabled={loading } type="submit">Test Query</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <DataTable data={tableData} columns={tableColumns}/>
      </div>
      <Separator />
      <CardGeneration columnMap={null} columnNames={["TEST", "TEST 1"]}/>
    </>
  );
};