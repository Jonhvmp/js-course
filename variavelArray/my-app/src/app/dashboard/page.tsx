"use client";

import { useState } from "react";

export default function Dashboard() {
  const [tickets] = useState([
    { id: 1, client: "Jonh Alex", date: "2021-10-10", subject: "Necessito de ajuda para formatar o meu PC.", from: "Agent", status: "open" },
    { id: 2, client: "Jonh Alex", date: "2021-10-10", subject: "Necessito de ajuda para formatar o meu PC.", from: "Agent", status: "open" },
  ]);

  return (
    <div className="container mx-auto p-4 bg-black shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold">Tickets</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Ticket
        </button>
      </div>
      <div className="mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Client</th>
              <th className="text-left">Date</th>
              <th className="text-left">Subject</th>
              <th className="text-left">From</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.client}</td>
                <td>{ticket.date}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.from}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
