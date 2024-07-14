// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/navbar/page";
// import Footer from "@/components/footer/page";
// import BooleanProvider from "./provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Rays Experts",
//   description:
//     "We are a leading solar panel company dedicated to providing energy solutions specifically tailored for rural areas. Our mission is to bring clean, affordable, and accessible energy to villages and remote areas.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <BooleanProvider>
//           <Navbar />
//           {children}
//           <Footer />
//         </BooleanProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { metadata } from "./metadata";
import ClientLayout from "./ClientLayout";

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
