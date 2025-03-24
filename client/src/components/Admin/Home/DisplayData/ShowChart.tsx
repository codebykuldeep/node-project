import * as React from 'react';
import { DefaultizedPieValueType, PieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { MakeOptional } from '@mui/x-charts/internals';


interface Props{
    data:MakeOptional<PieValueType, "id">[]
}

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};


const getArcLabel = (params: DefaultizedPieValueType) => {
  return `${params.label}`;
};



export default function ShowChart({data}:Props) {
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
