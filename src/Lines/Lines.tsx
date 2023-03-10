import { useState } from 'react';
import Line from './line';
import Objs from './objs';

function computeData(
  lines: number,
  obj: number,
  objLength: number,
  areaPerim: number
) {
  let x1Arr: number[] = [];
  let y1Arr: number[] = [];
  let x2Arr: number[] = [];
  let y2Arr: number[] = [];

  let x1ObjArr: number[] = [];
  let y1ObjArr: number[] = [];
  let x2ObjArr: number[] = [];
  let y2ObjArr: number[] = [];

  let intersections: number[] = [];

  let linesCount: number[] = [];
  let objCount: number[] = [];
  objLength = objLength / 100;
  let probability = (1 - Math.pow(1 - objLength / areaPerim, lines))*50;

  for (let i = 0; i < lines; i++) {
    linesCount.push(1);
  }
  for (let i = 0; i < obj; i++) {
    objCount.push(1);
  }

  const generateArray = (arr: number[]) => {
    arr.splice(Math.round(Math.random() * (3 - 0) + 0), 1);
    arr.splice(Math.round(Math.random() * (2 - 0) + 0), 1);
    return arr;
  };

  function lineCoords(lines: number) {
    let i = 0;
    let maxY = 750,
      minY = 0,
      maxX = 1500,
      minX = 0;

    for (i = 0; i < lines; i++) {
      let arr: number[] = [1, 2, 3, 4];
      generateArray(arr);
      console.log(arr);
      // let side = +(Math.round(Math.random() * (4 - 1) + 1))
      if (arr[0] === 1 && arr[1] === 2) {
        x1Arr.push(+(Math.random() * (maxX - minX) + minX).toFixed(2));
        y1Arr.push(0);
        x2Arr.push(1500);
        y2Arr.push(+(Math.random() * (maxY - minY) + minY).toFixed(2));
      }
      if (arr[0] === 1 && arr[1] === 3) {
        x1Arr.push(+(Math.random() * (maxX - minX) + minX).toFixed(2));
        y1Arr.push(0);
        x2Arr.push(+(Math.random() * (maxX - minX) + minX).toFixed(2));
        y2Arr.push(750);
      }
      if (arr[0] === 1 && arr[1] === 4) {
        x1Arr.push(+(Math.random() * (maxX - minX) + minX).toFixed(2));
        y1Arr.push(0);
        x2Arr.push(0);
        y2Arr.push(+(Math.random() * (maxY - minY) + minY).toFixed(2));
      }
      if (arr[0] === 2 && arr[1] === 3) {
        x1Arr.push(1500);
        y1Arr.push(+(Math.random() * (maxY - minY) + minY).toFixed(2));
        x2Arr.push(+(Math.random() * (maxX - minX) + minX).toFixed(2));
        y2Arr.push(750);
      }
      if (arr[0] === 2 && arr[1] === 4) {
        x1Arr.push(1500);
        y1Arr.push(+(Math.random() * (maxY - minY) + minY).toFixed(2));
        x2Arr.push(0);
        y2Arr.push(+(Math.random() * (maxY - minY) + minY).toFixed(2));
      }
      if (arr[0] === 3 && arr[1] === 4) {
        x1Arr.push(+(Math.random() * (maxX - minX) + minX).toFixed(2));
        y1Arr.push(750);
        x2Arr.push(0);
        y2Arr.push(+(Math.random() * (maxY - minY) + minY).toFixed(2));
      }
    }
  }

  function objCoords(obj: number, objLength: number) {
    const maxY = 750,
      minY = 0,
      maxX = 1500,
      minX = 0;
    for (let i = 0; i < obj; i++) {
      let x1 = +(Math.random() * (maxX - minX) + minX).toFixed(2);
      x1ObjArr.push(x1);
      let y1 = +(Math.random() * (maxY - minY) + minY).toFixed(2);
      y1ObjArr.push(y1);
      let angle = +(Math.random() * (1 - -1) + -1).toFixed(2);
      x2ObjArr.push(+(x1 + objLength * Math.cos(angle)).toFixed(2));
      y2ObjArr.push(+(y1 + objLength * Math.sin(angle)).toFixed(2));
    }
  }

  function intersection(
    x1Arr: number,
    y1Arr: number,
    x2Arr: number,
    y2Arr: number,
    x1ObjArr: number,
    y1ObjArr: number,
    x2ObjArr: number,
    y2ObjArr: number
  ) {
    // ?????????????? ?????????????????? ????????????, ???????????????????? ?????????? ??????????????
    const a1 = Number(y2Arr) - Number(y1Arr);
    const b1 = Number(x1Arr) - Number(x2Arr);
    const c1 = a1 * Number(x1Arr) + b1 * Number(y1Arr);

    const a2 = Number(y2ObjArr) - Number(y1ObjArr);
    const b2 = Number(x1ObjArr) - Number(x2ObjArr);
    const c2 = a2 * Number(x1ObjArr) + b2 * Number(y1ObjArr);

    // ?????????????? ?????????? ?????????????????????? ????????????
    const det = a1 * b2 - a2 * b1;
    if (det === 0) {
      // ?????????????? ??????????????????????
      return null;
    } else {
      const x = (b2 * c1 - b1 * c2) / det;
      const y = (a1 * c2 - a2 * c1) / det;

      // ??????????????????, ?????? ?????????? ?????????????????????? ?????????????????? ???????????? ?????????? ????????????????
      if (
        x < Math.min(+x1Arr, x2Arr) ||
        x > Math.max(+x1Arr, +x2Arr) ||
        x < Math.min(+x1ObjArr, +x2ObjArr) ||
        x > Math.max(+x1ObjArr, +x2ObjArr) ||
        y < Math.min(+y1Arr, +y2Arr) ||
        y > Math.max(+y1Arr, +y2Arr) ||
        y < Math.min(+y1ObjArr, +y2ObjArr) ||
        y > Math.max(+y1ObjArr, +y2ObjArr)
      ) {
        return null;
      } else {
        intersections.push(1);
      }
    }
  }

  function getIntersections(lines: number) {
    for (let i = 0; i < lines; i++) {
      for (let j = 0; j < obj; j++) {
        intersection(
          x1Arr[i],
          y1Arr[i],
          x2Arr[i],
          y2Arr[i],
          x1ObjArr[j],
          y1ObjArr[j],
          x2ObjArr[j],
          y2ObjArr[j]
        );
      }
    }
  }

  lineCoords(Number(lines));
  objCoords(Number(obj), Number(objLength));
  getIntersections(Number(lines));

  let probabilityPract = intersections.length / objCount.length;

  return {
    x1Arr,
    y1Arr,
    x2Arr,
    y2Arr,
    x1ObjArr,
    y1ObjArr,
    x2ObjArr,
    y2ObjArr,
    intersections,
    linesCount,
    objCount,
    probability,
    probabilityPract,
  };
}
type Arrays = {
  x1Arr: number[];
  y1Arr: number[];
  x2Arr: number[];
  y2Arr: number[];

  x1ObjArr: number[];
  y1ObjArr: number[];
  x2ObjArr: number[];
  y2ObjArr: number[];
  intersections: number[];

  linesCount: number[];
  objCount: number[];
  probability: number;
  probabilityPract: number;
};

