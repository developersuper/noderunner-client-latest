import { getGasPrice } from "../web3";
import { getGasFee } from "../../helper/contract";

export const getFeeAsync = async (instance) => {
  return await instance.methods
    .getNftFee()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const approveNDRAsync = async (
  instance,
  web3,
  amount,
  address,
  spender
) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .approve(
      spender,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .estimateGas({ from: address });

  return await instance.methods
    .approve(
      spender,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
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

export const stakeNDRAsync = async (instance, stakeFee, web3, amount, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .stakeNDR(amount.toString())
    .estimateGas({ value: stakeFee.toString(), from: address });

  return await instance.methods
    .stakeNDR(amount.toString())
    .send({
      value: stakeFee.toString(),
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

export const getNDRAllowanceAsync = async (instance, owner, sender) => {
  return await instance.methods
    .allowance(owner, sender)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getBattleFinishDateAsync = async (instance) => {
  return await instance.methods
    .battleFinishDate()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTeamIdPerUserAsync = async (instance, address) => {
  return await instance.methods
    .teamIdPerUser(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalHashPerTeamAsync = async (instance, teamId) => {
  return await instance.methods
    // .totalHashPerTeam(teamId)
    .getTeamHashResult(teamId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getDayHashPerTeamAsync = async (instance, teamId) => {
  return await instance.methods
    .dayHashPerTeam(teamId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalHashPerUserAsync = async (instance, address) => {
  return await instance.methods
    // .totalHashPerUser(address)
    .getUserHashResult(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getDayHashPerUserAsync = async (instance, address) => {
  return await instance.methods
    .dayHashPerUser(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalPowerPerTeamAsync = async (instance, teamId) => {
  return await instance.methods
    .totalNFTStrengthPerTeam(teamId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalPowerPerUserAsync = async (instance, address) => {
  return await instance.methods
    .totalNFTStrengthPerUser(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalNDRPerTeamAsync = async (instance, teamId) => {
  return await instance.methods
    .totalNDRAmountPerTeam(teamId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalNDRPerUserAsync = async (instance, address) => {
  return await instance.methods
    .totalNDRAmountPerUser(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTeamPlayersCountAsync = async (instance, teamId) => {
  return await instance.methods
    .playersCounter(teamId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const selectTeamAsync = async (instance, web3, teamId, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .selectTeam(teamId)
    .estimateGas({ from: address });

  return await instance.methods
    .selectTeam(teamId)
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

export const isApprovedAllAsync = async (instance, address, spenderAddress) => {
  return await instance.methods
    .isApprovedForAll(address, spenderAddress)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Approve All Card
export const approveAllCardsAsync = async (
  instance,
  web3,
  spenderAddress,
  approved,
  address
) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .setApprovalForAll(spenderAddress, approved)
    .estimateGas({ from: address });

  return await instance.methods
    .setApprovalForAll(spenderAddress, approved)
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

// Stake Card Multi
export const stakeMultiCardAsync = async (instance, stakeFee, web3, tokenIds, amounts, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .stakeNFT(tokenIds, amounts)
    .estimateGas({ value: stakeFee.toString(), from: address });

  return await instance.methods
    .stakeNFT(tokenIds, amounts)
    .send({
      value: stakeFee.toString(),
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

export const withdrawNFTAsync = async (instance, web3, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdrawNFT()
    .estimateGas({ from: address });

  return await instance.methods
    .withdrawNFT()
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

export const withdrawNDRAsync = async (instance, web3, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdrawNDR()
    .estimateGas({ from: address });

  return await instance.methods
    .withdrawNDR()
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