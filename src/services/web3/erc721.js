import { getGasPrice } from "../web3";
import { getGasFee } from "../../helper/contract";

export const getTokenIdOfOwnerByIndexAsync = async (instance, address, index) => {
  return await instance.methods
    .tokenOfOwnerByIndex(address, index)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getMyStakedERC721TokenIdsAsync = async (instance, address) => {
  return await instance.methods
    .nftTokensOf(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Stake Card Multi
export const stakeERC721MultiCardAsync = async (instance, web3, tokenIds, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .stake(tokenIds)
    .estimateGas({ from: address });

  return await instance.methods
    .stake(tokenIds)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Unstake Card Multi
export const unStakeERC721MultiCardAsync = async (instance, web3, tokenIds, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdrawNFT(tokenIds)
    .estimateGas({ from: address });

  return await instance.methods
    .withdrawNFT(tokenIds)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};