import React from 'react';
import { TextBlockView } from '../../../../omelette/packages/volto-slate/src/blocks/Text';
const style = {
  height: 300,
  border: '1px solid grey',
};
const View = (props) => {
  const { data } = props;

  return (
    <div style={style} className="block textgroup">
      <h1>This is BlockGroup</h1>
    </div>
  );
};

export default View;
