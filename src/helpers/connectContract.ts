import { CONTRACT } from "@/config/constants";
import { ethers } from "ethers";
import CONTRACTABI from "../abi/contract.json"; // ABI

export const fetchEndpoit = () => {
  const provider = new ethers.JsonRpcProvider(
    "https://gateway.tenderly.co/public/sepolia	"
  );

  const contract = new ethers.Contract(CONTRACT, CONTRACTABI, provider);

  return { provider, contract };
};
