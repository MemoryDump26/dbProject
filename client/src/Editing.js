import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {
  Table,
  Input,
  Button,
  Segment,
  Container,
  Grid,
  Form,
  Divider,
  Dropdown,
} from 'semantic-ui-react';

const SQLHelper = require('./SQLHelper.js');

export class EditTableInput extends React.Component {
  constructor(props) {
    super(props);
    let initialState = {};
    props.columnName.map((c) => {
      initialState[c] = "";
    });
    this.state = initialState;
    this.onInputChange = this.onInputChange.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onInputChange(event, data, name) {
    this.setState({
      [name]: data.value,
    });
  }

  onInsert(event, data) {
    let insertPart = "insert into " + this.props.table + "(";
    let valuesPart = "values (";
    this.props.columnName.map((n, index) => {
      insertPart += n + ",";
      valuesPart += "'" + this.state[n] + "',";
    });
    insertPart = insertPart.substring(0, insertPart.length - 1) + ") ";
    valuesPart = valuesPart.substring(0, valuesPart.length - 1) + ")";
    let queryString = insertPart + valuesPart;
    console.log(queryString);
    SQLHelper.query(queryString, (data) => {console.log(data)});
  }

  onClear(event, data) {
    let initialState = {};
    this.props.columnName.map((c) => {
      initialState[c] = "";
    });
    this.setState(initialState);
    console.log(this.state);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell collapsing>
          <Button onClick={this.onInsert}>Insert</Button>
          <Button onClick={this.onClear}>Clear</Button>
        </Table.Cell>
        {this.props.columnName.map((n, index) => (
          <Table.Cell key={index}>
            <Input
              fluid
              onChange={(event, data) => {this.onInputChange(event, data, n)}}
              value={this.state[n]}
            />
          </Table.Cell>
        ))}
      </Table.Row>
    );
  }
}
export class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: [],
      results: [],
      rows: 0,
      cols: 0,
    }
    this.updateData = this.updateData.bind(this);
    this.updateColumnName = this.updateColumnName.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.table === prevProps.table) return;
    this.fetchData();
  }

  updateData(data) {
    this.setState({
      results: data,
      rows: this.state.results.length,
    })
  }

  updateColumnName(data) {
    let newColumnName = [];
    Object.values(data).map((columns) => {
      newColumnName.push(columns.Field);
    })
    this.setState({
      columnName: newColumnName,
      cols: this.state.columnName.length,
    })
  }

  fetchData() {
    let queryString = "describe " + this.props.table + ";";
    SQLHelper.query(queryString, (data) => {this.updateColumnName(data)});
    queryString = "select * from " + this.props.table + ";";
    SQLHelper.query(queryString, this.updateData);
  }

  render() {
    return (
      <Table collapsing celled={true} >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing />
            {this.state.columnName.map((n, index) => (
              <Table.HeaderCell key={index}>{n}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <EditTableInput key = {this.state.columnName} columnName={this.state.columnName} table={this.props.table}/>

          {this.state.results.map((c, index) => (
            <Table.Row key={index}>
              <Table.Cell collapsing>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </Table.Cell>
              {Object.values(c).map((column, index) => {
                return (
                  <Table.Cell key={index} singleLine={false}>
                    <Container fluid textAlign="left">{column}</Container>
                  </Table.Cell>
                )})
              }
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export class TableSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTable: "",
      tableList: [],
    }
    this.onChange = this.onChange.bind(this);
    this.updateTableList = this.updateTableList.bind(this);
  }

  componentDidMount() {
    this.fetchTableList();
  }

  updateTableList(data) {
    let newTableList = [];
    // IQ drop
    Object.values(data).map((tmp) => {
      Object.values(tmp).map((tmp2) => {
        newTableList.push({
          key: tmp2,
          text: tmp2,
          value: tmp2,
        });
      })
    });
    this.setState({
      tableList: newTableList,
    });
  }

  fetchTableList() {
    const queryString = "show tables;"
    SQLHelper.query(queryString, this.updateTableList);
  }

  onChange(event, data) {
    this.props.handleSubmit(data.value);
  }

  render() {
    return (
      <Dropdown
        search
        selection
        placeholder="Select a table for editing..."
        options={this.state.tableList}
        onChange={this.onChange}
      />
    )
  }
}

export class EditInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(input) {
    this.setState({
      table: input,
    });
  }

  render() {
    return (
        <Segment>
          <TableSelector handleSubmit={this.handleSubmit} />
          <EditTable table={this.state.table} />
        </Segment>
    )
  }
}
