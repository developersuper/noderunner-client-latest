import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";
import { CardWrapper, NFTStakeModalMask } from "../../component/Wrappers";

import ERC721StakingBoard from "../ERC721StakingBoard";
import ERC721StakingModal from "../ERC721StakingModal";

import customNFTStakingActions from "../../redux/customNFTStaking/actions";

import { partnerNFTs } from "../../helper/contractPartner";
import { RESPONSE } from "../../helper/constant";
import { getValueFromObject, getERCTokenImage } from "../../helper/utils";

const ERC721Staking = ({ icon, nftToken, active = true }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(customNFTStakingActions.getApprovedStatus(nftToken));
  }, [dispatch, nftToken]);

  useEffect(() => {
    dispatch(customNFTStakingActions.getStakedERC721Cards(nftToken), () => {
      setLoading(true);
    });
  }, [dispatch, nftToken]);

  // Selected Cards for Staking or Unstaking
  const [selectedUnstakeCardIds, setSelectedUnstakeCardIds] = useState([]);

  const [stakeDlgOpen, setStakeDlgOpen] = useState(false);

  const [unStakeLoading, setUnStakeLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const approved = useSelector((state) =>
    getValueFromObject(state.customNFTStaking.approved, nftToken, false)
  );

  const stakedCardTokens = useSelector((state) =>
    getValueFromObject(state.customNFTStaking.staked, nftToken, [])
  ); // Staked card count
  const ownedCardTokens = useSelector((state) =>
    getValueFromObject(state.customNFTStaking.owned, nftToken, [])
  );

  const handleSelectCard = (cardId) => {
    const oldUnstakeCardIds = [...selectedUnstakeCardIds];
    const findIndex = oldUnstakeCardIds.findIndex((id) => id === cardId);
    if (findIndex >= 0) {
      oldUnstakeCardIds.splice(findIndex, 1);
    } else {
      oldUnstakeCardIds.push(cardId);
    }
    setSelectedUnstakeCardIds([...oldUnstakeCardIds]);
  };

  const handleUnStake = () => {
    if (unStakeLoading) {
      return;
    }

    if (selectedUnstakeCardIds.length === 0) {
      toast.error("Select NFT to unstake please");
      return;
    }

    setUnStakeLoading(true);
    dispatch(
      customNFTStakingActions.unStakeERC721Card(
        nftToken,
        selectedUnstakeCardIds,
        (status) => {
          setSelectedUnstakeCardIds([]);
          setUnStakeLoading(false);
          if (status === RESPONSE.SUCCESS) {
            toast.success("Success");
            dispatch(customNFTStakingActions.getStakedERC721Cards(nftToken));
            dispatch(customNFTStakingActions.getMyERC721Staked(nftToken));
            dispatch(customNFTStakingActions.getTotalERC721Staked(nftToken));
            dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
          } else {
            toast.error("Failed...");
          }
        }
      )
    );
  };

  const handleOpenStakeModal = () => {
    setStakeDlgOpen(true);
  };

  const handleCloseStakeModal = () => {
    setStakeDlgOpen(false);
  };

  const handleApproveAll = () => {
    setApproveLoading(true);
    dispatch(
      customNFTStakingActions.approveAll(nftToken, true, (status) => {
        setApproveLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Approved successfully");
        } else {
          toast.error("Approved failed");
        }
      })
    );
  };

  return (
    <StakePageContainer>
      {stakeDlgOpen && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <ERC721StakingModal
            onClose={handleCloseStakeModal}
            nftToken={nftToken}
            stakableTokens={ownedCardTokens}
            loading={loading}
          />
        </div>
      )}

      <MenuWrapper
        className="animation-fadeInRight"
        style={{ marginBottom: 20 }}
      >
        <SectionTitle icon={icon} title={partnerNFTs[nftToken].title} long />
      </MenuWrapper>
      <ERC721StakingBoard nftToken={nftToken} />
      {active && (
        <MenuWrapper
          className="animation-fadeInRight"
          style={{ marginTop: 20 }}
        >
          <div className="menu-actions">
            <div className="menu-item selected-card-count">
              {approved && stakedCardTokens.length > 0
                ? `${selectedUnstakeCardIds.length}/${stakedCardTokens.length} Selected`
                : `${ownedCardTokens.length} Available`}
            </div>
            {selectedUnstakeCardIds.length > 0 && (
              <div
                role="button"
                className="menu-item unstake-button"
                onClick={(e) => handleUnStake()}
              >
                {unStakeLoading ? (
                  <LoadingTextIcon loadingText="Unstaking..." />
                ) : (
                  `Unstake selected`
                )}
              </div>
            )}
            <StakeButtonWrapper>
              {approveLoading ? (
                <div
                  className="stake-button button-approve-all"
                  role="button"
                  onClick={(e) => handleApproveAll()}
                >
                  <LoadingTextIcon loadingText="Approving..." />
                </div>
              ) : (
                !approved && (
                  <div
                    className="stake-button button-approve-all"
                    role="button"
                    onClick={(e) => handleApproveAll()}
                  >
                    Approve NFT
                  </div>
                )
              )}
              {approved && selectedUnstakeCardIds.length === 0 && (
                <div
                  role="button"
                  className="stake-button button-stake-all"
                  onClick={(e) => handleOpenStakeModal()}
                >
                  Stake NFT
                </div>
              )}
            </StakeButtonWrapper>
          </div>
        </MenuWrapper>
      )}
      {active && approved && (
        <CardContainer>
          {stakedCardTokens.length > 0 &&
            stakedCardTokens.map((token) => {
              const active = selectedUnstakeCardIds.includes(token)
                ? "active"
                : "";
              return (
                <CardWrapper key={`unstake_card_${nftToken}_${token}`}>
                  <div className={`card ${active}`}>
                    <img
                      src={getERCTokenImage(nftToken, token)}
                      alt={`${token}`}
                      className="card-image"
                    />
                    <div
                      className="card-border"
                      onClick={(e) => handleSelectCard(token)}
                    ></div>
                  </div>
                </CardWrapper>
              );
            })}
        </CardContainer>
      )}
      {active && !approved && (
        <h2 className="approve-notice">Approve your NFTs to stake them</h2>
      )}
    </StakePageContainer>
  );
};

const StakePageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  // min-height: calc(100vh - 280px);

  .nav-pills {
    margin: 0px;
  }

  .nav-pills .nav-item .nav-link {
    margin-bottom: 10px;
    font-size: 24px;
  }

  .approve-notice {
    font-family: Orbitron-Medium;
    font-size: 1.3rem;
    color: #fec100;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    padding-top: 30px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 20px;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }

  .menu-actions {
    display: flex;
    flex-flow: row wrap;
    padding-left: 20px;
    justify-content: center;

    .menu-item {
      width: 210px;
      height: 32px;
      padding-left: 40px;
      padding-top: 6px;
      margin-bottom: 5px;
    }

    .selected-card-count {
      background-image: url("/static/images/bg/pages/stake/title.png");
      background-size: 100% 100%;
      font-family: Orbitron-Black;
      color: #fec100;
    }

    .unstake-button {
      background-image: url("/static/images/bg/pages/stake/button.png");
      background-size: 100% 100%;
      font-family: Orbitron-Medium;
      color: #161617;
      margin-left: -12px;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        background-image: url("/static/images/bg/pages/stake/button--active.png");
        color: #fec100;
      }
    }
  }
`;

const StakeButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;

  .stake-button {
    width: 210px;
    height: 32px;
    padding-top: 7px;
    font-family: Orbitron-Medium;
    color: #161617;
    cursor: pointer;

    &:hover {
      color: #fec100;
    }
  }

  .button-approve-all {
    background-image: url("/static/images/bg/pages/stake/button.png");
    background-size: 100% 100%;
    padding-left: 40px;
    margin-left: -30px;

    &:hover {
      background-image: url("/static/images/bg/pages/stake/button--active.png");
      color: #fec100;
    }
  }

  .button-stake-all {
    background-image: url("/static/images/bg/pages/stake/button.png");
    background-size: 100% 100%;
    padding-left: 40px;
    margin-left: -30px;

    &:hover {
      background-image: url("/static/images/bg/pages/stake/button--active.png");
    }
  }
`;

export default ERC721Staking;
