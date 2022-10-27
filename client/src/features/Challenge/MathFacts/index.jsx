import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { Input } from 'antd';
import { UserContext } from '../../../App';
import StyledButton from '../../../components/PrimaryButton';

const MathFacts = ({ changeView }) => {
  const { gameService, updateService } = useContext(UserContext);
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

  useEffect(() => {
    newNumbers();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (count === 20) {
      gameService.setPushMathFactResult(percentages);
      gameService.updateMathFactScore(percentages);
      updateService();
      console.log(percentages);
      console.log(gameService.getMathFactResults());
      console.log(gameService.month);
      console.log(gameService.getScore());
      console.log(gameService.getBonusOrFine());
    }
  }, [count === 20]);

  return (
    <>
      {count < 20 && (
        <>
          <h1 style={{ textAlign: 'center' }}>Questions left: {20 - count}</h1>
          <div
            style={{
              border: '1px solid transparent',
              borderRadius: '8px',
              boxShadow: '0px 10px 50px grey',
              width: '300px',
              height: '300px',
              fontSize: '3rem',
              padding: '0rem 3rem',
              margin: '2rem auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {firstNumber}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>x</div>
              <div>{secondNumber}</div>
            </div>
            <Input
              style={{ padding: '1rem', fontSize: '3rem', textAlign: 'right' }}
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
        </>
      )}

      {count === 20 && (
        <>
          <div>You did 20 questions!</div>
          <div>Amount Correct:{percentages}%</div>
          {gameService.getBonusOrFine() < 0 ? (
            <>
              <div>
                You have received {gameService.getBonusOrFine()} points! :(
              </div>
              <div>
                You have received a fine ${gameService.getBonusOrFine()}! :(
              </div>
            </>
          ) : (
            <>
              <div>
                You have received {gameService.getBonusOrFine()} points! :)
              </div>
              <div>
                You have received a bonus of ${gameService.getBonusOrFine()}! :)
              </div>
            </>
          )}
          <StyledButton type="primary" onClick={() => changeView('template')}>
            Back to Budget Planning
          </StyledButton>
        </>
      )}
    </>
  );
};

export default MathFacts;
