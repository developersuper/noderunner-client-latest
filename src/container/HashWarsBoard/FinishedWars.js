import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import cn from "classnames";

import { finishedHashWars } from "../../helper/contractBattle";
import finishWarsAction from "../../redux/finishedWars/actions";
import "../../vendor/index.scss";
import { convertFromWei } from "../../helper/utils";

const etherscanLink = "https://etherscan.io/address/" + finishedHashWars[0].prod.address;
const FinishedWars = ({
  handleOpenTeam, battleEnded
}) => {
  const aaa = useSelector((state) => state.FinishedWars);
  const finishTeamId = useSelector((state) => state.FinishedWars.finishTeamId);
  const finishTotalHashPerTeam1 = useSelector((state) => state.FinishedWars.finishTotalHashPerTeam1);
  const finishTotalHashPerTeam2 = useSelector((state) => state.FinishedWars.finishTotalHashPerTeam2);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(finishWarsAction.getFinishTeamIdPerUserStatus());
    dispatch(finishWarsAction.getFinishTotalHashPerTeamStatus());
  }, [dispatch]);

  const warResult = (team = 1, index) => {
    if (finishTotalHashPerTeam1[index] > finishTotalHashPerTeam2[index]) {
      return team === 1 ? 'Win' : 'Lose';
    } else if (finishTotalHashPerTeam1[index] < finishTotalHashPerTeam2[index]){
      return team === 1 ? 'Lose' : 'Win';
    } else {
      return 'Draw';
    }
  }

  // console.log(aaa);
  return (
    <FinishedWarsContainer>
      <div
        className="animation-fadeInLeft"
        style={{ paddingBottom: 100 }}
      >
        {finishedHashWars.slice(0,1).map((key, index) => (
          <div className="finished" key={index}>
            <div className={cn(
              "finished-hash-wars",
              warResult(1, index) ==='Win'
                ? "finished-hash-wars--red"
                : warResult(1, index) ==='Lose'
                  ? "finished-hash-wars--blue"
                  : "finished-hash-wars--draw",
              "d-flex",
              "flex-wrap"
            )}>
              <div className="red-team" style={{ width: '40%' }}>
                <p className="p2-text sky">{warResult(1, index)}</p>  
            <p className="p1-text red">RED {finishTotalHashPerTeam1[index] !== '0' ? convertFromWei(finishTotalHashPerTeam1[index], 2) : '0'}</p>
              </div>
              <p className="p2-text-bold yellow" style={{ width: '20%', maxWidth: '170px' }}>Round {key.round}</p>
              <div className="blue-team" style={{ width: '40%' }}>
                <p className="p2-text sky">{warResult(2, index)}</p>
                <p className="p1-text blue">BLUE {finishTotalHashPerTeam2[index] !== '0' ? convertFromWei(finishTotalHashPerTeam2[index], 2) : '0'}</p>
              </div>
            </div>
            <div className="open-button d-flex flex-wrap">
              {finishTeamId[index] === "1" ? <div role="button" className="open-button-red p2-text-bold yellow" onClick={() => handleOpenTeam('1', key.round)}>Open Red</div>
              : <div style={{width: '40%', maxWidth: '250px'}}></div>}
              <div className="space-temp"><a href={etherscanLink} target="_blank" rel="noopener noreferrer">
                <div style={{width: '100%', height: '50px', textAlign:'center', padding: '10px'}}><span className="p2-text-bold sky">etherscan.io</span></div>
              </a></div>
              {finishTeamId[index] === "2" ? <div role="button" className="open-button-blue p2-text-bold yellow" onClick={() => handleOpenTeam('2', key.round)}>Open Blue</div>
              : <div style={{width: '40%', maxWidth: '250px'}}></div>}
            </div>
          </div>
        ))}
      </div>
    </FinishedWarsContainer>
  );
};

