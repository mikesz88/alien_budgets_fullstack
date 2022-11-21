import styled from 'styled-components';
import { Form } from 'antd';

export const StyledDivWrapper = styled.div`
  text-align: center;
`;

export const StyledH3Bolded = styled.h3`
  font-weight: bold;
`;

export const StyledFormWrapper = styled(Form)`
  width: 900px;
  margin: 0 auto;

  @media (max-width: 1023px) {
    width: 500px;
    margin: 0 auto;
  }
`;

export const StyledBoldTitle = styled.div`
  font-weight: bold;
`;

export const StyledRadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledHouseRadioContainer = styled.div`
  width: 200px;
  height: 200px;

  @media (max-width: 1023px) {
    width: 150px;
    height: 150px;
  }
`;

export const StyledHouseImg = styled.img`
  width: 100%;
  height: 100%;
`;
