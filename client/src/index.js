import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Table, Input, Button, Segment, Container, Grid } from 'semantic-ui-react';
import { QueryInterface } from './Query.js';
import { AddCustomerInput } from './AddCustomer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="query_table">
      <QueryInterface />
    </div>
  </React.StrictMode>
);
