const ButtonWrapper = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50`}
    >
      {children}
    </button>
  );
};

export default ButtonWrapper;
