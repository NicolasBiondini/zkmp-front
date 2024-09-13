import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import ConnectButton from "./components/ConnectButton";
import { useAppState } from "./data/storage";
import { getBalance } from "./helpers/getUSDCAmount";
import { useFetchContract } from "./hooks/useFetchContract";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT, USDC, USDPRICE } from "./config/constants";
import ABICONTRACT from "@/abi/contract.json";
import { Card, CardContent } from "@/components/ui/card";
import BuyModal from "@/components/BuyModal";

function App() {
  const [sellForm, setSellForm] = useState({ amount: "", cvu: "" });
  const [tx, setTx] = useState<`0x${string}` | undefined>();
  useFetchContract();
  const { provider } = useAppState();
  const { writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash: tx,
  });
  //isConnecting, isDisconnected
  const { address, isConnected } = useAccount();
  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(address, provider),
    enabled: !!address && !!provider, // Habilita la consulta solo si address y provider existen
    retry: 20, // Configura el número de reintentos en caso de fallo
  });
  const scrowList = useReadContracts({
    contracts: [
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [1],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [2],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [3],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [4],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [5],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [6],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [7],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [8],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [9],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [10],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [11],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [12],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [13],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [14],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [15],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [16],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [17],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [18],
      },
      {
        address: CONTRACT,
        abi: ABICONTRACT,
        functionName: "escrows",
        args: [19],
      },
    ],
  });

  const proof = [
    [
      "0x09862e9ac4a039d4f63ce3585399357a3a77e667439fbe79056f5f953e9938c8",
      "0x14521c34994d4d6ceed9b833a2b9c5321ac2c9840720af6441e9c4ba7ccc7f39",
    ],
    [
      [
        "0x27ba1b55242b61c7ae4b2deb1396a3560fdcaeacfc9e3ae6e574bd8a9b0f6756",
        "0x3030cc30102d1f39fdf967c11adbf3c6925c200ef6e575d015e3493bdda63578",
      ],
      [
        "0x0b3e95933d50f69174c133136b89ffc58b353ab8b6f212cd619ac123121d9b66",
        "0x21296dd37df24576b40694e661839d035b138bbea91bfcb6a1ba856305abd958",
      ],
    ],
    [
      "0x26ef123e5b6502ad950946ff999d228eaeb6dea5b8b89867c77a576128507caa",
      "0x0085afda6cfcf7bbb1aa993f45a4d730efed19dc7116df8cff9d0d7a3c3ebafa",
    ],
  ];

  const approvalScrow = async () => {
    const amountInWei = ethers.parseUnits(sellForm.amount.toString(), 6); // 18 es el número de decimales típico para un token ERC20, ajusta según corresponda

    writeContract(
      {
        abi: [
          {
            constant: false,
            inputs: [
              {
                name: "spender",
                type: "address",
              },
              {
                name: "amount",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                name: "",
                type: "bool",
              },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        address: USDC,
        functionName: "approve",
        args: [CONTRACT, amountInWei],
      },
      {
        onError: (e) => console.log("error: ", e),
        onSuccess: (data, variables, context) => {
          setTx(data);
          console.log("ok: ", data, variables, context);
        },
      }
    );
  };

  const createScrow = async () => {
    if (!address) return;
    try {
      // if (!contract) return console.log("No contract.");
      // // Convertir `amount` a formato compatible con el token (asegúrate de que sea en "wei")
      const amountInWei = ethers.parseUnits(sellForm.amount.toString(), 6); // 18 es el número de decimales típico para un token ERC20, ajusta según corresponda

      // // Llamar a la función del contrato
      // const tx = await contract.createEscrow(USDC, amountInWei, sellForm.cvu);

      // // Esperar a que la transacción se confirme
      // const receipt = await tx.wait();

      writeContract(
        {
          abi: ABICONTRACT,
          address: CONTRACT,
          functionName: "createEscrow",
          args: [USDC, amountInWei, sellForm.cvu],
        },
        {
          onError: (e) => console.log("error: ", e),
          onSuccess: (data, variables, context) => {
            setTx(undefined);
            console.log("ok: ", data, variables, context);
            alert("ESCROW CREATED! 🎉");
          },
        }
      );

      console.log("Transacción confirmada: ");
    } catch (error) {
      console.error("Error al crear el escrow: ", error);
    }
  };

  const sendProof = (id: number, amount: number) => {
    if (!address) return;
    try {
      // if (!contract) return console.log("No contract.");
      // // Convertir `amount` a formato compatible con el token (asegúrate de que sea en "wei")
      const amountInWei = ethers.parseUnits(amount.toString(), 6); // 18 es el número de decimales típico para un token ERC20, ajusta según corresponda

      // // Llamar a la función del contrato
      // const tx = await contract.createEscrow(USDC, amountInWei, sellForm.cvu);

      // // Esperar a que la transacción se confirme
      // const receipt = await tx.wait();

      writeContract(
        {
          abi: ABICONTRACT,
          address: CONTRACT,
          functionName: "withdraw",
          args: [id, amountInWei, proof[0], proof[1], proof[2]],
        },
        {
          onError: (e) => console.log("error: ", e),
          onSuccess: (data, variables, context) => {
            setTx(undefined);
            console.log("ok: ", data, variables, context);
            alert("Withdraw! 🎉");
          },
        }
      );

      console.log("Transacción confirmada: ");
    } catch (error) {
      console.error("Error al crear el escrow: ", error);
    }
  };

  return (
    <main className="w-full h-full min-h-screen justify-start items-center flex flex-col bg-background dark relative text-foreground">
      <nav className="flex w-full justify-between px-4 lg:px-0 max-w-[1024px] items-center sticky h-[90px]">
        <h1 className="font-bold text-xl text-foreground">✊ 10GO</h1>
        <div className="flex gap-2 items-center justify-center">
          {isConnected && (
            <div className="flex justify-center gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="86977684-12db-4850-8f30-233a7c267d11"
                viewBox="0 0 2000 2000"
                className="w-5 h-5"
              >
                <path
                  fill="#2775ca"
                  d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
                />
                <path
                  fill="#fff"
                  d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
                />
                <path
                  fill="#fff"
                  d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zm441.67-1300c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
                />
              </svg>
              {balance ? balance : "0"}
            </div>
          )}
          <ConnectButton />
        </div>
      </nav>
      <div className="flex w-full h-full max-w-[1024px] px-4 ">
        <Tabs defaultValue="buy" className="w-full h-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="buy">
              Buy
            </TabsTrigger>
            <TabsTrigger className="w-full" value="sell">
              Sell
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="flex flex-col gap-4 w-full h-full "
            value="buy"
          >
            <h1 className="text-2xl font-bold w-full mt-3">Buy USDC</h1>

            {scrowList.data?.map((escrow, index) => {
              const data = escrow.result as string[];
              if (Number(data[1].toString()) / 1000000 === 0) return;
              if (data[2] === "0x0000000000000000000000000000000000000000")
                return;
              return (
                <Card className="py-3" key={index + "escrowitem"}>
                  <CardContent className="flex pb-0 flex-col gap-1">
                    <div className="flex gap-1">
                      <p className="font-bold ">Account: </p>
                      <p className="truncate">{data[2]}</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-bold">CVU: </p>
                      <p>{data[3]}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-bold">Amount: </p>
                      <p>{Number(data[1].toString()) / 1000000}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="86977684-12db-4850-8f30-233a7c267d11"
                        viewBox="0 0 2000 2000"
                        className="w-4 h-4 mt-[0.5px]"
                      >
                        <path
                          fill="#2775ca"
                          d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
                        />
                        <path
                          fill="#fff"
                          d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
                        />
                        <path
                          fill="#fff"
                          d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zm441.67-1300c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
                        />
                      </svg>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-bold">Pesos: </p>
                      <p>
                        {(Number(data[1].toString()) / 1000000) * USDPRICE} ARS$
                      </p>
                    </div>
                    <BuyModal
                      sendProof={sendProof}
                      id={index + 1}
                      amount={Number(data[1].toString()) / 1000000}
                    >
                      <Button className="w-full" disabled={!address}>
                        Buy USCD!
                      </Button>
                    </BuyModal>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          <TabsContent
            value="sell"
            className="w-full h-full flex justify-center items-center flex-col gap-4 mt-4"
          >
            <h1 className="text-2xl font-bold w-full">Sell USDC</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!tx && !isConfirmed) {
                  approvalScrow();
                } else {
                  createScrow();
                }
              }}
              className="max-w-[300px] w-full lg:max-w-[600px] flex flex-col gap-3"
            >
              <Input
                type="number"
                placeholder="USD Amount"
                value={sellForm.amount}
                onChange={(e) =>
                  setSellForm((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <Input
                type="text"
                placeholder="CVU"
                value={sellForm.cvu}
                onChange={(e) =>
                  setSellForm((prev) => ({ ...prev, cvu: e.target.value }))
                }
              />
              <Button
                disabled={
                  !sellForm.cvu ||
                  !address ||
                  !sellForm.amount ||
                  !balance ||
                  balance < sellForm.amount
                }
                type="submit"
                className="w-full"
              >
                {!tx && !isConfirmed ? "Approve first" : "Create scrow!"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;
