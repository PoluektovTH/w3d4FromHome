import PropTypes, { InferProps } from 'prop-types';
export default function Line({
  x1,
  y1,
  x2,
  y2,
}: InferProps<typeof Line.propTypes>) {
  return (
    <svg className="line" height="750" width="1500">
      <line x1={`${x1}`} y1={`${y1}`} x2={`${x2}`} y2={`${y2}`} />
    </svg>
  );
}
Line.propTypes = {
  x1: PropTypes.number,
  y1: PropTypes.number,
  x2: PropTypes.number,
  y2: PropTypes.number,
};
