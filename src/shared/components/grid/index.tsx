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
    <table className="bg-amber-100 w-full border border-solid border-cyan-500">
      <thead>
        <tr>
          {props.columns.map((c) => (
            <th key={nanoid()}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => {
          return (
            <tr key={nanoid()}>
              {props.columns.map((c) => {
                if (c.field) {
                  const v = item[c.field as keyof T];
                  return <td key={nanoid()}>{v as string}</td>;
                }

                if (c.onClick) {
                  return (
                    <td key={nanoid()}>
                      <button
                        type="button"
                        className="py-1 px-3 border border-solid"
                        onClick={() => c.onClick?.(item)}
                      >
                        {c.buttonCaption}
                      </button>
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
