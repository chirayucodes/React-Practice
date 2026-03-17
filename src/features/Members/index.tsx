import { useEffect, useState } from "react";
import { Loader } from "shared/components/loader";

interface MemberItems {
  id: number;
  name: string;
  memberTypeID: number;
  typeName: string;
}

export default function MemberList() {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<MemberItems[]>([]);

  useEffect(() => {
    fetch("https://localhost:7215/api/members", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setMember(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Library Members
          </h1>

          <div className="w-full max-w-5xl overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-black to-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Member Type</th>
                </tr>
              </thead>

              <tbody>
                {member.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-4 font-medium">{m.name}</td>
                    <td className="py-3 px-4">{m.typeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}