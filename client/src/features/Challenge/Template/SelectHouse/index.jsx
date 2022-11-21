import React, { useState, useEffect, useMemo } from 'react';
import { Form, Radio, Spin } from 'antd';
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
  StyledDivWrapper,
  StyledFormWrapper,
  StyledH3Bolded,
  StyledHouseImg,
  StyledHouseRadioContainer,
  StyledRadioWrapper,
} from './styles';
import { useAuthServiceProvider } from '../../../../services/AuthServiceProvider';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';

const SelectHouse = ({ goToSalary, backToBudget }) => {
  const { getBearerHeader } = useAuthServiceProvider();
  const {
    game,
    getJob,
    getAllDwellings,
    getHouseMembers,
    updateGameById: updateSingleGameById,
    setHouse,
    getSalary,
  } = useGameServiceProvider();
  const [loading, setLoading] = useState(false);
  const [loadingHouses, setLoadingHouses] = useState(false);
  const [allHouses, setAllHouses] = useState([]);
  const lowEndSalary = useMemo(
    () => withMoneySymbol(getJob().salaryAverage * 0.75),
    [game.job]
  );
  const highEndSalary = useMemo(
    () => withMoneySymbol(getJob().salaryAverage * 1.25),
    [game.job]
  );
  const [form] = Form.useForm();

  const getAllHouses = () => {
    setLoadingHouses(true);
    getAllDwellings()
      .then((response) => {
        const qualifiedHouses = response.filter(
          (house) => house.maxOccupancy >= getHouseMembers() + 1
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
    updateSingleGameById(
      { house: values.selectedHouse },
      game.gameId,
      getBearerHeader()
    );

  const onFinish = (values) => {
    setLoading(true);
    setHouse(values.selectedHouse);
    if (getSalary()) {
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
      <StyledDivWrapper>
        <h1>Select House</h1>
        <StyledH3Bolded>
          The house must have enough for you and your household members
        </StyledH3Bolded>
        <StyledH3Bolded>
          Amount of people to house (including yourself):{' '}
          {getHouseMembers() + 1}
        </StyledH3Bolded>
        {getSalary() ? (
          <StyledBoldTitle>
            <StyledH3Bolded>
              Current Annual Salary {withMoneySymbol(getSalary())}
            </StyledH3Bolded>
            <StyledBasicDiv>
              Hint: House monthly payment should not be more than half of your
              monthly income
            </StyledBasicDiv>
          </StyledBoldTitle>
        ) : (
          <StyledH3Bolded>
            Potential annual salary range: {lowEndSalary}-{highEndSalary}
          </StyledH3Bolded>
        )}
      </StyledDivWrapper>
      <Spin spinning={loadingHouses}>
        <StyledFormWrapper
          layout="vertical"
          form={form}
          name="Choose House"
          onFinish={onFinish}
        >
          <Form.Item
            name="selectedHouse"
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
          <Form.Item style={{ textAlign: 'center' }}>
            <StyledButton
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Submit House
            </StyledButton>
          </Form.Item>
        </StyledFormWrapper>
      </Spin>
    </>
  );
};

export default SelectHouse;
