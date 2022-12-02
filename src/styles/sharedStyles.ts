import { css } from "lit";

export const sharedStyles = css`
  .d-flex {
    display: flex;
    flex-wrap: wrap;
  }
  .w-inherit {
    width: inherit;
  }
  .w-50 {
    width: 50%;
  }
  .w-100 {
    width: 100%;
  }
  .h-50 {
    height: 50%;
  }
  .h-80 {
    height: 80%;
  }
  .h-20 {
    height: 20%;
  }
  .h-100 {
    height: 100%;
  }
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .align-items-center {
    align-items: center;
  }
  .align-content-space {
    align-content: space-between;
  }
  .justify-content-center {
    justify-content: center;
  }
  .bg-transparent {
    background: transparent;
  }
  .color-grey {
    color: grey !important;
  }
  .header-btn {
    background: transparent;
    color: grey;
    border: unset;
    outline: unset;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
  }
  .header-btn:hover {
    background: lightgrey;
  }

  .divider-h {
    border: 1px solid black;
    width: 100%;
    margin: 0.5rem 0;
  }

  .base-btn {
    background: transparent;
    color: black;
    border: unset;
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .fixed-bottom {
    position: absolute;
    bottom: 0;
  }
`;
