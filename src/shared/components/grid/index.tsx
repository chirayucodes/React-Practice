import { nanoid } from "nanoid";

interface Column<T> {
  field?: keyof T;
  header?: string;
  onClick?: (o: T) => void;
  buttonCaption?: string;
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
}
export function Grid<T>(props: GridProps<T>) {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* HEADER */}
      <thead className="bg-linear-to-r from-black to-indigo-600 text-white">
        <tr>
          {props.columns.map((c) => (
            <th key={nanoid()} className="py-3 px-4 text-left font-semibold">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {props.data.map((item) => {
          return (
            <tr
              key={nanoid()}
              className="border-b hover:bg-gray-100 transition"
            >
              {props.columns.map((c) => {
                // NORMAL FIELD
                if (c.field) {
                  const v = item[c.field as keyof T];

                  return (
                    <td key={nanoid()} className="py-3 px-4 text-gray-700">
                      {v as string}
                    </td>
                  );
                }

                // BUTTON COLUMN
                if (c.onClick) {
                  return (
                    <td key={nanoid()} className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => c.onClick?.(item)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
                      >
                        {c.buttonCaption}
                      </button>
                    </td>
                  );
                }

                return null;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
