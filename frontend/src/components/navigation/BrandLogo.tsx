import { Avatar } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";

import tsvLogo from "../../assets/tsv-logo.png";

const BrandLogo = () => {
  return (
    <>
    <Link className="brand--btn" to={"/"}>
      <Avatar
        src={<img src={tsvLogo} alt="Time Series Visualize logo in header" />}
        shape="square"
      />
      Time Series Visualize
    </Link>
    </>
  );
};

export default BrandLogo;
