/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Form, Radio, Row, Spin } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const salaryWithMoneySymbol = (salary) =>
  salary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const SelectHouse = ({ goToSalary }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingHouses, setLoadingHouses] = useState(false);
  const [allHouses, setAllHouses] = useState([]);
  const lowEndSalary = salaryWithMoneySymbol(
    gameService.getJob().salaryAverage * 0.75
  );
  const highEndSalary = salaryWithMoneySymbol(
    gameService.getJob().salaryAverage * 1.25
  );
  const [form] = Form.useForm();

  const getAllHouses = () => {
    setLoadingHouses(true);
    gameService
      .getAllDwellings()
      .then((response) => {
        console.log(response);
        const qualifiedHouses = response.filter(
          (house) => house.maxOccupancy >= gameService.getHouseMembers() + 1
        );
        setAllHouses(qualifiedHouses);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingHouses(false));
  };

  const onFinish = (values) => {
    setLoading(true);
    gameService.setHouse(values.selectedHouse);
    updateService();
    console.log(gameService.getHouse());
    setLoading(false);
    goToSalary();
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <>
      <div>The house must have enough for you and your household members</div>
      <div>
        Amount of people to house (including yourself):{' '}
        {gameService.getHouseMembers() + 1}
      </div>
      <div>
        Potential annual salary range: {lowEndSalary}-{highEndSalary}
      </div>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {allHouses.map((house) => (
                  <Radio key={house._id} value={house}>
                    <div style={{ width: '200px', height: '200px' }}>
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={house.dwellingUrl}
                        alt="house"
                      />
                    </div>
                    <div>{house.dwelling}</div>
                    <div>
                      {`${house.monthlyPayment.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })} per month`}
                    </div>
                    <div>Max Occupancy: {house.maxOccupancy}</div>
                  </Radio>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <StyledButton
              loading={loading}
              larger="true"
              type="primary"
              htmlType="submit"
            >
              Submit Changes
            </StyledButton>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default SelectHouse;
