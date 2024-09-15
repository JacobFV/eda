import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-8 text-4xl font-bold">Welcome to EDA Web App</h1>
      <div className="space-x-4">
        <Link
          href="/schematic"
          className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md hover:bg-blue-600"
        >
          Open Schematic Editor
        </Link>
        <Link
          href="/pcb"
          className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-md hover:bg-green-600"
        >
          Open PCB Editor
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
