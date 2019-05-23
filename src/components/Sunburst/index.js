import React, { useRef } from 'react';
import Chart from '../Chart';
import { getOption } from './option';
import { useInterval } from 'Hooks/useInterval';

// 在函数外定义索引，否则数值会随着props的改变而被重置
let index = 1;
let round = 0;

function Sunburst({ delay, randomInt, onStop }) {
  let myChart = useRef(null);
  const option = getOption();

  useInterval(() => {
    if (myChart.current) {
      let id = index % 76;
      // console.log('index:', index)
      myChart.current.dispatchAction({
        type: 'sunburstHighlight',
        targetNodeId: String(id)
      });

      index++;

      if (index === 76) {
        index = 1;
        round = 1;
      }

      if (round > 0 && index === randomInt) {
        round = 0;
        // console.log('randomInt:', randomInt)
        // stop
        onStop(index);
      }
    }
  }, delay);



  return <Chart option={option} myChartRef={myChart} />;
}

export default Sunburst;
