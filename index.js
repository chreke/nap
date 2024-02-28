import http from 'node:http';
import url from 'node:url';
import crypto from 'crypto';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const ITEMS = {
  "/foo": {"bar": {"bar": "A document"}}
};

const getPathComponents = path => {
  // TODO: Raise on empty string
  // TODO: Trailing and leading slash normalization (can be done just by filtering out the empty string)
  const parts = path.split('/').filter(x => x !== '');
  return {
    collection: "/" + parts.slice(0, -1).join('/'),
    key: parts.length > 0 ? parts[parts.length - 1] : null
  };
}

// TODO: Raise an exception on empty string
const getItem = (path) => {
  if (ITEMS[path] !== undefined) {
    return Object.values(ITEMS[path]);
  }
  const pathComponents = getPathComponents(path);
  const collection = ITEMS[pathComponents.collection];
  console.log(pathComponents);
  if (collection === undefined) {
    return null;
  }
  const item = collection[pathComponents.key];
  if (item === undefined) {
    return null;
  }
  return item;
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
