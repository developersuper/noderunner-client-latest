import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";
import AmountInput from "../../component/Farm/AmountInput";

import hashWarsAction from "../../redux/hashWars/actions";
import farmsAction from "../../redux/farms/actions";
import { RESPONSE } from "../../helper/constant";
import { convertFromWei } from "../../helper/utils";

const NDRStakingModal = ({ token, staked, balance, onClose }) => {
  const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);

  const [amount, setAmount] = useState("0.0000000");
  const [isMax, setIsMax] = useState(false);

  const handleSetAmount = (input) => {
    if (input === "MAX") {
      setAmount(convertFromWei(balance["NDR"], 7));
      setIsMax(true);
    } else {
      setAmount(input);
      setIsMax(false);
    }
  };

  useEffect(() => {
    dispatch(farmsAction.getTokenBalance(token));
  }, [dispatch, token]);

  const handleStake = () => {
    if (stakeLoading) {
      return;
    }

    if (!checkAmount(amount)) {
      return;
    }

    setStakeLoading(true);
    dispatch(
      hashWarsAction.stakeNDR(token, amount, isMax, (status) => {
        setStakeLoading(false);
        dispatch(hashWarsAction.getNDRApproveStatus("NDR"));
        dispatch(hashWarsAction.getTotalNDRPerTeamStatus());
        dispatch(hashWarsAction.getTotalNDRPerUserStatus());
        callback(status);
        onClose();
      })
    );
  };

  const callback = (status) => {
    if (status === RESPONSE.INSUFFICIENT) {
      toast.error("Insufficient balance");
    }
    if (status === RESPONSE.ERROR) {
      toast.error("Your transaction has been failed");
    }
    if (status === RESPONSE.SUCCESS) {
      toast.success("Your transaction has been successfully");
    }
    if (status === RESPONSE.SHOULD_APPROVE) {
      toast.success("You should approve first");
    }
  };

  const checkAmount = (amount) => {
    if (isNaN(amount) || amount.trim() === "") {
      toast.error("Amount should be a number");
      return false;
    }
    if (parseFloat(amount) <= 0) {
      toast.error(`Amount should be greater than zero`);
      return false;
    }
    return true;
  };

  return (
    <NDRStakeModalContainer>
      <div className="close-icon">
        <CloseIcon onClick={(e) => onClose()} />
      </div>
      <div className="token">NDR</div>
      <div className="block">
        <div className="row">
          <span className="title">Staked:</span>
          <span className="value">{convertFromWei(staked, 4)}</span>
        </div>
        <div className="row">
          <span className="title">Balance:</span>
          <span className="value">{`${convertFromWei(balance["NDR"], 4)}`}</span>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <AmountInput
            className="amount"
            showMin={false}
            min={0}
            showMax={true}
            max={0}
            value={amount}
            onSetAmount={(amount) => handleSetAmount(amount)}
          />
        </div>
      </div>
      <div className="row">
        <button className="action stake" onClick={(e) => handleStake()}>
          {stakeLoading ? (
            <LoadingTextIcon loadingText="Staking..." />
          ) : (
              `STAKE`
            )}
        </button>
      </div>
    </NDRStakeModalContainer>
  );
};

export default NDRStakingModal;

const NDRStakeModalContainer = styled.div`
  position: fixed;
  top: calc(50vh - 200px);
  left: calc(50vw - 190px);
  width: 580px;
  height: 400px;
  background: url("/static/images/bg/components/card/card-border.png");
  background-color: rgba(0, 0, 0);
  background-size: 100% 100%;
  z-index: 999;
  padding: 26px 46px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .close-icon {
    color: white;
    margin-left: 30rem;
  }

  .token {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.7rem;
    margin-bottom: 10px;
  }

  .token1 {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  .token-link {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1rem;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    width: 100%;
    margin-bottom: 15px;
  }

  .row {
    display: flex;
    justify-content: center;
    width: 100%;

    font-family: Orbitron-Medium;
    font-size: 1.1rem;
    padding-top: 4px;
    padding-bottom: 4px;

    .title {
      color: #80f1ed;
      text-shadow: 5px 5px 3px #80f1ed80;
      padding-right: 5px;
    }

    .value {
      font-family: Orbitron-Black;
      color: #fec100;
      text-shadow: 5px 5px 3px #fec10080;
    }

    .action {
      flex: 1;
      border: none;
      outline: none;
      height: 80px;
      font-family: Orbitron-Black;
      font-size: 15px;

      &.approve {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.stake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.unstake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -20px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.claim {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -15px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }
    }

    .fee-label {
      font-family: Orbitron-Medium;
      color: #fec100;
    }

    .amount {
      flex: 1;
      height: 65px;
    }

    .str {
      height: 65px;
      width: 65px;
      border: 4px solid #e182ea;
      margin-left: 5px;
      font-family: Orbitron-Black;
      color: #fec100;
      text-align: center;
      box-sizing: border-box;
    }
  }
`;
