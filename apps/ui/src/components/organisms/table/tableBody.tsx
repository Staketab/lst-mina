import React, { useState } from 'react';
import TableRow from './tableRow';

const TableBody = ({ data, config, currentPage, onRowClick, activeRowIndex }) => {
    const [hoveredRow, setHoveredRow] = useState(null);

    return data && Object.entries(data).length < 1
        ? null
        : data?.map((row, i) => (
              <TableRow
                  key={i + currentPage}
                  index={i}
                  currentPage={currentPage}
                  rowData={row}
                  config={config}
                  hoveredRow={hoveredRow}
                  setHoveredRow={setHoveredRow}
                  onRowClick={onRowClick}
                  activeRowIndex={activeRowIndex}
              />
          ));
};

export default TableBody;
