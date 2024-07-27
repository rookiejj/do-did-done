import "./Header.css";

const Header = ({ title, onClick }) => {
  return (
    <div className="Header">
      <span onClick={onClick} className="title">
        {title}
      </span>
    </div>
  );
};

export default Header;
