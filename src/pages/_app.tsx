import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrivyProvider } from "@privy-io/react-auth";
import { polygon } from "viem/chains";
import { ToastContainer } from "react-toastify";
import {SmartWalletsProvider} from '@privy-io/react-auth/smart-wallets';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PrivyProvider appId= "clxqfheu6023pves4ugflmfbr" // "cm1iwfwkb00rhj87yvz340teh" //
        config={{
          supportedChains: [polygon], 
          loginMethods: ["email", "google", "twitter", "discord", "apple"], // <-- Add your supported login methods here
          
        }}

      >
        <SmartWalletsProvider config={{
          paymasterContext: {
            "mode": "SPONSORED",
            "calculateGasLimits": true,
            "expiryDuration": 300, // duration (secs) for which the generate paymasterAndData will be valid. Default duration is 300 secs.
            "sponsorshipInfo": {
              "webhookData": {},
              "smartAccountInfo": {
                  "name": "BICONOMY",
                  "version": "2.0.0"
              }
            }
          }
        }}>
          <ToastContainer />
          <Component {...pageProps} />
        </SmartWalletsProvider>
        
      </PrivyProvider>
    </>
  );
}
