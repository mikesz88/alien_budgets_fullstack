/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
  useMemo,
} from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { UserContext } from '../../../App';
import StyledButton from '../../../components/PrimaryButton';
import TestMyMath from './TestMyMath';

const requiredCells = [
  'Monthly House/Apartment Payment',
  'Utilities (Electricity, Gas, Water/Sewer, Internet/Phone, Trash)',
  'Savings (This will carry over to next month)',
  'Groceries ($50 per person minium)',
];

const withMoneySymbol = (salary) =>
  salary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    if (!requiredCells.includes(record[dataIndex])) {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      // console.log(values.chosenBudget.toFixed(2));
      // console.log(+(+values.chosenBudget).toFixed(2));
      values.chosenBudget = +(+values.chosenBudget).toFixed(2);
      console.log(values.chosenBudget);
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
          {
            required: true,
            type: Number,
            message:
              'You must write a valid number. (No money symbols or spaces)',
          },
        ]}
      >
        <Input
          type={dataIndex === 'budgetItem' ? 'text' : 'number'}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        style={{ padding: '5px 12px', cursor: 'pointer' }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const MonthlyBudget = ({ findAnotherHouse }) => {
  const { gameService, updateService } = useContext(UserContext);
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      budgetItem: 'Monthly House/Apartment Payment',
      requiredMinimum: withMoneySymbol(gameService.getHouse().monthlyPayment),
      chosenBudget: gameService.getHouse().monthlyPayment,
    },
    {
      key: '1',
      budgetItem:
        'Utilities (Electricity, Gas, Water/Sewer, Internet/Phone, Trash)',
      requiredMinimum: withMoneySymbol(
        gameService.getUtilities() * gameService.getHouse().monthlyPayment
      ),
      chosenBudget: +(
        gameService.getUtilities() * gameService.getHouse().monthlyPayment
      ).toFixed(2),
    },
    {
      key: '2',
      budgetItem: 'Savings (This will carry over to next month)',
      requiredMinimum: withMoneySymbol(0),
      chosenBudget: 0,
    },
    {
      key: '3',
      budgetItem: 'Groceries ($50 per person minium)',
      requiredMinimum: withMoneySymbol(
        (gameService.getHouseMembers() + 1) * 50
      ),
      chosenBudget: (gameService.getHouseMembers() + 1) * 50,
    },
  ]);
  const [count, setCount] = useState(dataSource.length);
  const [taxes, setTaxes] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [incomeToSpend, setIncomeToSpend] = useState(0);
  const [newBudgetItem, setNewBudgetItem] = useState('');
  const [openTestMyMath, setOpenTestMyMath] = useState(false);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Budget Item (Can only edit item names you created)',
      dataIndex: 'budgetItem',
      editable: true,
    },
    {
      title: 'Required Minimum',
      dataIndex: 'requiredMinimum',
    },
    {
      title: 'Write your budget (Click the number to edit)/Numbers only',
      dataIndex: 'chosenBudget',
      editable: true,
    },
    {
      title: 'Delete Item',
      dataIndex: 'deleteItem',
      render: (_, record) =>
        !requiredCells.includes(record.budgetItem) ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : (
          <span>Unable to Delete</span>
        ),
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: `${count}`,
      budgetItem: newBudgetItem,
      requiredMinimum: withMoneySymbol(0),
      chosenBudget: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setNewBudgetItem('');
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const changeTaxes = (event) => {
    console.log(event.target.value);
    setTaxes(+event.target.value);
  };

  const changeMonthlyIncome = (event) => {
    console.log(event.target.value);
    setMonthlyIncome(+event.target.value);
  };

  const changeIncomeToSpend = (event) => {
    console.log(event.target.value);
    setIncomeToSpend(+event.target.value);
  };

  const changeBudgetItem = (event) => {
    console.log(event.target.value);
    setNewBudgetItem(event.target.value);
  };

  const remainingBalance = useMemo(
    () =>
      withMoneySymbol(
        incomeToSpend -
          dataSource.reduce(
            (total, { chosenBudget }) => total + chosenBudget,
            0
          )
      ),
    [incomeToSpend, dataSource]
  );

  const openTestMyMathModal = (boolean) => {
    setOpenTestMyMath(boolean);
  };

  console.log([
    ...dataSource,
    { budgetItem: 'monthlyIncome', chosenBudget: monthlyIncome },
    { budgetItem: 'taxes', chosenBudget: taxes },
    { budgetItem: 'incomeToSpend', chosenBudget: incomeToSpend },
  ]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          fontSize: '0.75rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '300px',
            height: '225px',
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <div>Current Annual Salary:</div>
            <div>{withMoneySymbol(gameService.getSalary())}</div>
          </div>
          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              {`What is your monthly salary? Please include this amount (${withMoneySymbol(
                gameService.getSavings()
              )}) to
            this to get the correct amount. (Round to the nearest tenth)`}
            </div>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={changeMonthlyIncome}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '300px',
            height: '225px',
          }}
        >
          <div>
            <div>
              Don&apos;t Forget Taxes! (In this Alien World they only ask you to
              pay a %10 income tax.)
            </div>
            <ul>
              <li>(Round to the nearest tenth)</li>
              <li>Hints:</li>
              <li>Take your monthly salary and multiply it by 10%.</li>
              <li>OR</li>
              <li>Divide your monthly salary by how many months per year.</li>
            </ul>
          </div>
          <Input type="number" value={taxes} onChange={changeTaxes} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: `${
              gameService.getMonth() === 0 ? 'space-between' : 'flex-end'
            }`,
            width: '300px',
            height: '225px',
          }}
        >
          {gameService.getMonth() === 0 ? (
            <StyledButton
              style={{ marginTop: '0' }}
              type="primary"
              onClick={findAnotherHouse}
            >
              Choose Different House
            </StyledButton>
          ) : null}
          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              What is the remaining balance to spend on your budget? (Round to
              the nearest tenth)
            </div>
            <Input
              type="number"
              value={incomeToSpend}
              onChange={changeIncomeToSpend}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledButton
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
          disabled={
            newBudgetItem.length < 3 ||
            dataSource.some(
              (budgetItem) =>
                newBudgetItem.toLowerCase().trim() ===
                budgetItem.budgetItem.toLowerCase().trim()
            )
          }
        >
          Add a row
        </StyledButton>
        <Input
          placeholder="Write name of new budget Item"
          type="text"
          value={newBudgetItem}
          onChange={changeBudgetItem}
        />
      </div>
      {newBudgetItem && newBudgetItem.length < 3 ? (
        <div style={{ color: 'red' }}>Must be at least 3 characters long</div>
      ) : null}
      {dataSource.some(
        (budgetItem) =>
          newBudgetItem.toLowerCase().trim() ===
          budgetItem.budgetItem.toLowerCase().trim()
      ) ? (
        <div style={{ color: 'red' }}>
          Cannot be the same name as another budget item.
        </div>
      ) : null}
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div>
          You must spend all the money. You have{' '}
          <span
            style={{
              fontWeight: 'bold',
              color: `${remainingBalance < 0 ? 'red' : ''}`,
            }}
          >
            {remainingBalance}
          </span>{' '}
          left to spend
        </div>
        <div>
          You must have a{' '}
          <span style={{ fontWeight: 'bold' }}>ZERO BALANCE</span> in order to
          test your math.
        </div>
        {dataSource.length < 7 ? (
          <div>Please include at least 3 more items to buy this month</div>
        ) : null}
        <StyledButton
          disabled={dataSource.length < 7 && remainingBalance !== 0}
          type="primary"
          onClick={() => {
            console.log(dataSource);
            openTestMyMathModal(true);
          }}
        >
          Test my math!
        </StyledButton>
      </div>
      {openTestMyMath ? (
        <TestMyMath
          toggleVisibility={openTestMyMathModal}
          open={openTestMyMath}
          data={[
            ...dataSource,
            { budgetItem: 'monthlyIncome', chosenBudget: monthlyIncome },
            { budgetItem: 'taxes', chosenBudget: taxes },
            { budgetItem: 'incomeToSpend', chosenBudget: incomeToSpend },
          ]}
        />
      ) : null}
    </div>
  );
};

export default MonthlyBudget;
