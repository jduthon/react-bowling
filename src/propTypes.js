import PropTypes from "prop-types";

export const framePropTypes = PropTypes.shape({
  rolls: PropTypes.arrayOf(PropTypes.number),
  score: PropTypes.Number
});
