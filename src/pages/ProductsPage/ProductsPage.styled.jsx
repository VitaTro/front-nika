import styled from "styled-components";
export const WelcomeGeneral = styled.h1`
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: gray;
  text-shadow: 0 0 5px rgb(167, 182, 208);
`;
export const WelcomeContainer = styled.div`
  padding: 20px 190px;
`;
export const WelcomeList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 70px;
  gap: 70px;
`;
export const WelcomeItem = styled.li`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 20px;
`;
export const ImageBox = styled.img`
  // width: 100%;
  // height: auto;
  // max-height: 90%;
  object-fit: contain;
  margin: 15px;
`;
export const BoxContainer = styled.div`
  height: 250px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
`;
export const BoxHeader = styled.h2`
  font-family: "Nunito", sans-serif;
  color: darkred;
  font-weight: 700;
  margin-top: auto;
  text-align: center;
  text-shadow: 0 0 5px rgb(167, 182, 208);
`;
