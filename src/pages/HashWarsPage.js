import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { Tab, Nav } from "react-bootstrap";
import styled from "styled-components";

import UnlockWalletPage from "./UnlockWalletPage";
import {
  ActiveWar,
  OpenActiveWar,
  FinishedWars,
  OpenFinishedWar
} from "../container/HashWarsBoard";
import hashWarsAction from "../redux/hashWars/actions";
import "../vendor/index.scss";

const HashWars = () => {
  const { account } = useWallet();
  // teamId = "0": not join any team, teamId = "1": RED team, teamId = "2": BLUE team
  const teamId = useSelector((state) => state.HashWars.teamId);
  const totalHashPerTeam1 = useSelector((state) => state.HashWars.totalHashPerTeam1);
  const totalHashPerTeam2 = useSelector((state) => state.HashWars.totalHashPerTeam2);
  const dispatch = useDispatch();

  const [myTeam, setMyTeam] = useState(null);
  const [openTeam, setOpenTeam] = useState(null);
  const [openRound, setOpenRound] = useState(null);

  const [battleEnded, setBattleEnded] = useState(false);
  // Random component
  const Completionist = () => <span>The Battle ended!</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setBattleEnded(true);
      return <Completionist />;
    } else {
      if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
        setBattleEnded(false);
        // Render a countdown
        return <span>{days}d - {hours}h - {minutes < 10 ? '0'+minutes : minutes}m - {seconds < 10 ? '0'+seconds : seconds}s</span>;
      } else {
        setBattleEnded(true);
        // Render a completed state
        return <Completionist />;
      }
    }
  };

  useEffect(() => {
    dispatch(hashWarsAction.getTeamIdPerUserStatus());
    dispatch(hashWarsAction.getTotalHashPerTeamStatus());
  }, [dispatch, setMyTeam]);

  const handleOpenTeam = (team, round) => {
    setOpenTeam(team);
    setOpenRound(round);
  }

  const handleResetOpenTeam = () => {
    setOpenTeam(null);
    setOpenRound(null);
  }

  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <HashWarsPageContainer>
      <Tab.Container defaultActiveKey="ACTIVE">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="ACTIVE" className="nav-active">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="FINISHED" className="nav-finished">Finished</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ACTIVE">
            {myTeam === null &&
              <ActiveWar
                teamId={teamId}
                totalHashPerTeam1={totalHashPerTeam1}
                totalHashPerTeam2={totalHashPerTeam2}
                setMyTeam={setMyTeam}
                battleEnded={battleEnded}
                renderer={renderer}
              />
            }
            {myTeam !== null &&
              <OpenActiveWar
                teamId={teamId}
                myTeam={myTeam}
                setMyTeam={setMyTeam}
                totalHashPerTeam1={totalHashPerTeam1}
                totalHashPerTeam2={totalHashPerTeam2}
                battleEnded={battleEnded}
              />
            }
          </Tab.Pane>
          <Tab.Pane eventKey="FINISHED">
            {openTeam === null &&
              <FinishedWars
                handleOpenTeam={handleOpenTeam}
                battleEnded={battleEnded}
              />
            }
            {openTeam !== null &&
              <OpenFinishedWar
                handleResetOpenTeam={handleResetOpenTeam}
                openTeam={openTeam}
                openRound={openRound}
                battleEnded={battleEnded}
              />
            }
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </HashWarsPageContainer>
  );
};

const HashWarsPageContainer = styled.div`
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
`;

export default HashWars;
