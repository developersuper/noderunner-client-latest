import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";
import Loading from "../../component/Loading";
import { CardWrapper } from "../../component/Wrappers";

import { RESPONSE } from "../../helper/constant";
import { getERCTokenImage } from "../../helper/utils";

import customNFTStakingActions from "../../redux/customNFTStaking/actions";

const ERC721StakingModal = ({ nftToken, stakableTokens, loading, onClose }) => {
  const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  const handleStake = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedCardIds.length === 0) {
      toast.error("Select cards please");
      return;
    }

    if (stakeLoading) return;
    // console.log(selectedCardIds);
    setStakeLoading(true);
    dispatch(
      customNFTStakingActions.stakeERC721Card(
        nftToken,
        selectedCardIds,
        (status) => {
          setSelectedCardIds([]);
          setStakeLoading(false);
          if (status === RESPONSE.SUCCESS) {
            toast.success("Staked successfully");
            dispatch(customNFTStakingActions.getStakedERC721Cards(nftToken));
            dispatch(customNFTStakingActions.getMyERC721Staked(nftToken));
            dispatch(customNFTStakingActions.getTotalERC721Staked(nftToken));
            dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
            onClose();
          } else {
            toast.error("Staked failed");
          }
        }
      )
    );
  };

  const handleSelectCard = (e, cardId) => {
    e.preventDefault();
    e.stopPropagation();

    const oldSelectedCard = [...selectedCardIds];
    const findIndex = oldSelectedCard.findIndex((id) => id === cardId);
    if (findIndex >= 0) {
      oldSelectedCard.splice(findIndex, 1);
    } else {
      oldSelectedCard.push(cardId);
    }
    setSelectedCardIds([...oldSelectedCard]);
  };

  return (
    <NFTStakeModalContainer onClick={(e) => onClose()}>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Select NFT to stake" long />
      </MenuWrapper>
      <MenuWrapper className="animation-fadeInRight">
        <div className="menu-actions">
          <div className="menu-item selected-card-count">
            {`${selectedCardIds.length} NFT Selected`}
          </div>
          {selectedCardIds.length > 0 && (
            <div
              role="button"
              className="menu-item stake-button"
              onClick={(e) => handleStake(e)}
            >
              {stakeLoading ? (
                <LoadingTextIcon loadingText="Staking..." />
              ) : (
                `Stake selected`
              )}
            </div>
          )}
        </div>
      </MenuWrapper>
      <div
        className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
        style={{ paddingBottom: 100 }}
      >
        {loading ? (
          <Loading type="bubbles" color="#fec100" text="Loading..." />
        ) : stakableTokens.length > 0 ? (
          stakableTokens.map((token) => {
            const active = selectedCardIds.includes(token) ? "active" : "";
            return (
              <CardWrapper key={`stake_card_${token}`}>
                <div className={`card ${active}`}>
                  <img
                    src={getERCTokenImage(nftToken, token)}
                    alt={`${token}`}
                    className="card-image"
                  />
                  <div
                    className="card-border"
                    onClick={(e) => handleSelectCard(e, token)}
                  ></div>
                </div>
              </CardWrapper>
            );
          })
        ) : (
          <Loading
            type="bubbles"
            color="#fec100"
            text="No available NFTs to stake"
            loading={false}
          />
        )}
      </div>
    </NFTStakeModalContainer>
  );
};

export default ERC721StakingModal;

const NFTStakeModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: transparent;
  z-index: 5001;
  overflow-y: auto;
  padding-top: 100px;
  padding-left: 10%;
  padding-right: 10%;

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 75px 7.5% 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
      padding: 75px 0px 0px;
    }

    h2 {
      font-size: 1.875rem;
      font-family: Orbitron-Black;
      text-transform: uppercase;
      text-shadow: 5px 5px 3px #27787580;
      line-height: 1.875rem;
      text-align: center;
      color: #fec100;
    }

    .close-button {
      .MuiSvgIcon-root {
        width: 2.1em;
        height: 2.1em;
      }
      svg path {
        fill: #fec100;
      }
      &:hover {
        svg path {
          fill: #f628ca;
        }
      }
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0px 7.5%;

  @media screen and (max-width: 768px) {
    padding: 0px;
  }

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-right: 20px;
    text-align: center;
  }

  .menu-actions {
    display: flex;
    padding-left: 20px;
    flex-flow: row wrap;

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
      padding-left: 20px;
    }

    .stake-button {
      background-image: url("/static/images/bg/pages/stake/button.png");
      background-size: 100% 100%;
      font-family: Orbitron-Medium;
      color: #161617;
      margin-left: -12px;
      cursor: pointer;

      &:hover {
        background-image: url("/static/images/bg/pages/stake/button--active.png");
        color: #fec100;
      }
    }
  }
`;
