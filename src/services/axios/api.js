import { getClient } from "./apiConfig";

const getCardsAPI = () => getClient(false).get("/v1/cards");
const getPartnerCardsAPI = () => getClient(false).get("/v1/cards/partners");
const getBattlesAPI = () => getClient(false).get("/v1/battles/all");

export { getCardsAPI, getPartnerCardsAPI, getBattlesAPI };
