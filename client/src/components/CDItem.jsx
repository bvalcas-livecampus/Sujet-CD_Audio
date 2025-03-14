import PropTypes from "prop-types";

const CDItem = ({ cd, onDelete }) => {
  return (
    <li data-testid="cd-item">
      <span>
        <span data-testid="cd-title">{cd.title}</span>
        <span> - </span> 
        <span data-testid="cd-artist">{cd.artist}</span>
        <span> (</span><span data-testid="cd-year">{cd.year}</span><span>)</span>
      </span>
      <button className="delete-btn" onClick={() => onDelete(cd.id)}>🗑 Supprimer</button>
    </li>
  );
};

CDItem.propTypes = {
  cd: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CDItem