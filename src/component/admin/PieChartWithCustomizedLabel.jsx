// 검색 키워드 많은 순 그래프
import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
  },
];

const Graph = styled.div`
  width: 800px;
  height: 800px;
`;

export default class KeywordSearch extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/vertical-composed-chart-w6fni';

  render() {
    return (
      <Graph>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
      </Graph>
    );
  }
}
