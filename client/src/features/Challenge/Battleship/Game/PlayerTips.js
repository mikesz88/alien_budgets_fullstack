/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PlayerTips = ({
  // gameState,
  hitsByPlayer,
  hitsByComputer,
  winner,
  changeView,
}) => {
  const numberOfHits = hitsByPlayer.length;
  const numberOfSuccessfulHits = hitsByPlayer.filter(
    (hit) => hit.type === 'hit'
  ).length;
  const accuracyScore = Math.round(
    100 * (numberOfSuccessfulHits / numberOfHits)
  );
  const succesfulComputerHits = hitsByComputer.filter(
    (hit) => hit.type === 'hit'
  ).length;

  const backToGame = () => changeView('template');

  const gameOverPanel = (
    <div>
      <div className="tip-box-title">Game Over!</div>
      <p className="player-tip">
        {winner === 'player'
          ? 'You win! 🎉'
          : 'You lose 😭. Better luck next time! '}
      </p>
      <button type="button" onClick={backToGame}>
        Advance to the next month
      </button>
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
      {numberOfSuccessfulHits === 17 || succesfulComputerHits === 17
        ? gameOverPanel
        : tipsPanel}
    </div>
  );
};

export default PlayerTips;
