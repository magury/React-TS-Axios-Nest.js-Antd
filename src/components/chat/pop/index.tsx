import React, { Fragment } from "react";
interface Props {
  children?: React.ReactNode;
  title?: {
    item1?: String;
    item2?: String;
  };
}
const App: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <span>{props?.title?.item1}</span>
      <span>{props?.title?.item2}</span>
      <i>(更多)</i>
      <br />
      <br />
    </Fragment>
  );
};
export default App;
