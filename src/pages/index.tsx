import React, { useState, useEffect } from "react";
import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import "react-toastify/dist/ReactToastify.css";
import { polygon } from "viem/chains";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { parseEther, parseUnits } from "viem";

export default function Home() {
  const [chainSelected, setChainSelected] = useState(0);
  const [smartWallet, setSmartWallet] = useState<ConnectedWallet | null>(null);
  const { login, logout, user } = usePrivy();
  const {client} = useSmartWallets();
  const { wallets } = useWallets();
  
  const chains = [
    {
      chainId: 137,
      name: "Polygon",
      providerUrl: "https://polygon.llamarpc.com",
      incrementCountContractAdd: "0xd9ea570eF1378D7B52887cE0342721E164062f5f",
      explorerUrl: "https://polygonscan.com/",
    },
  ];

  useEffect(() => {
    if (!wallets.length) {
      console.log("No Wallets Loaded");
      return;
    }

    const checkConnection = () => {
      const linkedSmartWallet: any = user?.linkedAccounts.find(
        (account) => account.type === "smart_wallet"
      );
      
      setSmartWallet(linkedSmartWallet);
    };

    console.log("Wallets", wallets[0]);
    checkConnection();
  }, [wallets, user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      {!user ? (
        <button
          className="w-[10rem] h-[3rem] bg-orange-300 text-black font-bold rounded-lg"
          onClick={login}
        >
          Privy Sign in
        </button>
      ) : (
        <>
          <span>Selected Network: {chains[chainSelected].name}</span>
          <span>Privy Account Address: {wallets[0]?.address}</span>
          <span>Smart Account Address: {smartWallet?.address}</span>
         
          <button
            className="w-[10rem] h-[3rem] bg-orange-300 text-black font-bold rounded-lg"
            onClick={async () => {
              await logout();
              wallets[0].disconnect();
              console.log("Logged Out", await wallets[0].isConnected());
            }}
          >
            Logout
          </button>

          <button
            className="w-[10rem] h-[3rem] bg-orange-300 text-black font-bold rounded-lg"
            onClick={async () => {

              if(client) {
                const txHash = await client.sendTransaction({
                  account: client.account,
                  chain: polygon,
                  to: '0xf5715961C550FC497832063a98eA34673ad7C816',
                  value: parseUnits('0.00001', 18), //ethers.parseUnits("1.0", 18)
                  // paymaster: true
                  // initCode: "0x"
                });
                console.log("txHash", txHash)
              }
            }}
          >
            Execute transaction
          </button>
        </>
      )}
    </main>
  );
}
