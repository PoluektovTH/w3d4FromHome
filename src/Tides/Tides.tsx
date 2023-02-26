// import { useState } from 'react';
// import { useEffect } from 'react';

// function Tides() {
//   const [tidesValue, setTidesValue] = useState();
//   const [lat, setLatValue] = useState();
//   const [long, setLongValue] = useState();
//   const getCoords: React.FormEventHandler<HTMLFormElement> = (event) => {
//         fetch(
//           `https://api.marea.ooo/v2/tides?duration=1440&interval=60&latitude=${lat}&longitude=${long}&model=FES2014&datum=MSL&token=585187f2-3be7-49f8-8171-0b244094322d`
//         )
//           .then((res) => res.json())
//           .then((data) => setTidesValue(data.datums));
//   };

//   return (
//     <form className="container"  onSubmit={getCoords}>
//       <div className="input-group mb-3">
//         <span className="input-group-text" id="inputGroup-sizing-default">
//           Latitude
//         </span>
//         <input type="text" data={lat} value={setLatValue} name="inputLat" className="form-control" />
//         <span className="input-group-text" id="inputGroup-sizing-default">
//           Longtitude
//         </span>
//         <input type="text" data={long} value={setLongValue} name="inputLong" className="form-control" />
//         <button type='submit'>Find tides</button>
//       </div>
//     </form>
//   );
// }

// export default Tides;
export {};
