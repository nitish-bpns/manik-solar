"use client"; // Mark this as a client component

import { useEffect } from "react";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import BooleanProvider from "./provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?96252';

    const options = {
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#00e785",
        ctaText: "Chat with us",
        borderRadius: "25",
        marginLeft: "0",
        marginRight: "20",
        marginBottom: "20",
        ctaIconWATI: false,
        position: "right"
      },
      brandSetting: {
        brandName: "Wati",
        brandSubTitle: "undefined",
        brandImg: "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
        welcomeText: "Hi there!\nHow can I help you?",
        messageText: "Hello, %OA I have a question about ",
        backgroundColor: "#00e785",
        ctaText: "Chat with us",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "6397089597"
      }
    };

    script.onload = function () {
      CreateWhatsappChatWidget(options);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={inter.className}>
      <BooleanProvider>
        <Navbar />
        {children}
        <Footer />
      </BooleanProvider>
    </div>
  );
}
