import {
  all,
  takeLatest,
  call,
  put,
  fork,
  takeEvery,
} from "redux-saga/effects";
import BigNumber from "bignumber.js";

import actions from "./actions";
import { RESPONSE } from "../../helper/constant";
import { getWeb3 } from "../../services/web3";
import {
  getBattleFinishDateAsync,
  getTeamIdPerUserAsync,
  getTotalHashPerTeamAsync,
  getDayHashPerTeamAsync,
  getTotalHashPerUserAsync,
  getDayHashPerUserAsync,
  getTotalPowerPerTeamAsync,
  getTotalPowerPerUserAsync,
  getTotalNDRPerTeamAsync,
  getTotalNDRPerUserAsync,
  getTeamPlayersCountAsync,
  isApprovedAllAsync,
  approveAllCardsAsync,
  selectTeamAsync,
  stakeMultiCardAsync,
  getFeeAsync,
  approveNDRAsync,
  stakeNDRAsync,
  getNDRAllowanceAsync
} from "../../services/web3/battle";
import {
  getBalanceAsync,
} from "../../services/web3/lpStaking";
import {
  getActiveWarInstance,
  getNFTInstance,
  getFarmInstance
} from "../../services/web3/instance";

import { getBattlesAPI } from "../../services/axios/api";

export function* getBattles() {
  yield takeLatest(actions.GET_BATTLES, function* () {

    const getBattlesAsync = async () =>
      await getBattlesAPI()
        .then((result) => result)
        .catch((error) => error);

    const res = yield call(getBattlesAsync);

    if (res.status === 200) {
      const { battles, currentRound, price } = res.data;
      yield put({
        type: actions.GET_BATTLES_SUCCESS,
        battles,
        currentRound,
        ethPrice: price.eth,
        ndrPrice: price.ndr
      });
    }
  });
}

// Get Token Approve Status
export function* getBattleStartDateStatus() {
  yield takeEvery(actions.GET_BATTLE_START_DATE_STATUS, function* ({ payload }) {
    const { time } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    const endDate = yield call(
      getBattleFinishDateAsync,
      tokenInstance.instance,
    );

    yield put({
      type: actions.GET_BATTLE_START_DATE_STATUS_SUCCESS,
      time,
      endDate: endDate,
    });
  });
}

// Get TeamId Per User
export function* getTeamIdPerUserStatus() {
  yield takeEvery(actions.GET_TEAM_ID_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const teamId = yield call(
      getTeamIdPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TEAM_ID_PER_USER_STATUS_SUCCESS,
      teamId
    });
  });
}

// Get Total Hash Per Team
export function* getTotalHashPerTeamStatus() {
  yield takeEvery(actions.GET_TOTAL_HASH_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    const totalHashPerTeam1 = yield call(
      getTotalHashPerTeamAsync,
      tokenInstance.instance,
      1,
    );
    const totalHashPerTeam2 = yield call(
      getTotalHashPerTeamAsync,
      tokenInstance.instance,
      2,
    );

    yield put({
      type: actions.GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS,
      totalHashPerTeam1,
      totalHashPerTeam2
    });
  });
}

// Get Day Hash Per Team
export function* getDayHashPerTeamStatus() {
  yield takeEvery(actions.GET_DAY_HASH_PER_TEAM_STATUS, function* ({ payload }) {
    const { teamId } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    const dayHashPerTeam = yield call(
      getDayHashPerTeamAsync,
      tokenInstance.instance,
      teamId,
    );

    yield put({
      type: actions.GET_DAY_HASH_PER_TEAM_STATUS_SUCCESS,
      dayHashPerTeam
    });
  });
}

// Get Total Hash Per User
export function* getTotalHashPerUserStatus() {
  yield takeEvery(actions.GET_TOTAL_HASH_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const totalHashPerUser = yield call(
      getTotalHashPerUserAsync,
      tokenInstance.instance,
      accounts[0],
    );

    yield put({
      type: actions.GET_TOTAL_HASH_PER_USER_STATUS_SUCCESS,
      totalHashPerUser
    });
  });
}

