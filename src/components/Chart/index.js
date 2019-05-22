import React, { useEffect, useRef } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/sunburst';
import './index.scss';

const Chart = ({ option, style, myChartRef }) => {
  const chartRef = useRef(null);

  // 只设置一次
  useEffect(
    () => {
      // 基于准备好的dom，初始化echarts实例
      myChartRef.current = myChartRef.current || echarts.init(chartRef.current);

      function setOption(option) {
        // 绘制图表
        if (option && typeof option === 'object') {
          myChartRef.current.setOption(option, true);
        }
      }
      // 设置echart选项
      setOption(option);

      function resize() {
        myChartRef.current && myChartRef.current.resize();
      }

      window.addEventListener('optimizedResize', resize);
      return () => {
        window.removeEventListener('optimizedResize', resize);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /*myChartRef, option*/
    ]
  );

  return (
    <div className="one-one">
      <div className="content" style={style}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default Chart;
