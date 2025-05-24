import styled from "styled-components";

export const GeneralContainer = styled.div`
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Контейнер займатиме всю висоту екрана */
`;
export const ContentWrapper = styled.div`
  flex: 1; /* Контент розтягується і футер завжди внизу */
`;
