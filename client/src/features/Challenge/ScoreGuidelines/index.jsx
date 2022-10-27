import React from 'react';
import { Drawer } from 'antd';

const ScoreGuidelines = ({ open, toggleVisibility }) => (
  <Drawer
    open={open}
    width={500}
    onClose={() => toggleVisibility(false)}
    title="Scoring Guidelines"
    closable
  >
    <>
      <div style={{ fontWeight: 'bold' }}>Monthly Budgets</div>
      <ul>
        <li>Every Successfull budget =&gt; 1,000 points</li>
      </ul>
      <div style={{ fontWeight: 'bold' }}>Math Facts</div>
      <ul>
        <li>100% =&gt; $500 bonus & 500 points</li>
        <li>90%-99% =&gt; $250 bonus & 250 points</li>
        <li>80%-89% =&gt; $100 bonus & 100 points</li>
        <li>70%-79% =&gt; Nothing Happens (No points)</li>
        <li>60%-69% =&gt; $100 Fine & -100 points</li>
        <li>50%-59% =&gt; $250 Fine & -250 points</li>
        <li>49% or below =&gt; $500 Fine & -500 points</li>
      </ul>
      <div style={{ fontWeight: 'bold' }}>Battleship</div>
      <ul>
        <li>Win difference of 5 =&gt; $5,000 Bonus & 5,000 points</li>
        <li>Win difference of 4 =&gt; $4,000 Bonus & 4,000 points</li>
        <li>Win difference of 3 =&gt; $3,000 Bonus & 3,000 points</li>
        <li>Win difference of 2 =&gt; $2,000 Bonus & 2,000 points</li>
        <li>Win difference of 1 =&gt; $1,000 Bonus & 1,000 points</li>
        <li>Loss difference of 1 =&gt; $1,000 Fine & -1,000 points</li>
        <li>Loss difference of 2 =&gt; $2,000 Fine & -2,000 points</li>
        <li>Loss difference of 3 =&gt; $3,000 Fine & -3,000 points</li>
        <li>Loss difference of 4 =&gt; $4,000 Fine & -4,000 points</li>
        <li>Loss difference of 5 =&gt; $5,000 Fine & -5,000 points</li>
      </ul>
    </>
  </Drawer>
);

export default ScoreGuidelines;
