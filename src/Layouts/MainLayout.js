import Sidebar from "@/components/shared/Sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="flex items-start justify-between">
      <Sidebar />
      <div className="flex-grow w-full h-screen bg-white overflow-y-auto">
        <div className="container">{children}</div>
      </div>
    </main>
  );
}
