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
  // console.log(columnNames)
  const methods = useForm<FormData>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      rows: []
    }
  });
  const { register, handleSubmit, control, setValue, reset } = methods;

  useEffect(() => {
    // If columnMap is not null, set the rows with its data
    if (columnMap) {
      const initialRows = Object.keys(columnMap).map((key) => ({
        columnName: key,
        ...columnMap[key],
      }));
      setRows(initialRows);
      reset({ rows: initialRows });
    }
  }, [columnMap, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Transform the data
    console.log(data)
    const transformedData = data.rows.reduce((acc, row) => {
      acc[row.columnName] = {
        type: row.type,
        label: row.label,
      };
      return acc;
    }, {} as { [key: string]: { type: string; label: string } });
  
    console.log(transformedData);
  
    // Save or process the transformed data further...
  };
  

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, {}]);
  };

  const derivedColumnNames = React.useMemo(() => {
    const mapKeys = columnMap ? Object.keys(columnMap) : [];
    const names = columnNames || [];
    return Array.from(new Set([...mapKeys, ...names])); // Remove duplicates and merge
  }, [columnMap, columnNames]);

  return (
    <Form {...methods}>
      {rows.map((row, index) => (
        <FormItem key={index}>
          <div className="flex items-center justify-between">
          <FormLabel>Row {index + 1}</FormLabel>
          </div>
          <div className="flex space-x-4 items-center">
          {/* Column Name Select */}
          <div className="flex-1">
          <FormField
            control={control}
            name={`rows[${index}].columnName` as any}
            render={({ field }) => (
              <>
                <FormLabel>Column Name</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Select a column" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {derivedColumnNames?.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage></FormMessage>
              </>
            )}
          />
          </div>

          {/* Label Input */}
          <div className="flex-1">
          <FormField
            name={`rows[${index}].label` as any}
            control={control}
            defaultValue={row.label || ""}
            render={({ field }: { field: FieldValues }) => (
              <>
                <FormLabel>Label</FormLabel>
                <Input disabled={loading} placeholder="Label" {...field} />
                <FormMessage></FormMessage>
              </>
            )}
          />
          </div>

          {/* Type Select */}
          <div className="flex-1">
          <FormField
            control={control}
            name={`rows[${index}].type` as any}
            render={({ field }) => (
              <>
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
              </>
            )}
          />
          </div>
          <div className="flex align-self-end">
          <Button
            variant="destructive"
            onClick={() => {
              setRows((prevRows) => prevRows.filter((_, idx) => idx !== index));
            }}
          >
            Remove
          </Button>
          </div>
          </div>
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