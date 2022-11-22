import React from 'react';
import StyledButton from '../../../../components/PrimaryButton';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';

const PlayerTips = ({
  // gameState,
  hitsByPlayer,
  hitsByComputer,
  winner,
  changeView,
}) => {
  const { getMonth, getBonusOrFine } = useGameServiceProvider();
  const numberOfHits = hitsByPlayer.length;
  const numberOfSuccessfulHits = hitsByPlayer.filter(
    (hit) => hit.type === 'hit'
  ).length;
  const accuracyScore = Math.round(
    100 * (numberOfSuccessfulHits / numberOfHits)
  );
  const successfulComputerHits = hitsByComputer.filter(
    (hit) => hit.type === 'hit'
  ).length;

  const backToGame = () =>
    getMonth() !== 12 ? changeView('template') : changeView('budgetSummary');

  const gameOverPanel = (
    <div style={{ width: '225px' }}>
      <div className="tip-box-title">Game Over!</div>
      <p className="player-tip">
        {winner === 'player'
          ? 'You win! 🎉'
          : 'You lose 😭. Better luck next time! '}
      </p>
      {getBonusOrFine() < 0 ? (
        <div>
          <div>You have received {getBonusOrFine()} points! :(</div>
          <div>You have received a fine of ${getBonusOrFine()}! :(</div>
        </div>
      ) : (
        <>
          <div>You have received {getBonusOrFine()} points! :)</div>
          <div>You have received a bonus ${getBonusOrFine()}! :)</div>
        </>
      )}
      <StyledButton type="primary" onClick={backToGame}>
        {getMonth() === 12 ? 'Game Over! Go to Summary!' : 'On to your budget'}
      </StyledButton>
    </div>
  );

  const tipsPanel = (
    <div>
      <div className="tip-box-title">Stats</div>
      <div id="firing-info">
        <ul>
          <li>{numberOfSuccessfulHits} successful hits</li>
          <li>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} accuracy </li>
        </ul>
        <p className="player-tip">
          The first to sink all 5 opponent ships wins.
        </p>
      </div>
    </div>
  );

  return (
    <div id="player-tips">
      {numberOfSuccessfulHits === 17 || successfulComputerHits === 17
        ? gameOverPanel
        : tipsPanel}
    </div>
  );
};

export default PlayerTips;
