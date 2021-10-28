// Hash Wars
import DEV_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_dev.json";
import PROD_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_prod.json";

// Active Hash Wars
export const DEV_ACTIVE_HASH_WARS_ADDRESS = "0xe1b7E01906f886f3f37a4ba1e095E491d864FA80";
export const PROD_ACTIVE_HASH_WARS_ADDRESS = "0x45f4E1721d7cB6F571eFb774e85349271e00e88B";

// Finished Hash Wars
export const DEV_FINISHED_HASH_WARS_ADDRESS = "0xe1b7E01906f886f3f37a4ba1e095E491d864FA80";
export const PROD_FINISHED_HASH_WARS_ADDRESS = "0x45f4E1721d7cB6F571eFb774e85349271e00e88B";

export const DEV_FINISHED_HASH_WARS_ADDRESS_1 = "0x89c4189391266A20b6Bc957e6CE4A5285eF075bb";
export const PROD_FINISHED_HASH_WARS_ADDRESS_1 = "0x8d092C2fF0b0D97C87580955350A04Be4DF8E5c4";

export { DEV_ACTIVE_HASH_WARS_ABI, PROD_ACTIVE_HASH_WARS_ABI };

export const activeHashWars = {
  round: 2,
  dev: {
    address: DEV_ACTIVE_HASH_WARS_ADDRESS,
    abi: DEV_ACTIVE_HASH_WARS_ABI
  },
  prod: {
    address: PROD_ACTIVE_HASH_WARS_ADDRESS,
    abi: PROD_ACTIVE_HASH_WARS_ABI
  }
};

// need to change
export const finishedHashWars = [
  {
    round: 1,
    dev: {
      address: DEV_FINISHED_HASH_WARS_ADDRESS_1,
      abi: DEV_ACTIVE_HASH_WARS_ABI
    },
    prod: {
      address: PROD_FINISHED_HASH_WARS_ADDRESS_1,
      abi: PROD_ACTIVE_HASH_WARS_ABI
    }
  },
  {
    round: 2,
    dev: {
      address: DEV_FINISHED_HASH_WARS_ADDRESS,
      abi: DEV_ACTIVE_HASH_WARS_ABI
    },
    prod: {
      address: PROD_FINISHED_HASH_WARS_ADDRESS,
      abi: PROD_ACTIVE_HASH_WARS_ABI
    }
  }
];