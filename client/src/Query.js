import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Table, Input, Button, Segment, Container, Grid } from 'semantic-ui-react';

class QueryTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table celled={true} compact={true}>
        <Table.Header>
          {this.props.header.map((n, index) => (
            <Table.HeaderCell key={index}>{n}</Table.HeaderCell>
          ))}
        </Table.Header>
        <Table.Body>
          {this.props.body.map((c, index) => (
            <Table.Row key={index}>
              {Object.values(c).map((column, index) => {
                return <Table.Cell key={index} collapsing={true}>{column}</Table.Cell>
              })}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
        </Table.Footer>
      </Table>
    )
  }
}

class QueryInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event, data) {
    this.setState({
      input: data.value,
    })
  }

  onSubmit(event, data) {
    this.props.handleSubmit(this.state.input);
  }

  render() {
    return (
      <Input
        action={{
          type: "submit",
          content: "Query",
          onClick: this.onSubmit,
        }}
        placeholder="SQL here..."
        onChange={this.onChange}
      />
    )
  }
}

export class QueryInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      columnName: [],
      results: [],
      rows: 0,
      cols: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      query: "select * from customers;",
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.query === prevState.query) return;

    console.log("Fetching");
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: this.state.query
      }),
    };

    fetch("http://localhost:3001/query", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        let tmp = [];
        for (let key in data[0]) {
          if(data[0].hasOwnProperty(key)) {
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

  handleSubmit(input) {
    this.setState({
      query: input,
    })
  }

  render() {
    return (
      <Segment>
        <QueryInput handleSubmit={this.handleSubmit} />
        <QueryTable header={this.state.columnName} body={this.state.results} />
      </Segment>
    )
  }
}
