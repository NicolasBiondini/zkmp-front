import { USDC } from "@/config/constants";
import { ethers, JsonRpcProvider } from "ethers";

const contractAddress = USDC;

const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export async function getBalance(
  accountAddress: string | undefined,
  provider: JsonRpcProvider | null
) {
  if (provider === null || accountAddress === undefined) return;
  const contract = new ethers.Contract(contractAddress, abi, provider);
  try {
    const decimals = await contract.decimals();

    const balance = await contract.balanceOf(accountAddress);

    const formattedBalance = ethers.formatUnits(balance, decimals);

    return formattedBalance;
  } catch (error) {
    console.error("Error al obtener el balance:", error);
  }
}
