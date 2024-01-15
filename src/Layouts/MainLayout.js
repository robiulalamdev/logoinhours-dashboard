import Sidebar from "@/components/shared/Sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="flex items-start justify-between w-full h-full max-h-screen">
      <Sidebar />
      <div className="flex-grow w-full h-screen max-h-screen bg-white overflow-y-auto">
        <div className="container h-full">{children}</div>
      </div>
    </main>
  );
}
