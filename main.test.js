const assert = require('assert');
const http = require('http');
const server = require('./index');
const PORT = 9393;

describe('index.js', () => {
  before(() => {});

  after(() => {
    server.close();
  });

  it('should return uppercase text for a valid POST request', (done) => {
    const data = 'hello world';
    const options = {
      hostname: 'localhost',
      port: PORT,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': data.length,
      },
    };
    const req = http.request(options, (res) => {
      let response = '';
      res.on('data', (chunk) => {
        response += chunk;
      });
      res.on('end', () => {
        assert.strictEqual(response, data.toUpperCase());
        done();
      });
    });
    req.write(data);
    req.end();
  });

  it('should return an error for an invalid HTTP method', (done) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      method: 'GET',
    };
    const req = http.request(options, (res) => {
      assert.strictEqual(res.statusCode, 405);
      let response = '';
      res.on('data', (chunk) => {
        response += chunk;
      });
      res.on('end', () => {
        assert.strictEqual(response, 'Method not allowed');
        done();
      });
    });
    req.end();
  });
});
