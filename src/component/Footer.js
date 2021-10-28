import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <a
        href="https://t.me/noderunners_channel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`/static/images/icons/logo1.png`}
          alt="NodeRunners Telegram"
          width="40"
        />
      </a>
      <a
        href="https://twitter.com/Node_Runners"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/logo3.png`} alt="NodeRunners Twitter" width="40"/>
      </a>
      <a
        href="https://discord.gg/cxJNsc2XZP"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/logo2.png`} alt="NodeRunners Discord" width="40"/>
      </a>
      <a
        href="https://noderunners.medium.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/logo4.png`} alt="NodeRunners Medium" width="40"/>
      </a>
      <a
        href="https://info.uniswap.org/pair/0x65d0a154d2425ce2fd5fed3bdae94d9a9afe55ce/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/uniswap.png`} alt="NodeRunners Uniswap" width="40"/>
      </a>
      <a
        href="https://opensea.io/collection/noderunners"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/static/images/icons/opensea.png`} alt="NodeRunners Opensea" width="37"/>
      </a>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 100px;
  box-sizing: border-box;

  img {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
export default Footer;
