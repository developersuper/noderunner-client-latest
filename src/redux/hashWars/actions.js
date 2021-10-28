const actions = {
  GET_BATTLE_START_DATE_STATUS: "GET_BATTLE_START_DATE_STATUS",
  GET_BATTLE_START_DATE_STATUS_SUCCESS: "GET_BATTLE_START_DATE_STATUS_SUCCESS",
  GET_TEAM_ID_PER_USER_STATUS: "GET_TEAM_ID_PER_USER_STATUS",
  GET_TEAM_ID_PER_USER_STATUS_SUCCESS: "GET_TEAM_ID_PER_USER_STATUS_SUCCESS",
  GET_TOTAL_HASH_PER_TEAM_STATUS: "GET_TOTAL_HASH_PER_TEAM_STATUS",
  GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS: "GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS",
  GET_DAY_HASH_PER_TEAM_STATUS: "GET_DAY_HASH_PER_TEAM_STATUS",
  GET_DAY_HASH_PER_TEAM_STATUS_SUCCESS: "GET_DAY_HASH_PER_TEAM_STATUS_SUCCESS",
  GET_TOTAL_HASH_PER_USER_STATUS: "GET_TOTAL_HASH_PER_USER_STATUS",
  GET_TOTAL_HASH_PER_USER_STATUS_SUCCESS: "GET_TOTAL_HASH_PER_USER_STATUS_SUCCESS",
  GET_DAY_HASH_PER_USER_STATUS: "GET_DAY_HASH_PER_USER_STATUS",
  GET_DAY_HASH_PER_USER_STATUS_SUCCESS: "GET_DAY_HASH_PER_USER_STATUS_SUCCESS",
  GET_TOTAL_POWER_PER_TEAM_STATUS: "GET_TOTAL_POWER_PER_TEAM_STATUS",
  GET_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS: "GET_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS",
  GET_TOTAL_POWER_PER_USER_STATUS: "GET_TOTAL_POWER_PER_USER_STATUS",
  GET_TOTAL_POWER_PER_USER_STATUS_SUCCESS: "GET_TOTAL_POWER_PER_USER_STATUS_SUCCESS",
  GET_TOTAL_NDR_PER_TEAM_STATUS: "GET_TOTAL_NDR_PER_TEAM_STATUS",
  GET_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS: "GET_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS",
  GET_TOTAL_NDR_PER_USER_STATUS: "GET_TOTAL_NDR_PER_USER_STATUS",
  GET_TOTAL_NDR_PER_USER_STATUS_SUCCESS: "GET_TOTAL_NDR_PER_USER_STATUS_SUCCESS",
  GET_TEAM_PLAYERS_COUNT_STATUS: "GET_TEAM_PLAYERS_COUNT_STATUS",
  GET_TEAM_PLAYERS_COUNT_STATUS_SUCCESS: "GET_TEAM_PLAYERS_COUNT_STATUS_SUCCESS",
  GET_NDR_APPROVE_STATUS: "GET_NDR_APPROVE_STATUS",
  GET_NDR_APPROVE_STATUS_SUCCESS: "GET_NDR_APPROVE_STATUS_SUCCESS",
  GET_PRIZE_POOL_STATUS: "GET_PRIZE_POOL_STATUS",
  GET_PRIZE_POOL_STATUS_SUCCESS: "GET_PRIZE_POOL_STATUS_SUCCESS",

  SELECT_TEAM_STATUS: "SELECT_TEAM_STATUS",
  SELECT_TEAM_STATUS_SUCCESS: "SELECT_TEAM_STATUS_SUCCESS",

  GET_STAKED_CARDS: "GET_STAKED_CARDS",
  GET_STAKED_CARDS_SUCCESS: "GET_STAKED_CARDS_SUCCESS",

  GET_APPROVED_STATUS: "GET_APPROVED_STATUS",
  APPROVE_ALL_BATTLE_CARD: "APPROVE_ALL_BATTLE_CARD",
  STAKE_BATTLE_CARD: "STAKE_BATTLE_CARD",
  APPROVE_NDR: "APPROVE_NDR",
  STAKE_NDR: "STAKE_NDR",

  GET_BATTLES: "GET_BATTLES",
  GET_BATTLES_SUCCESS: "GET_BATTLES_SUCCESS",

  getBattles: () => ({
    type: actions.GET_BATTLES
  }),

  getBattleStartDateStatus: (time) => ({
    type: actions.GET_BATTLE_START_DATE_STATUS,
    payload: { time }
  }),
  getTeamIdPerUserStatus: () => ({
    type: actions.GET_TEAM_ID_PER_USER_STATUS,
    payload: {}
  }),
  getTotalHashPerTeamStatus: () => ({
    type: actions.GET_TOTAL_HASH_PER_TEAM_STATUS,
    payload: {}
  }),
  getDayHashPerTeamStatus: (teamId) => ({
    type: actions.GET_DAY_HASH_PER_TEAM_STATUS,
    payload: { teamId }
  }),
  getTotalHashPerUserStatus: () => ({
    type: actions.GET_TOTAL_HASH_PER_USER_STATUS,
    payload: {}
  }),
  getDayHashPerUserStatus: () => ({
    type: actions.GET_DAY_HASH_PER_USER_STATUS,
    payload: {}
  }),
  getTotalPowerPerTeamStatus: () => ({
    type: actions.GET_TOTAL_POWER_PER_TEAM_STATUS,
    payload: {}
  }),
  getTotalPowerPerUserStatus: () => ({
    type: actions.GET_TOTAL_POWER_PER_USER_STATUS,
    payload: {}
  }),
  getTotalNDRPerTeamStatus: () => ({
    type: actions.GET_TOTAL_NDR_PER_TEAM_STATUS,
    payload: {}
  }),
  getTotalNDRPerUserStatus: () => ({
    type: actions.GET_TOTAL_NDR_PER_USER_STATUS,
    payload: {}
  }),
  getTeamPlayersCountStatus: (teamId) => ({
    type: actions.GET_TEAM_PLAYERS_COUNT_STATUS,
    payload: { teamId }
  }),

  selectTeam: (teamId, callback) => ({
    type: actions.SELECT_TEAM_STATUS,
    payload: { teamId, callback }
  }),

  getApprovedStatus: (callback) => ({
    type: actions.GET_APPROVED_STATUS,
    payload: { callback },
  }),
  approveAllBattleCard: (approved, callback) => ({
    type: actions.APPROVE_ALL_BATTLE_CARD,
    payload: { approved, callback },
  }),
  getStakedCards: () => ({
    type: actions.GET_STAKED_CARDS,
  }),
  stakeBattleCard: (cardIds, callback) => ({
    type: actions.STAKE_BATTLE_CARD,
    payload: { cardIds, callback },
  }),
  getNDRApproveStatus: (token) => ({
    type: actions.GET_NDR_APPROVE_STATUS,
    payload: { token },
  }),
  approveNDR: (token, callback) => ({
    type: actions.APPROVE_NDR,
    payload: { token, callback },
  }),
  stakeNDR: (token, amount, isMax, callback) => ({
    type: actions.STAKE_NDR,
    payload: { token, amount, isMax, callback },
  }),
  getPrizePoolStatus: () => ({
    type: actions.GET_PRIZE_POOL_STATUS,
    payload: {}
  }),
};

export default actions;
