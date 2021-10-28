import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import { Tab, Nav } from "react-bootstrap";

import UnlockWalletPage from "./UnlockWalletPage";
import NFTStaking from "../container/NFTStakingPage";
import CustomNFTStaking from "../container/CustomNFTStaking";
import ERC721Staking from "../container/ERC721Staking";

import { CUSTOM_NFT } from "../helper/constant";

import cardsActions from "../redux/cards/actions";
import memeStakingActions from "../redux/customNFTStaking/actions";

const Stake = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.getCards());
    dispatch(memeStakingActions.getCustomCards());
  }, [dispatch]);

  const { account } = useWallet();
  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <StakePageContainer>
      <Tab.Container defaultActiveKey="ACTIVE">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="ACTIVE">ACTIVE</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="CLOSED">CLOSED</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content style={{ minHeight: 'calc(100vh - 280px)' }}>

          <Tab.Pane eventKey="ACTIVE">
            <h2 className="notice">No Active Pools</h2>
          </Tab.Pane>

          <Tab.Pane eventKey="CLOSED">
            <NFTStaking active={false} />
            <CustomNFTStaking
              icon={"icons/meme.png"}
              nftToken={CUSTOM_NFT.MEME}
              active={false}
            />
            <CustomNFTStaking
              icon={"icons/doki.png"}
              nftToken={CUSTOM_NFT.DOKI}
              active={false}
            />
            <CustomNFTStaking
              icon={"icons/eth_men.png"}
              nftToken={CUSTOM_NFT.ETH_MEN}
              active={false}
            />
            <ERC721Staking
              icon={"icons/cometh.png"}
              nftToken={CUSTOM_NFT.COMETH}
              active={false}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </StakePageContainer>
  );
};

const StakePageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  padding-top: 30px;

  .nav-pills {
    margin: 0px;
  }

  .nav-pills .nav-item .nav-link {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

export default Stake;
