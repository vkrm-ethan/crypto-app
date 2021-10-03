/* eslint-disable react/prop-types */
//import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import DataGrid, {
  Column,
  Paging,
  RowDragging,
  SearchPanel,
} from "devextreme-react/data-grid";
import React from "react";
//import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle.js";

//const useStyles = makeStyles(tooltipsStyle);

function CustomCell(cellData) {
  //const classes = useStyles();
  return (
    <Tooltip title={cellData.value} placement="top">
      <div>{cellData.value}</div>
    </Tooltip>
  );
}

export default function Table({ columns, data, status, updateFunction }) {
  console.log(columns, data);

  //const filterExpr = ["Status", "=", status];

  const onReorder = (e) => {
    //const visibleRows = e.component.getVisibleRows();
    const key = e.itemData.id;

    if (e.toData == 2) {
      updateFunction(e.itemData.id);
    }
    console.log(key, e.toData);
    //     const newTasks = [...customers];
    //     const toIndex = newTasks.indexOf(visibleRows[e.toIndex].data);
    //     const fromIndex = newTasks.indexOf(e.itemData);

    //     newTasks.splice(fromIndex, 1);
    //     newTasks.splice(toIndex, 0, e.itemData);

    //     setCustomers(newTasks);
  };

  return (
    <div>
      <DataGrid
        dataSource={data}
        showBorders={false}
        rowAlternationEnabled={true}
        showColumnLines={false}
        showRowLines={false}
      >
        <SearchPanel visible={true} />

        <Paging defaultPageSize={10} />

        <RowDragging
          data={status}
          allowReordering={true}
          onAdd={onReorder}
          group="tasksGroup"
          showDragIcons={false}
        />

        {columns.map((column, index) => (
          <Column
            dataField={column.value || column.name}
            key={index}
            dataType={column.type}
            caption={column.name}
            cellRender={CustomCell}
          />
        ))}
        <Column dataField="Status" dataType="number" visible={false} />
      </DataGrid>
    </div>
  );
}