const FinishedWarsContainer = styled.div`
  width: 100vw;
  max-width: 100%;

  .nav-pills {
    margin-top: 0px;
    margin-bottom: 40px;
  }
  .nav-pills .nav-item {
    width: 50%;
  }
  .nav-pills .nav-item .nav-link {
    font-size: 30px;
    padding: 0 1rem;
  }
  .nav-active {
    text-align: end;
  }
  .nav-finished {
    text-align: start;
  }

  .round {
    background-image: url("/static/images/bg/pages/hash-wars/round.png");
    background-size: 100% 100%;
    padding: 4px 40px;
  }

  .hash-wars-round {
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    max-width: 840px;
    width: calc(100% - 20px);

    .time-left {
      border-right: 2px solid #80f1ed;
      display: grid;
      width: 50%;
      text-align: center;
    }
    .prize-pool {
      border-left: 2px solid #80f1ed;
      display: grid;
      width: 50%;
      text-align: center;
    }

    &-join {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      margin-top: 40px;
      width: calc(100% - 20px);
      .join-red {
        background-image: url("/static/images/bg/red-button.png");
        background-size: 100% 100%;
        max-width: 447px;
        height: 66px;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .join-blue {
        background-image: url("/static/images/bg/blue-button.png");
        background-size: 100% 100%;
        max-width: 447px;
        height: 66px;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .team-value {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-detail {
      display: inline-grid;
      &:nth-child(n+2) {
        margin-left: 1rem;
      }
      text-align: center;
    }
  }

  .hash-wars-round-detail {
    margin-top: 60px;
    &-hash {
      width: calc(100% - 20px);
      max-width: 1139px;
      height: 52px;
      margin: auto;
    }
    &-bar {
      // background-image: url("/static/images/bg/progress-bar.png");
      // background-size: 100% 100%;
      .red-team-bar {
        background-color: #FA0046;
        width: 60%;
        height: calc(100% - 8px);
      }
      .blue-team-bar {
        background-color: #aaa;
        width: 40%;
        height: calc(100% - 8px);
      }
    }
    &-per-value {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 2rem;
      width: calc(100% - 20px);
      max-width: 1139px;
      margin-right: auto;
      margin-left: auto;
    }
  }

  .margin-auto {
    margin: auto;
  }

  .my-round {
    &-header {
      padding-left: 1rem;
      &-title {
        width: calc(100% - 1rem);
      }
      @media screen and (min-width: 1320px) {
        padding-left: 2rem;
        &-title {
          width: calc(100% - 2rem);
        }
      }
      @media screen and (min-width: 1440px) {
        padding-left: 4rem;
        &-title {
          width: calc(100% - 4rem);
        }
      }
    }
    &-detail {
      margin: auto;
      padding: 1rem;
      @media screen and (min-width: 769px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .team-round {
        background-size: 100% 100%;
        width: 207px;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        &--red {
          background-image: url("/static/images/bg/pages/hash-wars/round-red.png");
        }
        &--blue {
          background-image: url("/static/images/bg/pages/hash-wars/round-blue.png");
        }
        &--sky {
          background-image: url("/static/images/bg/pages/hash-wars/round.png");
        }
      }
      &-team {
        @media screen and (min-width: 769px) {
          margin-right: 2rem;
          margin-bottom: 0;
        }
        margin-bottom: 1rem;
        a {
          text-decoration: underline;
          margin-top: 4px;
          margin-left: 2rem;
        }
      }
      &-my-stats {

      }
      .detail-board {
        border: 3px solid #80f1ed;
        box-shadow: 0px 5px 3px #80f1ed80;
        padding: 1rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
    }
    .stake-button {
      background-size: 100% 100%;
      max-width: 364px;
      height: 84px;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &--pink {
        background-image: url("/static/images/bg/pink-button.png");
      }
      &--sky {
        background-image: url("/static/images/bg/sky-button.png");
      }
    }
  }

  .finished {
    margin-bottom: 35px;
    .finished-hash-wars {
      align-items: center;
      width: calc(100% - 4rem);
      max-width: 1160px;
      margin: auto;
      margin-bottom: 0.5rem;
      justify-content: space-evenly;
      &--red {
        border: 4px solid #FA0046;
      }
      &--blue {
        border: 4px solid #0287F0;
      }
      &--draw {
        border: 4px solid #FEC100;
      }
    }
    .open-button {
      justify-content: space-evenly;
      width: calc(100% - 4rem);
      max-width: 1160px;
      margin: auto;
      &-red {
        background-image: url("/static/images/bg/red-button.png");
        background-size: 100% 100%;
        width: 40%;
        max-width: 250px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .space-temp {
        max-width: 170px;
        width: 20%;
      }
      &-blue {
        background-image: url("/static/images/bg/blue-button.png");
        background-size: 100% 100%;
        padding: 2px 24px;
        width: 40%;
        max-width: 250px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default FinishedWars;
