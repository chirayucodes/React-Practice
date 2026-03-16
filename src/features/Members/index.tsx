import { useEffect, useState } from "react";

interface memberItems {
  id: number;
  name: string;
  memberTypeID: number;
  typeName: string;
}

export default function MemberList() {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<memberItems[]>([]);

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
    <div className="min-h-screen bg-gray-100 p-8">
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Library members Details
          </h1>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gradient-to-r from-black to-indigo-600 bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4">name</th>
                  <th className="py-3 px-4">MemberType</th>
                </tr>
              </thead>

              <tbody>
                {member.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b hover:bg-gray-200 transition"
                  >
                    <td className="py-3 px-4 font-semibold">{member.name}</td>
                    <td className="py-3 px-4">{member.typeName}</td>
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
