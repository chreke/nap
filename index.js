import http from 'node:http';
import url from 'node:url';
import crypto from 'crypto';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const ITEMS = {
  "/foo": {"bar": "A document"}
};

const getPathComponents = path => {
  // TODO: Raise on empty string
  // TODO: Trailing and leading slash normalization
  const parts = path.split('/').filter(x => x !== '');
  console.log(parts);
  return {
    collection: "/" + parts.slice(0, -1).join('/'),
    key: parts.length > 0 ? parts[parts.length - 1] : null
  };
}

// TODO: Raise an exception on empty string
// TODO: Raise an exception if no item is found
const getItem = (path) => {
  const components = getPathComponents(path);
  const collection = ITEMS[components.collection];
  if (collection === undefined) {
    return null
  }
  if (components.key === undefined) {
    return collection
  }
  let item = collection[components.key];
  return item !== undefined ? item : null
}

const insertItem = (path, item) => {
  const key = crypto.randomUUID();
  if (ITEMS[path] === undefined) {
    ITEMS[path] = {};
  }
  ITEMS[path][key] = item;
  return path + "/" + key
}

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url);
  res.setHeader('Content-Type', 'application/json');
  console.log(ITEMS);
  if (req.method == 'GET') {
    let response;
    const item = getItem(urlParts.pathname);
    if (item === null) {
      res.statusCode = 404;
      response = "Not Found\n";
    } else {
      res.statusCode = 200;
      response = JSON.stringify(item) + '\n';
    }
    // TODO: Remember that you can use res.write as well!
    res.end(response);
  } else if (req.method == 'POST') {
    // TODO: Content negotiation?
    // TODO: Respond with bad request in case JSON is invalid
    // const item = JSON.parse();
    const chunks = [];
    req
      .on('data', chunk => { chunks.push(chunk) })
      .on('end', () => { 
        const body = Buffer.concat(chunks).toString();
        const url = insertItem(urlParts.pathname, JSON.parse(body));
        res.statusCode = 201;
        res.setHeader('Location', url);
        res.end(body + "\n");
      });
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`nap running at http://${HOSTNAME}:${PORT}/`);
  console.log('Get ready to nap!');
});
