export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
     
      {/* Page content */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
