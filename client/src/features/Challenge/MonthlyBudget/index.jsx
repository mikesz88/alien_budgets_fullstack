import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
  useMemo,
} from 'react';
import { Form, Input, Popconfirm } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import TestMyMath from './TestMyMath';
import ScoreGuidelines from '../ScoreGuidelines';
import {
  withMoneySymbol,
  convertMoneyToNumber,
  error,
  ERROR,
  success,
  SUCCESS,
} from '../../../common/constants';
import Notification from '../../../components/Notification';
import {
  StyledFormItem,
  StyledInputEditContainer,
  StyledDirectionsWrapper,
  StyledScoreGuideline,
  StyledTopInfoWrapper,
  StyledInfoText,
  StyledInputDirections,
  StyledHouseButton,
  StyledScoreInfo,
  StyledDivWrapperCentered,
  StyledAddRowButton,
  StyledRedDiv,
  StyledSubmitWrapper,
  StyledSpanBalanceColor,
  StyledBoldSpan,
  StyledTable,
} from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';
import {
  MONTHLY_PAYMENT,
  UTILITIES,
  SAVINGS,
  GROCERIES,
  requiredCells,
} from './helper';
import { useGameServiceProvider } from '../../../services/GameServiceProvider';

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
      values.chosenBudget = +(+values.chosenBudget).toFixed(2);
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
      Notification(success, SUCCESS, 'Value saved.');
    } catch (errInfo) {
      Notification(error, ERROR, `Please write a valid number`);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <StyledFormItem
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
      </StyledFormItem>
    ) : (
      <StyledInputEditContainer onClick={toggleEdit}>
        {children}
      </StyledInputEditContainer>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const MonthlyBudget = ({ changeView, findAnotherHouse, failedBudget }) => {
  const {
    getHouse,
    getUtilities,
    getHouseMembers,
    getSalary,
    getSavings,
    getBonusOrFine,
    getMonth,
    getScore,
  } = useGameServiceProvider();
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      budgetItem: MONTHLY_PAYMENT,
      requiredMinimum: withMoneySymbol(getHouse().monthlyPayment),
      chosenBudget: getHouse().monthlyPayment,
    },
    {
      key: '1',
      budgetItem: UTILITIES,
      requiredMinimum: withMoneySymbol(
        getUtilities() * getHouse().monthlyPayment
      ),
      chosenBudget: +(getUtilities() * getHouse().monthlyPayment).toFixed(2),
    },
    {
      key: '2',
      budgetItem: SAVINGS,
      requiredMinimum: withMoneySymbol(0),
      chosenBudget: 0,
    },
    {
      key: '3',
      budgetItem: GROCERIES,
      requiredMinimum: withMoneySymbol((getHouseMembers() + 1) * 50),
      chosenBudget: (getHouseMembers() + 1) * 50,
    },
  ]);
  const [count, setCount] = useState(dataSource.length);
  const [taxes, setTaxes] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [incomeToSpend, setIncomeToSpend] = useState(0);
  const [newBudgetItem, setNewBudgetItem] = useState('');
  const [openScoreGuidelines, setOpenScoreGuidelines] = useState(false);
  const [openTestMyMath, setOpenTestMyMath] = useState(false);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const testData = useMemo(
    () =>
      dataSource.map((data) => ({
        ...data,
        requiredMinimum: convertMoneyToNumber(data.requiredMinimum),
      })),
    [dataSource]
  );

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
          <span>Cannot Delete</span>
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

  const changeTaxes = (event) => setTaxes(+event.target.value);
  const changeMonthlyIncome = (event) => setMonthlyIncome(+event.target.value);
  const changeIncomeToSpend = (event) => setIncomeToSpend(+event.target.value);

  const changeBudgetItem = (event) => setNewBudgetItem(event.target.value);

  const remainingBalance = useMemo(
    () =>
      incomeToSpend -
      +dataSource
        .reduce((total, { chosenBudget }) => total + chosenBudget, 0)
        .toFixed(2),
    [incomeToSpend, dataSource]
  );

  const openTestMyMathModal = (boolean) => {
    setOpenTestMyMath(boolean);
  };

  const openScoreModal = (boolean) => setOpenScoreGuidelines(boolean);

  const preTaxMonthlySalary = useMemo(
    () => +(getSalary() / 12 + getSavings() + getBonusOrFine()).toFixed(2),
    []
  );
  const monthlySalaryTax = useMemo(
    () => +(preTaxMonthlySalary * 0.1).toFixed(2),
    []
  );

  const postTaxMonthlyIncome = +(
    preTaxMonthlySalary - monthlySalaryTax
  ).toFixed(2);
  const mortgage = getHouse().monthlyPayment;
  const utilities = +(getUtilities() * getHouse().monthlyPayment).toFixed(2);
  const groceries = +((getHouseMembers() + 1) * 50).toFixed(2);

  useEffect(() => {
    if (
      postTaxMonthlyIncome + 1 <
      +(mortgage + utilities + groceries).toFixed(2)
    ) {
      failedBudget();
    }
  }, []);

  return (
    <>
      <StyledScoreGuideline onClick={() => openScoreModal(true)}>
        Score Guidelines
      </StyledScoreGuideline>
      <StyledTopInfoWrapper>
        <StyledDirectionsWrapper>
          <StyledBasicDiv>
            <StyledInfoText>Current Annual Salary:</StyledInfoText>
            <StyledInfoText>{withMoneySymbol(getSalary())}</StyledInfoText>
            <StyledInfoText>
              Add {withMoneySymbol(getSavings())} from savings on top of your
              monthly salary below.
            </StyledInfoText>
            <StyledInfoText>
              {getBonusOrFine() < 0 ? 'Take Away' : 'Add'}{' '}
              {withMoneySymbol(getBonusOrFine())} from{' '}
              {getBonusOrFine() < 0 ? 'fine' : 'bonus'} on top of your monthly
              salary below.
            </StyledInfoText>
          </StyledBasicDiv>
          <StyledBasicDiv>
            <StyledInputDirections>
              What is your monthly salary? (Write numbers only & round to the
              nearest hundredth)
            </StyledInputDirections>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={changeMonthlyIncome}
            />
          </StyledBasicDiv>
        </StyledDirectionsWrapper>
        <StyledDirectionsWrapper>
          <StyledBasicDiv>
            <StyledBasicDiv>
              Don&apos;t Forget Taxes! (In this Alien World they only ask you to
              pay a %10 income tax.)
            </StyledBasicDiv>
            <ul>
              <li>(Write numbers only & round to the nearest hundredth)</li>
              <li>Hints:</li>
              <li>Take your monthly salary and multiply it by 10%.</li>
              <li>OR</li>
              <li>Divide your monthly salary by 10.</li>
            </ul>
          </StyledBasicDiv>
          <Input type="number" value={taxes} onChange={changeTaxes} />
        </StyledDirectionsWrapper>
        <StyledDirectionsWrapper>
          {getMonth() === 0 ? (
            <StyledHouseButton type="primary" onClick={findAnotherHouse}>
              Choose Different House
            </StyledHouseButton>
          ) : null}
          <StyledScoreInfo>Current Month: {getMonth()}</StyledScoreInfo>
          <StyledScoreInfo>Current Score: {getScore()}</StyledScoreInfo>
          <StyledBasicDiv>
            <StyledInputDirections>
              What is the remaining balance to spend on your budget? (Write
              numbers only & round to the nearest hundredth)
            </StyledInputDirections>
            <Input
              type="number"
              value={incomeToSpend}
              onChange={changeIncomeToSpend}
            />
          </StyledBasicDiv>
        </StyledDirectionsWrapper>
      </StyledTopInfoWrapper>
      <StyledDivWrapperCentered>
        <StyledAddRowButton
          onClick={handleAdd}
          type="primary"
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
        </StyledAddRowButton>
        <Input
          placeholder="Write name of new budget Item"
          type="text"
          value={newBudgetItem}
          onChange={changeBudgetItem}
        />
      </StyledDivWrapperCentered>
      {newBudgetItem && newBudgetItem.length < 3 ? (
        <StyledRedDiv>Must be at least 3 characters long</StyledRedDiv>
      ) : null}
      {dataSource.some(
        (budgetItem) =>
          newBudgetItem.toLowerCase().trim() ===
          budgetItem.budgetItem.toLowerCase().trim()
      ) ? (
        <StyledRedDiv>
          Cannot be the same name as another budget item.
        </StyledRedDiv>
      ) : null}
      <StyledTable
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <StyledSubmitWrapper>
        <StyledBasicDiv>
          You must spend all the money. You have{' '}
          <StyledSpanBalanceColor remainingBalance={remainingBalance}>
            {withMoneySymbol(remainingBalance)}
          </StyledSpanBalanceColor>{' '}
          left to spend
        </StyledBasicDiv>
        <StyledBasicDiv>
          You must have a <StyledBoldSpan>ZERO BALANCE</StyledBoldSpan> in order
          to test your math.
        </StyledBasicDiv>
        {dataSource.length < 7 ? (
          <StyledBasicDiv>
            Please include at least 3 more items to buy this month
          </StyledBasicDiv>
        ) : null}
        <StyledButton
          disabled={dataSource.length < 7 || remainingBalance !== 0}
          type="primary"
          onClick={() => {
            openTestMyMathModal(true);
          }}
        >
          Test my math!
        </StyledButton>
      </StyledSubmitWrapper>
      {openTestMyMath ? (
        <TestMyMath
          changeView={changeView}
          toggleVisibility={openTestMyMathModal}
          open={openTestMyMath}
          data={[
            ...testData,
            { budgetItem: 'monthlyIncome', chosenBudget: monthlyIncome },
            { budgetItem: 'taxes', chosenBudget: taxes },
            { budgetItem: 'incomeToSpend', chosenBudget: incomeToSpend },
          ]}
        />
      ) : null}
      <ScoreGuidelines
        open={openScoreGuidelines}
        toggleVisibility={openScoreModal}
      />
    </>
  );
};

export default MonthlyBudget;
