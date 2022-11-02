import './Loader.css';

/**
 * Loader component
 *
 * @component
 * @description It returns a customized loader while data is loading.
 * @returns {JSX} The React component.
 */
const Loader = () => {
  return (
    <div id="loader-container">
      <div id="bar-1" className="bar"></div>
      <div id="bar-2" className="bar"></div>
      <div id="bar-3" className="bar"></div>
    </div>
  );
};

export default Loader;
