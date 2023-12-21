import React from 'react';
import ColumnWrapper from './columnWrapper';
import TableColumn from './templates/index';

const TableRow = ({ rowData, config, index, currentPage, hoveredRow, setHoveredRow }) => {
    return config?.map((el, i) => (
        <ColumnWrapper
            key={el.colName + '-' + index + i + currentPage}
            config={el}
            setHovered={(bool) => setHoveredRow(bool ? index : null)}
            hovered={hoveredRow === index}
            isLast={i === config.length - 1}
            isFirst={i === 0}
            disableBorder={hoveredRow === index || hoveredRow === index + 1}
        >
            <TableColumn index={index} data={rowData} config={el} />
        </ColumnWrapper>
    ));
};

export default TableRow;
