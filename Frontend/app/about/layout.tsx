import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        {children}
      </>
    );
  }