import React, { useRef } from 'react';
import Chart from '../Chart';
import { getOption } from './option';
import { useInterval } from 'Hooks/useInterval';

// 在函数外定义索引，否则数值会随着props的改变而被重置
let index = 1;

function Sunburst({ delay, onStop }) {
  let myChart = useRef(null);
  const option = getOption();

  const randomInt = getRandomInt(1, 76);
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
      }

      if (index === randomInt) {
        // stop
        onStop(index);
      }
    }
  }, delay);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }

  return <Chart option={option} myChartRef={myChart} />;
}

export default Sunburst;
