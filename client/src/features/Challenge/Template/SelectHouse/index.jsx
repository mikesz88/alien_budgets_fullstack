import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Form, Radio, Spin } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';
import {
  ERROR,
  error,
  SUCCESS,
  success,
  withMoneySymbol,
} from '../../../../common/constants';
import Notification from '../../../../components/Notification';
import StyledBasicDiv from '../../../../components/BasicDiv';
import {
  StyledBoldTitle,
  StyledHouseImg,
  StyledHouseRadioContainer,
  StyledRadioWrapper,
} from './styles';
import { useAuthServiceProvider } from '../../../../providers/AuthServiceProvider';

const SelectHouse = ({ goToSalary, backToBudget }) => {
  const { getBearerHeader } = useAuthServiceProvider();
  const { gameService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingHouses, setLoadingHouses] = useState(false);
  const [allHouses, setAllHouses] = useState([]);
  const lowEndSalary = useMemo(
    () => withMoneySymbol(gameService.getJob().salaryAverage * 0.75),
    [gameService.job]
  );
  const highEndSalary = useMemo(
    () => withMoneySymbol(gameService.getJob().salaryAverage * 1.25),
    [gameService.job]
  );
  const [form] = Form.useForm();

  const getAllHouses = () => {
    setLoadingHouses(true);
    gameService
      .getAllDwellings()
      .then((response) => {
        const qualifiedHouses = response.filter(
          (house) => house.maxOccupancy >= gameService.getHouseMembers() + 1
        );
        setAllHouses(qualifiedHouses);
        Notification(success, SUCCESS, 'Eligible Houses Shown.');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Game Service Connection Error. Try again later.'
        )
      )
      .finally(() => setLoadingHouses(false));
  };

  const updateGameById = (values) =>
    gameService.updateGameById(
      { house: values.selectedHouse },
      gameService.gameId,
      getBearerHeader()
    );

  const onFinish = (values) => {
    setLoading(true);
    gameService.setHouse(values.selectedHouse);
    if (gameService.getSalary()) {
      updateGameById(values);
      setLoading(false);
      return backToBudget();
    }
    setLoading(false);
    return goToSalary();
  };

  useEffect(() => getAllHouses(), []);

  return (
    <>
      <StyledBasicDiv>
        The house must have enough for you and your household members
      </StyledBasicDiv>
      <StyledBasicDiv>
        Amount of people to house (including yourself):{' '}
        {gameService.getHouseMembers() + 1}
      </StyledBasicDiv>
      {gameService.getSalary() ? (
        <StyledBoldTitle>
          <StyledBasicDiv>
            Current Annual Salary {withMoneySymbol(gameService.getSalary())}
          </StyledBasicDiv>
          <StyledBasicDiv>
            Hint: House monthly payment should not be more than half of your
            monthly income
          </StyledBasicDiv>
        </StyledBoldTitle>
      ) : (
        <StyledBasicDiv>
          Potential annual salary range: {lowEndSalary}-{highEndSalary}
        </StyledBasicDiv>
      )}
      <Spin spinning={loadingHouses}>
        <Form
          layout="vertical"
          form={form}
          name="Choose House"
          onFinish={onFinish}
        >
          <Form.Item
            name="selectedHouse"
            label="SelectHouse"
            rules={[
              {
                required: true,
                message: 'Please select a house!',
              },
            ]}
          >
            <Radio.Group>
              <StyledRadioWrapper>
                {allHouses.map((house) => {
                  const housePayment = withMoneySymbol(house.monthlyPayment);
                  return (
                    <Radio key={house._id} value={house}>
                      <StyledHouseRadioContainer>
                        <StyledHouseImg src={house.dwellingUrl} alt="house" />
                      </StyledHouseRadioContainer>
                      <StyledBasicDiv>{house.dwelling}</StyledBasicDiv>
                      <StyledBasicDiv>{housePayment} per month</StyledBasicDiv>
                      <StyledBasicDiv>
                        Max Occupancy: {house.maxOccupancy}
                      </StyledBasicDiv>
                    </Radio>
                  );
                })}
              </StyledRadioWrapper>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <StyledButton
              loading={loading}
              larger="true"
              type="primary"
              htmlType="submit"
            >
              Submit House
            </StyledButton>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default SelectHouse;
