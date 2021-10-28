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
import { finishedHashWars } from "../../helper/contractBattle";

import { getWeb3 } from "../../services/web3";
import {
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
  withdrawNDRAsync,
  withdrawNFTAsync,
} from "../../services/web3/battle";

import {
  getStakedCountByTokenIdAsync,
} from "../../services/web3/cards";

import {
  getBalanceAsync,
} from "../../services/web3/lpStaking";
import {
  getActiveWarInstance,
  getFinishedWarsInstance,
  getFinishedWarsInstance_1,
  getStakedNFTInstance,
  getStakedNFTInstance_1,
  getNFTInstance,
  getFarmInstance
} from "../../services/web3/instance";

//Get Staked Cards
export function* getFinishedStakedCards() {
  yield takeEvery(actions.GET_FINISHED_STAKED_CARDS, function* () {
    const web3 = yield call(getWeb3);
    const stakedCards_1 = [];

    const tokenInstance_1 = getStakedNFTInstance_1(web3);
    const accounts = yield call(web3.eth.getAccounts);

    for (let i = 0; i < stakedCards_1.length + 1; i++) {
      const cnt = yield call(getStakedCountByTokenIdAsync, tokenInstance_1.instance, accounts[0], i);
      if (cnt[0] > 0) {
        stakedCards_1.push(cnt.tokenId);
      }
    }

    yield put({
      type: actions.GET_FINISHED_STAKED_CARDS_SUCCESS,
      stakedFinishedCards1: stakedCards_1,
    });


  })
}

export function* getEmptyStakedCards() {
  yield takeEvery(actions.GET_EMPTY_STAKED_CARDS, function* () {
    const stakedEmptyCards_1 = [];

    yield put({
      type: actions.GET_EMPTY_STAKED_CARDS_SUCCESS,
      stakedEmptyCards1: stakedEmptyCards_1,
    });
  })
}


// Get TeamId Per User
export function* getFinishTeamIdPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TEAM_ID_PER_USER_STATUS, function* () {
    const web3 = yield call(getWeb3);
    const finishTeamId = [];

    
      const tokenInstance = getFinishedWarsInstance(web3, 1);
      const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
      // Get Wallet Account
      const accounts = yield call(web3.eth.getAccounts);

      let teamId_1 = yield call(
        getTeamIdPerUserAsync,
        tokenInstance_1.instance,
        accounts[0]
      );

      let teamId = yield call(
        getTeamIdPerUserAsync,
        tokenInstance.instance,
        accounts[0]
      );
     
      if (teamId_1)
        finishTeamId.push(teamId_1);
      if (teamId)
        finishTeamId.push(teamId);

    yield put({
      type: actions.GET_FINISH_TEAM_ID_PER_USER_STATUS_SUCCESS,
      finishTeamId: finishTeamId
    });
  });
}

// Get Total Hash Per Team
export function* getFinishTotalHashPerTeamStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_HASH_PER_TEAM_STATUS, function* () {
    const web3 = yield call(getWeb3);

    const finishTotalHashPerTeam1 = [];
    const finishTotalHashPerTeam2 = [];

      const tokenInstance = getFinishedWarsInstance(web3, 1);
      const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
      
      const team1_1 = yield call(
        getTotalHashPerTeamAsync,
        tokenInstance_1.instance,
        1,
      );
      finishTotalHashPerTeam1.push(team1_1);

      const team2_1 = yield call(
        getTotalHashPerTeamAsync,
        tokenInstance_1.instance,
        2,
      );
      finishTotalHashPerTeam2.push(team2_1);  

      const team1 = yield call(
        getTotalHashPerTeamAsync,
        tokenInstance.instance,
        1,
      );
      finishTotalHashPerTeam1.push(team1);

      const team2 = yield call(
        getTotalHashPerTeamAsync,
        tokenInstance.instance,
        2,
      ); 
      finishTotalHashPerTeam2.push(team2);
      
    yield put({
      type: actions.GET_FINISH_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS,
      finishTotalHashPerTeam1: finishTotalHashPerTeam1,
      finishTotalHashPerTeam2: finishTotalHashPerTeam2
    });
  });
}

// Get Total Hash Per User
export function* getFinishTotalHashPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_HASH_PER_USER_STATUS, function* ({ payload }) {
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const accounts = yield call(web3.eth.getAccounts);
    const finishTotalHashPerUser = [];

    const finishedTotalHashPerUser_1 = yield call(
      getTotalHashPerUserAsync,
      tokenInstance_1.instance,
      accounts[0],
    );
    finishTotalHashPerUser.push(finishedTotalHashPerUser_1);

    const finishedTotalHashPerUser = yield call(
      getTotalHashPerUserAsync,
      tokenInstance.instance,
      accounts[0],
    );
    finishTotalHashPerUser.push(finishedTotalHashPerUser);

    yield put({
      type: actions.GET_FINISH_TOTAL_HASH_PER_USER_STATUS_SUCCESS,
      finishTotalHashPerUser: finishTotalHashPerUser,
    });
  });
}

// Get Total NFT Power Per Team
export function* getFinishTotalPowerPerTeamStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_POWER_PER_TEAM_STATUS, function* ({ payload }) {
    const { openRound,openTeam } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const finishTotalPowerPerTeam = [];

    const finishedTotalPowerPerTeam_1 = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance_1.instance,
      openTeam
    );
    finishTotalPowerPerTeam.push(finishedTotalPowerPerTeam_1)

    const finishedTotalPowerPerTeam = yield call(
      getTotalPowerPerTeamAsync,
      tokenInstance.instance,
      openTeam
    );
    finishTotalPowerPerTeam.push(finishedTotalPowerPerTeam)
    
    yield put({
      type: actions.GET_FINISH_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS,
      finishTotalPowerPerTeam: finishTotalPowerPerTeam,
    });
  });
}

