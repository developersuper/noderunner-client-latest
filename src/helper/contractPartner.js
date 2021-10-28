import * as Contract from "./contract";

// MEME NFT
import MEME_ABI from "./jsonPartner/MEME_abi.json";

// DOKI NFT
import DOKI_ABI from "./jsonPartner/DOKI_abi.json";

// ETH-MEN NFT
import ETH_MEN_ABI from "./jsonPartner/ETH_MEN_abi.json";

// ERC721 (MUSE)
import MUSE_ABI from "./jsonPartner/MUSE_NFT_abi.json";

// Meme Staking abi
import DEV_MEME_STAKING_ABI from "./json/MEMEStaking_abi_dev.json";
import PROD_MEME_STAKING_ABI from "./json/MEMEStaking_abi_prod.json";

// Doki Staking abi
import DEV_DOKI_STAKING_ABI from "./jsonPartner/DOKI_NFT_Staking_abi.json";
import PROD_DOKI_STAKING_ABI from "./jsonPartner/DOKI_NFT_Staking_abi.json";

// ETH-MEN Staking abi
import DEV_ETH_MEN_STAKING_ABI from "./jsonPartner/ETH_MEN_Staking_abi.json";
import PROD_ETH_MEN_STAKING_ABI from "./jsonPartner/ETH_MEN_Staking_abi.json";

// ERC721 Staking abi (MUSE)
import DEV_MUSE_STAKING_ABI from "./jsonPartner/MUSE_NFT_Staking_abi.json";
import PROD_MUSE_STAKING_ABI from "./jsonPartner/MUSE_NFT_Staking_abi.json";

// MEME Staking
export const DEV_MEME_STAKING_ADDRESS = "0x177e145cE88FE047C3B6A57C59a19103257e7912";
export const PROD_MEME_STAKING_ADDRESS = "0x28f99f6242fe892a7a611c768c0007e5f3a496be";
export { DEV_MEME_STAKING_ABI, PROD_MEME_STAKING_ABI };

export const MEME_NFT_ADDRESS = "0xe4605d46fd0b3f8329d936a8b258d69276cba264";

// Doki Staking
export const DEV_DOKI_STAKING_ADDRESS = "0x177e145cE88FE047C3B6A57C59a19103257e7912";
export const PROD_DOKI_STAKING_ADDRESS = "0x69b35e0072dC5A9e7F868d8f98012cA19FA6b3fd";
export { DEV_DOKI_STAKING_ABI, PROD_DOKI_STAKING_ABI };

export const DOKI_NFT_ADDRESS = "0x7CdC0421469398e0F3aA8890693d86c840Ac8931";

// Eth-Men Staking
export const DEV_ETH_MEN_STAKING_ADDRESS = "0x177e145cE88FE047C3B6A57C59a19103257e7912";
export const PROD_ETH_MEN_STAKING_ADDRESS = "0x8edC7cDCe7356f1Fc9F498B1Fa4A4b3C946E85C1";

export const ETH_MEN_NFT_ADDRESS = "0x33b83B6D3179dCb4094c685C2418cab06372eD89";

// ERC721 Staking (MUSE)
export const DEV_MUSE_STAKING_ADDRESS = "0x6248EDa17d6c2fCDc1d15783f2e2c592F5b92064";
export const PROD_MUSE_STAKING_ADDRESS = "0xBd0E5ee54DBC97181E474d0206e472f1935d6bCd";

export const DEV_MUSE_ADDRESS = "0x3a204786B22d079b68060865Fc1cFca1e4A4EBE0";
export const PROD_MUSE_ADDRESS = "0xbcd4F1EcFf4318e7A0c791C7728f3830Db506C71";

// For dev: Test with nft
export const partnerNFTs = {
  MEME: {
    title: "MEME",
    dev: {
      token: Contract.DEV_NFT_ADDRESS,
      tokenAbi: Contract.DEV_NFT_ABI,
      staking: DEV_MEME_STAKING_ADDRESS,
      stakingAbi: DEV_MEME_STAKING_ABI
    },
    prod: {
      token: MEME_NFT_ADDRESS,
      tokenAbi: MEME_ABI,
      staking: PROD_MEME_STAKING_ADDRESS,
      stakingAbi: PROD_MEME_STAKING_ABI
    },
  },
  DOKI: {
    title: "DOKI",
    dev: {
      token: Contract.DEV_NFT_ADDRESS,
      tokenAbi: Contract.DEV_NFT_ABI,
      staking: DEV_DOKI_STAKING_ADDRESS,
      stakingAbi: DEV_DOKI_STAKING_ABI
    },
    prod: {
      token: DOKI_NFT_ADDRESS,
      tokenAbi: DOKI_ABI,
      staking: PROD_DOKI_STAKING_ADDRESS,
      stakingAbi: PROD_DOKI_STAKING_ABI
    },
  },
  ETH_MEN: {
    title: "ETH-MEN",
    dev: {
      token: Contract.DEV_NFT_ADDRESS,
      tokenAbi: Contract.DEV_NFT_ABI,
      staking: DEV_ETH_MEN_STAKING_ADDRESS,
      stakingAbi: DEV_ETH_MEN_STAKING_ABI
    },
    prod: {
      token: ETH_MEN_NFT_ADDRESS,
      tokenAbi: ETH_MEN_ABI,
      staking: PROD_ETH_MEN_STAKING_ADDRESS,
      stakingAbi: PROD_ETH_MEN_STAKING_ABI
    },
  },
  COMETH: {
    title: "Cometh",
    image: "https://images.service.cometh.io/",
    dev: {
      token: DEV_MUSE_ADDRESS,
      tokenAbi: MUSE_ABI,
      staking: DEV_MUSE_STAKING_ADDRESS,
      stakingAbi: DEV_MUSE_STAKING_ABI
    },
    prod: {
      token: PROD_MUSE_ADDRESS,
      tokenAbi: MUSE_ABI,
      staking: PROD_MUSE_STAKING_ADDRESS,
      stakingAbi: PROD_MUSE_STAKING_ABI
    },
  }
};
