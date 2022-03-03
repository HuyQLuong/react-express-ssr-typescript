import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import App from 'client/components/App';

const port = 3000;
const server = express();

server.use(express.static('build'));

server.get('/', (req, res) => {
  const body = renderToString(React.createElement(App));

  const html = ({ body }: { body: string }) => `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body style="margin:0">
        <div id="app">${body}</div>
      </body>
      <script src="/client.js" defer></script>
      <link rel="stylesheet" type="text/css" href="./styles.css" />

    </html>
  `;

  res.send(
    html({
      body
    })
  );
})

server.listen(port, () => console.log('Example app listening on port 3000!'));