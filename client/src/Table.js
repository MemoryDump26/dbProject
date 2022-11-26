export function TableHeader(props) {
  return (
    <thead>
      <tr>
        {props.header.map((n, index) => (
          <th key={index}>{n}</th>
        ))}
      </tr>
    </thead>
  )
}

export function TableBody(props) {
  return (
    <tbody>
      {props.body.map((c, index) => (
        <tr key={index}>
          {Object.values(c).map((column, index) => {
            return <td key={index}>{column}</td>
          })}
        </tr>
      ))}
    </tbody>
  )
}

export function TableInfo(props) {
  return (
    <p>
      {props.rows} rows, {props.cols} columns.
    </p>
  )
}

export function Table(props) {
  return (
    <div>
      <TableInfo rows={props.rows} cols={props.cols} />
      <table>
        <TableHeader header={props.header} />
        <TableBody body={props.body} />
      </table>
    </div>
  )
}