// Get Day Hash Per Team
export function* getDayHashPerUserStatus() {
  yield takeEvery(actions.GET_DAY_HASH_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const dayHashPerUser = yield call(
      getDayHashPerUserAsync,
      tokenInstance.instance,
      accounts[0],
    );

    yield put({
      type: actions.GET_DAY_HASH_PER_USER_STATUS_SUCCESS,
      dayHashPerUser
    });
  });
}

// Get Total NFT Power Per Team
export function* getTotalPowerPerTeamStatus() {
  yield takeEvery(actions.GET_TOTAL_POWER_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    const totalPowerPerTeam1 = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance.instance,
      1
    );
    const totalPowerPerTeam2 = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance.instance,
      2
    );

    yield put({
      type: actions.GET_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS,
      totalPowerPerTeam1,
      totalPowerPerTeam2
    });
  });
}

// Get Total NFT Power Per User
export function* getTotalPowerPerUserStatus() {
  yield takeEvery(actions.GET_TOTAL_POWER_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const totalPowerPerUser = yield call(
      getTotalPowerPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOTAL_POWER_PER_USER_STATUS_SUCCESS,
      totalPowerPerUser
    });
  });
}

// Get Total NDR Amount Per Team
export function* getTotalNDRPerTeamStatus() {
  yield takeEvery(actions.GET_TOTAL_NDR_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    const totalNDRPerTeam1 = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance.instance,
      1
    );
    const totalNDRPerTeam2 = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance.instance,
      2
    );

    yield put({
      type: actions.GET_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS,
      totalNDRPerTeam1,
      totalNDRPerTeam2
    });
  });
}

// Get Total NDR Amount Per User
export function* getTotalNDRPerUserStatus() {
  yield takeEvery(actions.GET_TOTAL_NDR_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);
    const accounts = yield call(web3.eth.getAccounts);

    const totalNDRPerUser = yield call(
      getTotalNDRPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );

    yield put({
      type: actions.GET_TOTAL_NDR_PER_USER_STATUS_SUCCESS,
      totalNDRPerUser
    });
  });
}

// Get Total Team Players Count
export function* getTeamPlayersCountStatus() {
  yield takeEvery(actions.GET_TEAM_PLAYERS_COUNT_STATUS, function* ({ payload }) {
    const { teamId } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    const teamPlayersCount = yield call(
      getTeamPlayersCountAsync,
      tokenInstance.instance,
      teamId
    );

    yield put({
      type: actions.GET_TEAM_PLAYERS_COUNT_STATUS_SUCCESS,
      teamPlayersCount: teamPlayersCount
    });
  });
}

