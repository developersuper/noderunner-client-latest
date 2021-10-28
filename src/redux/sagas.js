import { all } from "redux-saga/effects";

import lpstakingSagas from "./lpstaking/saga";
import cardsSagas from "./cards/saga";
import oldNFTStakingSagas from "./oldNFTStaking/saga";
import nftStakingSagas from "./nftStaking/saga";
import customStakingSagas from "./customNFTStaking/saga";
import farmsSagas from "./farms/saga";
import hashWarsSagas from "./hashWars/saga";
import finishedWarsSagas from "./finishedWars/saga";

export default function* rootSaga(getState) {
  yield all([
    lpstakingSagas(),
    cardsSagas(),
    oldNFTStakingSagas(),
    nftStakingSagas(),
    customStakingSagas(),
    farmsSagas(),
    hashWarsSagas(),
    finishedWarsSagas()
  ]);
}
