import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Table, Input, Button, Segment, Container, Grid } from 'semantic-ui-react';
import { QueryInterface, QueryTable } from './QueryV2.js';
import { EditInterface, EditTable } from './Editing.js';
import { AddCustomerInput, InsertForm } from './AddCustomer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="query_table">
      <EditInterface />
    </div>
  </React.StrictMode>
);
