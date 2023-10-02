// import Sidebar from "../../components/Sidebar";

import Sidebar from "@/components/sidebar/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-sidebarbgColor h-full">
      <Sidebar />
      {children}
    </div>
  );
}
