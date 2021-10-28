import actions from "./actions";

const initState = {
  finishTeamId: [],
  finishTotalHashPerTeam1: [],
  finishTotalHashPerTeam2: [],
  finishTotalHashPerUser: [],
  finishTotalPowerPerTeam: [],
  finishTotalPowerPerUser: [],
  finishTotalNDRPerTeam: [],
  finishTotalNDRPerUser: [],
  finishTeamPlayersCount: [],
  stakedFinishedCards1: [],
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_FINISH_TEAM_ID_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        finishTeamId: [...action.finishTeamId], 
      };
    case actions.GET_FINISH_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalHashPerTeam1: [...action.finishTotalHashPerTeam1],
        finishTotalHashPerTeam2: [...action.finishTotalHashPerTeam2]
      };
    case actions.GET_FINISH_TOTAL_HASH_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalHashPerUser: [...action.finishTotalHashPerUser],
      };
    case actions.GET_FINISH_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalPowerPerTeam: [...action.finishTotalPowerPerTeam]
      };
    case actions.GET_FINISH_TOTAL_POWER_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalPowerPerUser: [...action.finishTotalPowerPerUser]
      };
    case actions.GET_FINISH_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalNDRPerTeam: [...action.finishTotalNDRPerTeam]
      };
    case actions.GET_FINISH_TOTAL_NDR_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        finishTotalNDRPerUser: [...action.finishTotalNDRPerUser]
      };
    case actions.GET_FINISH_TEAM_PLAYERS_COUNT_STATUS_SUCCESS:
      return {
        ...state,
        finishTeamPlayersCount: [...action.finishTeamPlayersCount]
      };
    case actions.GET_FINISHED_STAKED_CARDS_SUCCESS:
      return {
        ...state,
        stakedFinishedCards1: [...action.stakedFinishedCards1],
      }
    case actions.GET_EMPTY_STAKED_CARDS_SUCCESS:
      return {
        ...state,
        stakedFinishedCards1: [...action.stakedEmptyCards1],
    }
    default:
      return state;
  }
}
