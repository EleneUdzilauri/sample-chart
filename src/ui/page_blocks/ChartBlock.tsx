import { useEffect, useMemo, useState } from 'react';
import { BarChart } from '../components/Chart';
import { useToastContext } from '../providers/toast';
import { ChartData } from 'chart.js';

export function ChartBlock() {
  // TODO show success/failure toast message
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { renderToast } = useToastContext();
  const [chartData, setChartData] = useState<ChartData>();
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const filteredData = useMemo(() => {
    if (!chartData) {
      return null;
    }

    let filtered = { ...chartData };

    if (min !== undefined) {
      filtered = {
        ...filtered,
        datasets: filtered.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.filter((i: any) => i >= min),
        })),
      };
    }

    if (max !== undefined) {
      filtered = {
        ...filtered,
        datasets: filtered.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.filter((i: any) => i <= max),
        })),
      };
    }

    return filtered;
  }, [chartData, max, min]);

  useEffect(() => {
    fetch("/api/data/chart-data").then((res) => {
      return res.json();
    }).then((res) => {
      setChartData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Dataset 1',
            data: res.data.datasetOne,
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Dataset 2',
            data: res.data.datasetTwo,
            backgroundColor: 'rgb(54, 162, 235)',
          },
        ],
      });

      renderToast("success", "Success");
    }).catch((err) => {
      renderToast("error", err.message);
    });
  }, [renderToast]);

  console.log(min);

  return (
    <div>
      <div className='mb-12 flex items-center'>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Min</span>
          <input value={min || ''} onInput={(e: any) => setMin(Number(e.target.value))} type='number' className='w-24 h-8 text-sm' />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input value={max || ''} onInput={(e: any) => setMax(Number(e.target.value))} type='number' className='w-24 h-8 text-sm' />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button onClick={() => {
            setMin(undefined);
            setMax(undefined);
          }}
            className='bg-blue-600 flex justify-center items-center h-10 text-center text-white border focus:outline-none focus:ring-4 font-sm rounded-lg text-sm px-5 py-1.9'>
            Reset
          </button>
        </div>
      </div>
      <div>
        {
          filteredData && (
            <BarChart
              width={600}
              height={300}
              data={filteredData}
            />
          )
        }
      </div>
    </div>
  );
}
