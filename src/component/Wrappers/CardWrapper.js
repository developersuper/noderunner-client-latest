import styled from "styled-components";

const CardWrapper = styled.div`
  margin: 8px;

  .card {
    width: 232.5px;
    height: 324px;
    position: relative;
    padding: 12.75px 10.5px;
    background: transparent;
    z-index: 400;

    .card-image {
      width: 217.5px;
      height: 307.5px;
      position: absolute;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 240px;
      height: 332.25px;
      background: url("/static/images/bg/components/card/card-border.png");
      background-size: cover;
      cursor: pointer;
    }

    &.active {
      .card-border {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
    }
  }

  .strength-text{
    padding-left: 10px;
    padding-top: 5px;

    label {
      font-size: 16px;
      font-family: Orbitron-Medium;
      color: #80f1ed;
      margin-bottom: 0;
    }

    span {
      font-size: 16px;
      font-family: Orbitron-Black;
      color: #fec100;
      padding-left: 4.66667px;
    }
  }
`;

export default CardWrapper;
