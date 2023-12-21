import React, { useState } from 'react';
import TableRow from './tableRow';
import { DataTable, TableConfig } from '../../../comman/types';

type TableBodyProps = {
    data: DataTable[];
    config: TableConfig[];
    currentPage: number;
};

const TableBody = ({ data, config, currentPage }: TableBodyProps): JSX.Element => {
    const [hoveredRow, setHoveredRow] = useState(null);

    return (
        <>
            {data && Object.entries(data).length < 1
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
                      />
                  ))}
        </>
    );
};

export default TableBody;