export function* selectTeam() {
  yield takeLatest(actions.SELECT_TEAM_STATUS, function* ({ payload }) {
    const { teamId, callback } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getActiveWarInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const selectTeamResponse = yield call(
      selectTeamAsync,
      tokenInstance.instance,
      web3,
      teamId,
      accounts[0]
    );

    if (selectTeamResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* getApprovedStatus() {
  yield takeEvery(actions.GET_APPROVED_STATUS, function* ({ payload }) {
    const { callback } = payload;

    const web3 = yield call(getWeb3);
    const nft = getNFTInstance(web3);
    const nftStaking = getActiveWarInstance(web3);

    const accounts = yield call(web3.eth.getAccounts);

    const approvedStatusResponse = yield call(
      isApprovedAllAsync,
      nft.instance,
      accounts[0],
      nftStaking.address
    );

    callback(approvedStatusResponse);
  });
}

export function* approveAllBattleCard() {
  yield takeLatest(actions.APPROVE_ALL_BATTLE_CARD, function* ({ payload }) {
    const { approved, callback } = payload;

    const web3 = yield call(getWeb3);
    const nft = getNFTInstance(web3);
    const nftStaking = getActiveWarInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const approveResponse = yield call(
      approveAllCardsAsync,
      nft.instance,
      web3,
      nftStaking.address,
      approved,
      accounts[0]
    );

    if (approveResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* stakeBattleCard() {
  yield takeLatest(actions.STAKE_BATTLE_CARD, function* ({ payload }) {
    const { cardIds, callback } = payload;

    const amounts = Array(cardIds.length).fill(1);
    const web3 = yield call(getWeb3);
    const nftStaking = getActiveWarInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const stakeFee = yield call(getFeeAsync, nftStaking.instance);

    const stakeCardResponse = yield call(
      stakeMultiCardAsync,
      nftStaking.instance,
      stakeFee,
      web3,
      cardIds,
      amounts,
      accounts[0]
    );

    if (stakeCardResponse.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* getNDRApproveStatus() {
  yield takeEvery(actions.GET_NDR_APPROVE_STATUS, function* ({ payload }) {
    const { token } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);
    const hashWarsInstance = getActiveWarInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    const allowance = yield call(
      getNDRAllowanceAsync,
      tokenInstance.token.instance,
      accounts[0],
      hashWarsInstance.address
    );

    yield put({
      type: actions.GET_NDR_APPROVE_STATUS_SUCCESS,
      approvedNDR: allowance > 0,
    });
  });
}

export function* approveNDR() {
  yield takeLatest(actions.APPROVE_NDR, function* ({ payload }) {
    const { token, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);
    const hashWarsInstance = getActiveWarInstance(web3);
    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);

    // Check balance
    const tokenBalance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    // if (tokenBalance <= 0) {
    //   callback(RESPONSE.INSUFFICIENT);
    //   return;
    // }

    // Approve
    const approveResult = yield call(
      approveNDRAsync,
      tokenInstance.token.instance,
      web3,
      tokenBalance,
      accounts[0],
      hashWarsInstance.address
    );

    if (approveResult.status) {
      yield put({
        type: actions.GET_NDR_APPROVE_STATUS,
        payload: { token },
      });

      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* stakeNDR() {
  yield takeLatest(actions.STAKE_NDR, function* ({ payload }) {
    const { token, amount, isMax, callback } = payload;

    const web3 = yield call(getWeb3);
    const tokenInstance = getFarmInstance(web3, token);
    const hashWarsInstance = getActiveWarInstance(web3);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);
    const stakeFee = yield call(getFeeAsync, hashWarsInstance.instance);

    // Check balance
    const tokenBalance = yield call(
      getBalanceAsync,
      tokenInstance.token.instance,
      accounts[0]
    );

    const stakeAmount = isMax
      ? new BigNumber(tokenBalance)
      : new BigNumber(amount).times(new BigNumber(10).pow(18));

    if (new BigNumber(tokenBalance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.INSUFFICIENT);
      return;
    }

    // Check Allowance
    const tokenAllowance = yield call(
      getNDRAllowanceAsync,
      tokenInstance.token.instance,
      accounts[0],
      hashWarsInstance.address
    );

    if (new BigNumber(tokenAllowance).comparedTo(stakeAmount) === -1) {
      callback(RESPONSE.SHOULD_APPROVE);
      return;
    }

    const stakeResult = yield call(
      stakeNDRAsync,
      hashWarsInstance.instance,
      stakeFee,
      web3,
      stakeAmount,
      accounts[0]
    );

    if (stakeResult.status) {
      callback(RESPONSE.SUCCESS);
    } else {
      callback(RESPONSE.ERROR);
    }
  });
}

export function* getPrizePoolStatus() {
  yield takeEvery(actions.GET_PRIZE_POOL_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const hashWarsInstance = getActiveWarInstance(web3);

    const res = async () =>
      await web3.eth.getBalance(hashWarsInstance.address)
        .then((result) => result)
        .catch((error) => error);
    const prizePool = yield call(res);

    yield put({
      type: actions.GET_PRIZE_POOL_STATUS_SUCCESS,
      prizePool,
    });
  });
}

export default function* rootSaga() {
  yield all([
    fork(getBattles),
    fork(getBattleStartDateStatus),
    fork(getTeamIdPerUserStatus),
    fork(getTotalHashPerTeamStatus),
    fork(getDayHashPerTeamStatus),
    fork(getTotalHashPerUserStatus),
    fork(getDayHashPerUserStatus),
    fork(getTotalPowerPerTeamStatus),
    fork(getTotalPowerPerUserStatus),
    fork(getTotalNDRPerTeamStatus),
    fork(getTotalNDRPerUserStatus),
    fork(getTeamPlayersCountStatus),
    fork(getApprovedStatus),
    fork(approveAllBattleCard),
    fork(selectTeam),
    fork(stakeBattleCard),
    fork(getNDRApproveStatus),
    fork(approveNDR),
    fork(stakeNDR),
    fork(getPrizePoolStatus),
  ]);
}
