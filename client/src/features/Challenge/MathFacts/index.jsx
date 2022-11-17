import React, { useState, useEffect, useCallback, useRef } from 'react';
import StyledButton from '../../../components/PrimaryButton';
import {
  StyledFirstNumber,
  StyledInput,
  StyledMathFactWrapper,
  StyledQuestionHeader,
  StyledXSecondNumber,
} from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useGameServiceProvider } from '../../../services/GameServiceProvider';

const MathFacts = ({ changeView }) => {
  const { setPushMathFactResult, updateMathFactScore, getBonusOrFine } =
    useGameServiceProvider();
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
    setPreviousNumbers((prevState) => [
      ...prevState,
      {
        firstNumber,
        secondNumber,
        answer,
        correct,
      },
    ]);
    newNumbers();
  };

  const confirmAnswer = (answer) => {
    const trueAnswer = firstNumber * secondNumber;
    getNewNumbers(answer, trueAnswer === answer);
  };

  const percentages =
    (previousNumbers.filter((question) => question.correct).length / 20) * 100;

  const backToBudget = () => changeView('template');

  useEffect(() => {
    newNumbers();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (count === 20) {
      setPushMathFactResult(percentages);
      updateMathFactScore(percentages);
    }
  }, [count === 20]);

  return (
    <>
      {count < 20 && (
        <>
          <StyledQuestionHeader>
            Questions left: {20 - count}
          </StyledQuestionHeader>
          <StyledMathFactWrapper>
            <StyledFirstNumber>{firstNumber}</StyledFirstNumber>
            <StyledXSecondNumber>
              <StyledBasicDiv>x</StyledBasicDiv>
              <StyledBasicDiv>{secondNumber}</StyledBasicDiv>
            </StyledXSecondNumber>
            <StyledInput
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
          </StyledMathFactWrapper>
        </>
      )}
      {count === 20 && (
        <>
          <StyledBasicDiv>You did 20 questions!</StyledBasicDiv>
          <StyledBasicDiv>Amount Correct:{percentages}%</StyledBasicDiv>
          {getBonusOrFine() < 0 ? (
            <>
              <StyledBasicDiv>
                You have received {getBonusOrFine()} points! :(
              </StyledBasicDiv>
              <StyledBasicDiv>
                You have received a fine ${getBonusOrFine()}! :(
              </StyledBasicDiv>
            </>
          ) : (
            <>
              <StyledBasicDiv>
                You have received {getBonusOrFine()} points! :)
              </StyledBasicDiv>
              <StyledBasicDiv>
                You have received a bonus of ${getBonusOrFine()}! :)
              </StyledBasicDiv>
            </>
          )}
          <StyledButton type="primary" onClick={backToBudget}>
            Back to Budget Planning
          </StyledButton>
        </>
      )}
    </>
  );
};

export default MathFacts;