// Get Total NFT Power Per User
export function* getFinishTotalPowerPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_POWER_PER_USER_STATUS, function* ({ payload }) {
    const { openRound } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const accounts = yield call(web3.eth.getAccounts);
    const finishTotalPowerPerUser = [];

    const finishedTotalPowerPerUser_1 = yield call(
      getTotalPowerPerUserAsync,
      tokenInstance_1.instance,
      accounts[0]
    );
    finishTotalPowerPerUser.push(finishedTotalPowerPerUser_1);

    const finishedTotalPowerPerUser = yield call(
      getTotalPowerPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );
    finishTotalPowerPerUser.push(finishedTotalPowerPerUser);
    

    yield put({
      type: actions.GET_FINISH_TOTAL_POWER_PER_USER_STATUS_SUCCESS,
      finishTotalPowerPerUser: finishTotalPowerPerUser,
    });
  });
}

// Get Total NDR Amount Per Team
export function* getFinishTotalNDRPerTeamStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_NDR_PER_TEAM_STATUS, function* ({ payload }) {
    const { openRound, openTeam } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const finishTotalNDRPerTeam = [];

    const finishedTotalNDRPerTeam_1 = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance_1.instance,
      openTeam
    );
    finishTotalNDRPerTeam.push(finishedTotalNDRPerTeam_1);

    const finishedTotalNDRPerTeam = yield call(
      getTotalNDRPerTeamAsync,
      tokenInstance.instance,
      openTeam
    );
    finishTotalNDRPerTeam.push(finishedTotalNDRPerTeam);

    yield put({
      type: actions.GET_FINISH_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS,
      finishTotalNDRPerTeam: finishTotalNDRPerTeam,
    });
  });
}

// Get Total NDR Amount Per User
export function* getFinishTotalNDRPerUserStatus() {
  yield takeEvery(actions.GET_FINISH_TOTAL_NDR_PER_USER_STATUS, function* ({ payload }) {
    const { openRound } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const accounts = yield call(web3.eth.getAccounts);
    const finishTotalNDRPerUser = [];

    const finishedTotalNDRPerUser_1 = yield call(
      getTotalNDRPerUserAsync,
      tokenInstance_1.instance,
      accounts[0]
    );
    finishTotalNDRPerUser.push(finishedTotalNDRPerUser_1);
    
    const finishedTotalNDRPerUser = yield call(
      getTotalNDRPerUserAsync,
      tokenInstance.instance,
      accounts[0]
    );
    finishTotalNDRPerUser.push(finishedTotalNDRPerUser);
    

    yield put({
      type: actions.GET_FINISH_TOTAL_NDR_PER_USER_STATUS_SUCCESS,
      finishTotalNDRPerUser: finishTotalNDRPerUser,
    });
  });
}

// Get Total Team Players Count
export function* getFinishTeamPlayersCountStatus() {
  yield takeEvery(actions.GET_FINISH_TEAM_PLAYERS_COUNT_STATUS, function* ({ payload }) {
    const { openRound, openTeam } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const finishTeamPlayersCount = [];

    const finishedTeamPlayersCount_1 = yield call(
      getTeamPlayersCountAsync,
      tokenInstance_1.instance,
      openTeam
    );
    finishTeamPlayersCount.push(finishedTeamPlayersCount_1);

    const finishedTeamPlayersCount = yield call(
      getTeamPlayersCountAsync,
      tokenInstance.instance,
      openTeam
    );
    finishTeamPlayersCount.push(finishedTeamPlayersCount);
    

    yield put({
      type: actions.GET_FINISH_TEAM_PLAYERS_COUNT_STATUS_SUCCESS,
      finishTeamPlayersCount: finishTeamPlayersCount,
    });
  });
}

export function* unstakeAll() {
  yield takeEvery(actions.UN_STAKE_ALL, function* ({ payload }) {
    const { openRound, callback } = payload;
    const web3 = yield call(getWeb3);
    const tokenInstance = getFinishedWarsInstance(web3, 1);
    const tokenInstance_1 = getFinishedWarsInstance_1(web3, 0);
    const accounts = yield call(web3.eth.getAccounts);

    if (openRound === 2) {
      const withdrawNDR = yield call(
        withdrawNDRAsync,
        tokenInstance.instance,
        web3,
        accounts[0]
      );

      const withdrawNFT = yield call(
        withdrawNFTAsync,
        tokenInstance.instance,
        web3,
        accounts[0]
      );
      if (withdrawNDR.status && withdrawNFT.status) {
        callback(RESPONSE.SUCCESS);
      } else {
        callback(RESPONSE.ERROR);
      }
    }

    if (openRound === 1) {
      const withdrawNDR = yield call(
        withdrawNDRAsync,
        tokenInstance_1.instance,
        web3,
        accounts[0]
      );

      const withdrawNFT = yield call(
        withdrawNFTAsync,
        tokenInstance_1.instance,
        web3,
        accounts[0]
      );
      if (withdrawNDR.status && withdrawNFT.status) {
        callback(RESPONSE.SUCCESS);
      } else {
        callback(RESPONSE.ERROR);
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getFinishedStakedCards),
    fork(getEmptyStakedCards),
    fork(getFinishTeamIdPerUserStatus),
    fork(getFinishTotalHashPerTeamStatus),
    fork(getFinishTotalHashPerUserStatus),
    fork(getFinishTotalPowerPerTeamStatus),
    fork(getFinishTotalPowerPerUserStatus),
    fork(getFinishTotalNDRPerTeamStatus),
    fork(getFinishTotalNDRPerUserStatus),
    fork(getFinishTeamPlayersCountStatus),
    fork(unstakeAll),
  ]);
}
