import React from 'react';
import table from '@common/styles/table.scss';

export default () => {
  return (
    <div className={table.table}>
      <div className={table.row}>
        <div className={table.cell}>Cell 1</div>
        <div className={table.cell}>Cell 2</div>
        <div className={table.cell}>Cell 3</div>
      </div>
    </div>
  );
};
