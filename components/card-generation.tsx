import React, { useState, useEffect } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dynamicFormSchema } from "@/lib/validations/card-builder-form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type FormData = {
  rows: {
    label: string;
    columnName: string;
    type: string;
  }[];
};


type CardGenerationComponentProps = {
  columnMap: { [key: string]: { type: string; label: string } } | null;
  columnNames: string[] | null;
};

const CardGeneration: React.FC<CardGenerationComponentProps> = ({ columnMap, columnNames }) => {
  const [rows, setRows] = useState<any[]>([]); // This will store the rows to be displayed
  const [loading, setIsLoading] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(dynamicFormSchema),
  });
  const { register, handleSubmit, control, setValue } = methods;

  useEffect(() => {
    // If columnMap is not null, set the rows with its data
    if (columnMap) {
      const initialRows = Object.keys(columnMap).map((key) => ({
        columnName: key,
        ...columnMap[key],
      }));
      setRows(initialRows);
    }
  }, [columnMap]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Save data to the database
    console.log(data);
  };

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, {}]);
  };

  return (
    <Form {...methods}>
      {rows.map((row, index) => (
        <FormItem key={index}>
          <FormLabel>Row {index + 1}</FormLabel>
          <FormField
            control={control}
            name={`rows[${index}].columnName` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Column Name</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Select a column" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {columnNames?.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name={`rows[${index}].label` as any}
            control={control}
            defaultValue={row.label || ""}
            render={({ field }: { field: FieldValues }) => (
            <FormControl>
              <FormLabel>Label</FormLabel>
              <FormControl>
                  <Input disabled={ loading } placeholder="Label" {...field || ""} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormControl>
            )}
          />
          <FormField
            control={control}
            name={`rows[${index}].type` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["STRING", "STATUS", "NUMERIC", "CURRENCY", "DATE", "EMAIL"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </FormItem>
      ))}
      {rows.length < 10 && (
        <Button variant="secondary" onClick={handleAddRow}>Add</Button>
      )}
      <Button onClick={handleSubmit(onSubmit)}>Save</Button>
    </Form>
  );
};

export default CardGeneration;
