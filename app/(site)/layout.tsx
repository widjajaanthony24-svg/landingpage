import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/shared/command-menu";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CommandMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
