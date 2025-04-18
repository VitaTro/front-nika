import styled from "styled-components";
export const EmptyState = styled.div`
  text-align: center;
  margin-top: 20px;
  img {
    width: 450px;
    margin-bottom: 10px;
  }
  p {
    font-size: 28px;
    color: #555;
  }
`;
export const StyledImage = styled.img`
  width: 450px;
  margin-bottom: 10px;
  filter: brightness(1);
  transition: filter 0.5s;
  &:hover {
    filter: brightness(1.1);
  }
`;
