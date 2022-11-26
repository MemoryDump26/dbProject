import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {
  Table,
  Form,
  Input,
  Button,
  Segment,
  Container,
  Grid
} from 'semantic-ui-react';

class AddCustomerTable extends React.Component {
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

export class AddCustomerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerNumber: "",
      customerName: "",
      phone: "",
      address: "",
      city: "",
      country: "",
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
      <Segment>
        <Form>
          <Form.Field>
            <label>Name</label>
            <Input/>
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <Input/>
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <Input/>
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <Input/>
          </Form.Field>
          <Form.Field>
            <label>Country</label>
            <Input/>
          </Form.Field>
          <Button type="submit" onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Segment>
    )
  }
}

export class AddCustomerInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
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
      })
  }

  render() {
    return (
      <Segment>
      </Segment>
    )
  }
}
