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

export class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: [],
      results: [],
      rows: 0,
      cols: 0,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.table === prevProps.table) return;
    this.fetchData();
  }

  fetchData() {
    const queryString = "select * from " + this.props.table + ";";
    const fetchOptions = SQLHelper.createQuery(queryString);

    fetch("http://localhost:3001/query", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        let tmp = [];
        for (let key in data[0]) {
          if (data[0].hasOwnProperty(key)) {
            tmp.push(key);
          }
        }
        this.setState({
          columnName: tmp,
          results: data,
          rows: this.state.results.length,
          cols: this.state.columnName.length,
        })
      })
  }

  render() {
    return (
      <Table columns={this.state.cols} collapsing celled={true} >
        <Table.Header>
          <Table.Row>
            {this.state.columnName.map((n, index) => (
              <Table.HeaderCell key={index}>{n}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {this.state.columnName.map((n, index) => (
              <Table.Cell key={index}>
                <Input fluid={true} />
              </Table.Cell>
            ))}
          </Table.Row>
          {this.state.results.map((c, index) => (
            <Table.Row key={index}>
              {Object.values(c).map((column, index) => {
                return <Table.Cell key={index} singleLine={false}>{column}</Table.Cell>
              })}
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
  }

  componentDidMount() {
    this.fetchTableList();
  }

  fetchTableList() {
    const queryString = "show tables;"
    const fetchOptions = SQLHelper.createQuery(queryString);

    fetch("http://localhost:3001/query", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
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
      });
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

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.query === prevProps.query) return;
  }


  handleSubmit(input) {
    this.setState({
      table: input,
    });
  }

  render() {
    return (
      <Segment.Group>
        <Segment>
          <TableSelector options={this.state.tableList} handleSubmit={this.handleSubmit} />
        </Segment>
        <Segment>
          <EditTable table={this.state.table} />
        </Segment>
      </Segment.Group>
    )
  }
}
