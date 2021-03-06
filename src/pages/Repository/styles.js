import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 15px;
  button {
    height: 50px;
    width: 20%;
    margin: 0 20px;
    border: 2px solid #444;
    border-radius: 4px;
    color: #000;
    font-weight: bold;

    &:hover {
      filter: brightness(90%);
    }

    &:active {
      filter: brightness(90%);
      transform: translateY(4px);
    }
  }
  #open {
    background-color: ${(props) =>
      props.filterState === 'open' ? '#7159c1' : '#fff'};
    color: ${(props) => (props.filterState === 'open' ? '#fff' : '#333')};
  }
  #closed {
    background-color: ${(props) =>
      props.filterState === 'closed' ? '#7159c1' : '#fff'};
    color: ${(props) => (props.filterState === 'closed' ? '#fff' : '#333')};
  }
  #all {
    background-color: ${(props) =>
      props.filterState === 'all' ? '#7159c1' : '#fff'};
    color: ${(props) => (props.filterState === 'all' ? '#fff' : '#333')};
  }
`;

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;
  align-items: center;
  button {
    border: 0;
    font-size: 16px;
    background-color: #fff;
    color: #7159c1;
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast--info {
    color: #343a40;
    background-color: #2fedad;
    box-shadow: '2px 2px 20px 2px rgba(0,0,0,0.3)';
    border-radius: 8px;
    min-height: 60px;
  }
`;
