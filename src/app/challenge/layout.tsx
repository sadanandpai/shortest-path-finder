import { NavBar } from "@/components/common/nav-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="body-wrapper">
      <NavBar />
      <div className="body-content">{children}</div>
    </div>
  );
}
