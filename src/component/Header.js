import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import lpstakingActions from "../redux/lpstaking/actions";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const getCurrentUrl = (location) => {
    return location.pathname.split(/[?#]/)[0];
  };

  const checkIsActive = (location, url) => {
    const current = getCurrentUrl(location);

    if (!current || !url) {
      return false;
    }

    if (current === url || (current === "/" && url === "home")) {
      return true;
    }

    return current.indexOf(url) > -1;
  };

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "active" : "";
  };

  const getMenuName = () => {
    if (getMenuItemActive("home")) {
      return "Home";
    }

    if (getMenuItemActive("stake")) {
      return "Stake";
    }

    if (getMenuItemActive("get-heroes")) {
      return "Get Cards";
    }

    if (getMenuItemActive("farm")) {
      return "Farm";
    }

    if (getMenuItemActive("fight-villains")) {
      return "Fight Villains";
    }

    if (getMenuItemActive("hash-wars")) {
      return "Hash Wars";
    }

    return "";
  };

  const dispatch = useDispatch();
  const { account } = useWallet();

  const ndrBalance = useSelector((state) => state.LpStaking.ndrBalance);

  useEffect(() => {
    dispatch(lpstakingActions.getNDRBalance());
  }, [dispatch, account]);

  return (
    <HeaderWrapper className="header-menu d-flex justify-content-center animation-stretchRight">
      <ul className="desktop-menu-nav list-unstyled">
        <li className={`menu-item ${getMenuItemActive("home")} hover-effect2`}>
          <NavLink className="menu-link" to="home">
            <span className="menu-text">Home</span>
          </NavLink>
        </li>
        {/* <li
          className={`menu-item ${getMenuItemActive("news")} hover-effect2`}
        >
          <a
            className="menu-link"
            href="https://noderunners.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-text">News</span>
          </a>
        </li> */}
        <li
          className={`menu-item ${getMenuItemActive("my-cards")} hover-effect2`}
        >
          <a
            className="menu-link"
            href="https://opensea.io/account/noderunners"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-text">My Cards</span>
          </a>
        </li>
        <li className={`menu-item ${getMenuItemActive("stake")} hover-effect2`}>
          <NavLink className="menu-link" to="/stake">
            <span className="menu-text">Stake NFT</span>
          </NavLink>
        </li>
        <li className={`menu-item ${getMenuItemActive("farm")} hover-effect2`}>
          <NavLink className="menu-link" to="/farm">
            <span className="menu-text">Farm</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "get-heroes"
          )} hover-effect2`}
        >
          <NavLink className="menu-link" to="/get-heroes">
            <span className="menu-text">Get Cards</span>
          </NavLink>
        </li>
        {/* <li
          className={`menu-item ${getMenuItemActive("forum")} hover-effect2`}
        >
          <a
            className="menu-link"
            href="http://gov.noderunners.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-text">Forum</span>
          </a>
        </li> */}
        {/* <li className={`menu-item ${getMenuItemActive("fight-villains")} hover-effect2`}>
          <NavLink className="menu-link" to="/fight-villains">
            <span className="menu-text">Fight Villains</span>
          </NavLink>
        </li> */}
        <li
          className={`menu-item ${getMenuItemActive(
            "hash-wars"
          )} hover-effect2`}
        >
          <NavLink className="menu-link" to="/hash-wars">
            <span className="menu-text">Hash Wars</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "unlock-wallet"
          )} hover-effect2`}
        >
          <NavLink className="menu-link" to={account ? "#" : "/unlock-wallet"}>
            <span className="menu-text">
              {account ? (
                <span className="menu-text">
                  <strong>{`${(ndrBalance / Math.pow(10, 18)).toFixed(
                    4
                  )} `}</strong>
                  NDR
                </span>
              ) : (
                "Unlock Wallet"
              )}
            </span>
          </NavLink>
        </li>
      </ul>
      <ul className="mobile-menu-nav list-unstyled">
        <li className="menu-item">
          <div className="menu-link">
            {!mobileMenu ? (
              <MenuIcon onClick={(e) => setMobileMenu(true)} />
            ) : (
              <CloseIcon onClick={(e) => setMobileMenu(false)} />
            )}
            <span className="menu-text">{getMenuName()}</span>
          </div>
        </li>
        <li
          className={`menu-item ${getMenuItemActive(
            "unlock-wallet"
          )} hover-effect2`}
        >
          <NavLink className="menu-link" to={account ? "#" : "/unlock-wallet"}>
            <span className="menu-text">
              {account ? (
                <span className="menu-text">
                  <strong>{`${(ndrBalance / Math.pow(10, 18)).toFixed(
                    4
                  )} `}</strong>
                  NDR
                </span>
              ) : (
                "Unlock Wallet"
              )}
            </span>
          </NavLink>
        </li>
        {mobileMenu && (
          <div className="mobile-menu" onClick={(e) => setMobileMenu(false)}>
            <NavLink
              className={`${getMenuItemActive("home")}`}
              to="/home"
            >
              Home
            </NavLink>
            {/* <a
              href="https://noderunners.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              News
            </a> */}
            <a
              href="https://opensea.io/account/noderunners"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Cards
            </a>
            <NavLink className={`${getMenuItemActive("stake")}`} to="/stake">Stake NFT</NavLink>
            <NavLink className={`${getMenuItemActive("farm")}`} to="/farm">Farm</NavLink>
            <NavLink className={`${getMenuItemActive("get-heroes")}`} to="/get-heroes">Get Cards</NavLink>
            {/* <NavLink className={`${getMenuItemActive("fight-villains")}`} to="/fight-villains">Fight Villains</NavLink> */}
            {/* <a
              href="http://gov.noderunners.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forum
            </a> */}
            <NavLink className={`${getMenuItemActive("hash-wars")}`} to="/hash-wars">Hash Wars</NavLink>
          </div>
        )}
      </ul>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  .menu-item {
    height: 50px;
    margin-right: -17.5px;
    text-align: center;
    background-size: 100% 100%;

    .menu-link {
      height: 100%;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;

      .menu-text {
        color: #000000;
        font-size: 1rem;
        line-height: 2rem;
        font-family: Orbitron-Medium;
        margin-left: -3.17px;
        margin-top: -4.66px;
        display: inline-block;
        text-shadow: 3.5px 4.67px 2.1px
          ${(props) => props.theme.darken("#277875", 0.5)};
      }
    }

    &.active {
      .menu-link {
        .menu-text {
          color: #fec100;
          font-weight: 900;
        }
      }
    }
  }

  .desktop-menu-nav {
    margin-left: -18px;
    margin-bottom: 0px;
    display: flex;

    @media screen and (max-width: 1024px) {
      display: none;
    }

    .menu-item {

      background-image: url("/static/images/bg/components/header/menu-item-2-bg.png");
      width: 149.22px;

      &.active {
        background-image: url("/static/images/bg/components/header/menu-item-2-bg--active.png");
      }

      &:nth-of-type(1) {
        background-image: url("/static/images/bg/components/header/menu-item-1-bg.png");
        width: 145.53px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-1-bg--active.png");
        }
      }

      // &:nth-of-type(2) {
      //   background-image: url("/static/images/bg/components/header/menu-item-2-bg.png");
      //   width: 149.22px;

      //   &.active {
      //     background-image: url("/static/images/bg/components/header/menu-item-2-bg--active.png");
      //   }
      // }

      // &:nth-of-type(4) {
      //   background-image: url("/static/images/bg/components/header/menu-item-3-bg.png");
      //   width: 154.16px;

      //   &.active {
      //     background-image: url("/static/images/bg/components/header/menu-item-3-bg--active.png");
      //   }
      // }

      // &:nth-of-type(5) {
      //   background-image: url("/static/images/bg/components/header/menu-item-4-bg.png");
      //   width: 180.06px;

      //   &.active {
      //     background-image: url("/static/images/bg/components/header/menu-item-4-bg--active.png");
      //   }
      // }

      &:nth-of-type(7) {
        background-image: url("/static/images/bg/components/header/menu-item-5-bg.png");
        width: 209.05px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-5-bg--active.png");
        }
      }
    }
  }

  .mobile-menu-nav {
    display: none;
    padding: 10px 20px 5px 10px;
    height: 50px;
    box-sizing: border-box;

    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: row;
      width: 100vw;
      max-width: 100%;
    }

    .menu-item {
      flex: 1;

      svg {
        margin-top: -10px;
      }

      .menu-text {
        margin-top: -10px;
      }

      &:nth-of-type(1) {
        background-image: url("/static/images/bg/components/header/menu-item-1-bg.png");
        padding-left: 15px;

        .menu-text {
          flex: 1;
        }
      }

      &:nth-of-type(2) {
        background-image: url("/static/images/bg/components/header/menu-item-5-bg.png");
        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-5-bg--active.png");
        }
      }
    }

    .mobile-menu {
      position: absolute;
      width: 100vw;
      max-width: 100%;
      height: calc(100vh - 60px);
      background: #000;
      opacity: 0.9;
      z-index: 500;
      left: 0px;
      top: 55px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      padding-top: 100px;

      a {
        font-size: 2rem;
        line-height: 3rem;
        color: #80f1ed;
        font-family: Orbitron-Black;
        text-shadow: 4px 4px 2.7px #27787580;
        margin-top: 10px;

        &.active {
          color: #fec100;
        }
      }
    }
  }
`;

export default Header;
