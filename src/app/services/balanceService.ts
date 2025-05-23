import { Horizon } from "@stellar/stellar-sdk";
import { chainConfig } from "@/app/config";
import { NetworkString } from "./userService";

export type BalanceService = {
  fetchNativeBalance: (
    account: string,
    network: NetworkString,
  ) => Promise<string | null>;
};

async function fetchNativeBalance(account: string, network: NetworkString) {
  const server = new Horizon.Server(chainConfig[network].horizonUrl);

  const res = await server.loadAccount(account);
  const found = res.balances.find((balance) => balance.asset_type === "native");
  return found?.balance ? found.balance : null;
}

export const balanceService: BalanceService = {
  fetchNativeBalance,
};
