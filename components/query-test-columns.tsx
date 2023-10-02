import { ColumnDef } from "@tanstack/react-table"

export type Data = {
  [key: string]: any
}

export type DynamicCol = {
  [key: string]: any
}

function generateColumns(data: Data): ColumnDef<DynamicCol>[] {
  const keys = Object.keys(data)
  console.log(keys)

  return keys.map((key) => ({
    accessorKey: key,
    header: key,
  }))
}

function getColumnNames(data: Data): string[] {
  const keys = Object.keys(data);

  return keys;
}


export { getColumnNames, generateColumns };
