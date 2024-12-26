import PropTypes from 'prop-types';

import '../scss/components/keyDataCard.scss';

function KeyDataCard({ dataValue, icon, name, unit }) {
  return (
    <div className="flex_row keyDataCard">
      <img src={icon} alt={name} className="keyDataCard__img" />
      <div className="keyDataCard__content">
        <h2 className="keyDataCard__content--value">
          {dataValue}
          {unit}
        </h2>
        <p className="keyDataCard__content--name">{name}</p>
      </div>
    </div>
  );
}

KeyDataCard.propTypes = {
  dataValue: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string,
};

export default KeyDataCard;
