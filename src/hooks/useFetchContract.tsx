import { useAppState } from "@/data/storage";
import { fetchEndpoit } from "@/helpers/connectContract";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchContract = () => {
  const { data } = useQuery({
    queryKey: ["endpointRPC2"],
    queryFn: fetchEndpoit,
  });

  const { contract, provider, setProviderAndContract } = useAppState();

  useEffect(() => {
    if (!data || (contract && provider)) return;
    console.log(data.provider, data.contract);
    setProviderAndContract(data.provider, data.contract);
  });
};