export default function Lines() {
  const [lines, setLines] = useState('');
  const [obj, setObjCount] = useState('');
  const [objLength, setObjLength] = useState('');
  const [areaPerim, setAreaPerim] = useState('');
  const [computeDatas, setComputedData] = useState<Arrays | undefined>();

  const linesHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setLines(event.target.value);
  };

  const objHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setObjCount(event.target.value);
  };

  const objLengthHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setObjLength(event.target.value);
  };

  const areaPerimeterHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setAreaPerim(event.target.value);

  const setConsLog123: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setComputedData(computeData(+lines, +obj, +objLength, +areaPerim));
    console.log(computeDatas);
  };

  return (
    <div className="container">
      <div className="board"></div>
      {computeDatas?.linesCount.map((el, i: number) => {
        return (
          <Line
            x1={computeDatas?.x1Arr[i]}
            y1={computeDatas?.y1Arr[i]}
            x2={computeDatas?.x2Arr[i]}
            y2={computeDatas?.y2Arr[i]}
          ></Line>
        );
      })}
      {computeDatas?.objCount.map((el, i: number) => {
        return (
          <Objs
            x1={computeDatas?.x1ObjArr[i]}
            y1={computeDatas?.y1ObjArr[i]}
            x2={computeDatas?.x2ObjArr[i]}
            y2={computeDatas?.y2ObjArr[i]}
          ></Objs>
        );
      })}
      <div className="inputs">
        <form className="inputsForm">
          <span className="input-group-text" id="inputGroup-sizing-default">
            ?????????????? ?????????????????????? ???????????????????? ????????????:
          </span>
          <input
            type="text"
            value={lines}
            onChange={linesHandler}
            name="inputProbability"
            className="form-control"
          />
          <span className="input-group-text" id="inputGroup-sizing-default">
            ???????????????????? ????????????????
          </span>
          <input
            type="text"
            value={obj}
            onChange={objHandler}
            name="inputObjCount"
            className="form-control"
          />
          <span className="input-group-text" id="inputGroup-sizing-default">
            ?????????????? ???????????????? ???????????????? ??????????????:
          </span>
          <input
            type="text"
            value={objLength}
            onChange={objLengthHandler}
            name="inputObjLength"
            className="form-control"
          />
          <span className="input-group-text" id="inputGroup-sizing-default">
            ?????????????? ???????????????? ???????????? ??????????????:
          </span>
          <input
            type="text"
            value={areaPerim}
            onChange={areaPerimeterHandler}
            name="inputAreaPerimeter"
            className="form-control"
          />
          <button
            type="button"
            id="btn"
            className="btn btn-success"
            onClick={setConsLog123}
          >
            ????????????????????
          </button>
        </form>

        <p>???????????????????? ??????????????????????: {computeDatas?.intersections.length}</p>
        <p>
          ?????????????????????????? ?????????????????????? ?????????????????? ??????????????:{' '}
          {computeDatas?.probability}
        </p>
        <p>
          ???????????????????????? ?????????????????????? ?????????????????? ??????????????:{' '}
          {computeDatas?.probabilityPract}
        </p>
      </div>
    </div>
  );
}
