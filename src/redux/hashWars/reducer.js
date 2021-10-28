import actions from "./actions";

const initState = {
  endDate: {},
  teamId: {},
  totalHashPerTeam1: {},
  totalHashPerTeam2: {},
  dayHashPerTeam: {},
  totalHashPerUser: {},
  dayHashPerUser: {},
  totalPowerPerTeam1: '',
  totalPowerPerTeam2: '',
  totalPowerPerUser: '',
  totalNDRPerTeam1: '',
  totalNDRPerTeam2: '',
  totalNDRPerUser: '',
  teamPlayersCount: '',
  stakedCardTokens: [],
  approvedNDR: '',
  prizePool: '',
  battles: [],
  currentRound: 1,
  ethPrice: 0,
  ndrPrice: 0
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_BATTLE_START_DATE_STATUS_SUCCESS:
      return {
        ...state,
        endDate: {
          ...state.endDate,
          [action.time]: action.endDate,
        },
      };
    case actions.GET_TEAM_ID_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        teamId: action.teamId
      };
    case actions.GET_TOTAL_HASH_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        totalHashPerTeam1: action.totalHashPerTeam1,
        totalHashPerTeam2: action.totalHashPerTeam2
      };
    case actions.GET_DAY_HASH_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        dayHashPerTeam: action.dayHashPerTeam,
      };
    case actions.GET_TOTAL_HASH_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        totalHashPerUser: action.totalHashPerUser,
      };
    case actions.GET_DAY_HASH_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        dayHashPerUser: action.dayHashPerUser,
      };
    case actions.GET_TOTAL_POWER_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        totalPowerPerTeam1: action.totalPowerPerTeam1,
        totalPowerPerTeam2: action.totalPowerPerTeam2
      };
    case actions.GET_TOTAL_POWER_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        totalPowerPerUser: action.totalPowerPerUser
      };
    case actions.GET_TOTAL_NDR_PER_TEAM_STATUS_SUCCESS:
      return {
        ...state,
        totalNDRPerTeam1: action.totalNDRPerTeam1,
        totalNDRPerTeam2: action.totalNDRPerTeam2
      };
    case actions.GET_TOTAL_NDR_PER_USER_STATUS_SUCCESS:
      return {
        ...state,
        totalNDRPerUser: action.totalNDRPerUser
      };
    case actions.GET_TEAM_PLAYERS_COUNT_STATUS_SUCCESS:
      return {
        ...state,
        teamPlayersCount: action.teamPlayersCount
      };
    case actions.GET_STAKED_CARDS_SUCCESS:
      return {
        ...state,
        stakedCardTokens: [...action.stakedCardTokens],
      };
    case actions.GET_NDR_APPROVE_STATUS_SUCCESS:
      return {
        ...state,
        approvedNDR: action.approvedNDR
      };
    case actions.GET_PRIZE_POOL_STATUS_SUCCESS:
      return {
        ...state,
        prizePool: action.prizePool
      };
    case actions.GET_BATTLES_SUCCESS:
      return {
        ...state,
        battles: action.battles,
        currentRound: action.currentRound,
        ethPrice: action.ethPrice,
        ndrPrice: action.ndrPrice
      }
    default:
      return state;
  }
}
