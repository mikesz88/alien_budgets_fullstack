/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Input } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import theme from '../../theme';

const Challenge = () => {
  const inputRef = useRef(true);
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [count, setCount] = useState(0);

  const randomNumber = useCallback(() => Math.ceil(Math.random() * 12), []);

  const newNumbers = useCallback(() => {
    const updateFirstNumber = randomNumber();
    const updateSecondNumber = randomNumber();
    if (
      updateFirstNumber === firstNumber ||
      updateSecondNumber === secondNumber
    ) {
      newNumbers();
    }
    setFirstNumber(updateFirstNumber);
    setSecondNumber(updateSecondNumber);
  }, []);

  const getNewNumbers = (answer, correct) => {
    setPreviousNumbers((prevState) => {
      console.log([
        ...prevState,
        {
          firstNumber,
          secondNumber,
          answer,
          correct,
        },
      ]);
      return [
        ...prevState,
        {
          firstNumber,
          secondNumber,
          answer,
          correct,
        },
      ];
    });
    newNumbers();
  };

  const confirmAnswer = (answer) => {
    const trueAnswer = firstNumber * secondNumber;
    console.log(trueAnswer);
    console.log(trueAnswer === answer);
    getNewNumbers(answer, trueAnswer === answer);
  };

  useEffect(() => {
    newNumbers();
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '8rem 0',
      }}
    >
      <GreetingBar template="Game Time!" />
      <Button onClick={getNewNumbers}>New Numbers</Button>
      <div>first number: {firstNumber}</div>
      <div>second number: {secondNumber}</div>
      <div
        style={{ border: '1px solid black', width: '300px', height: '300px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {firstNumber}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>x</div>
          <div>{secondNumber}</div>
        </div>
        <Input
          value={currentAnswer}
          onChange={(e) => {
            setCurrentAnswer(e.target.value);
          }}
          onPressEnter={() => {
            confirmAnswer(+currentAnswer);
            setCurrentAnswer('');
            setCount(count + 1);
          }}
          type="text"
          ref={inputRef}
        />
      </div>
      {count === 20 && <div>You did 20 questions</div>}
      {/* <div>Previous Numbers:</div>
      {previousNumbers.map((set) => {
        console.log(previousNumbers);
        return (
          <div key={Math.random()}>
            <div>firstNumber: {set[0]}</div>
            <div>secondNumber: {set[1]}</div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Challenge;
