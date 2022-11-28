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

export class InsertForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  createOnChangeFunction(key, value) {
    let object = { [key]: value };
    this.setState(object);
  }

  createInputField(name) {
    return (
      <Form.Field>
        <label>{name}</label>
        <Input
          onChange={(event, data) => {
            this.createOnChangeFunction(name, data.value);
          }}
          />
      </Form.Field>
    )
  }

  onSubmit(event, data) {
    console.log(this.state);
  }

  render() {
    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            {this.createInputField("customerName")}
            {this.createInputField("phone")}
          </Form.Group>
          <Form.Group>
            {this.createInputField("address")}
            {this.createInputField("city")}
            {this.createInputField("country")}
          </Form.Group>
          <Button type="submit">Insert</Button>
        </Form>
      </Segment>
    )
  }
}
