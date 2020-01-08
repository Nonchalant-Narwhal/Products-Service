const chakram = require('chakram'),
  expect = chakram.expect;

const mockData = require('./mockData');

describe('Product List endpoint', () => {
  let testData;
  beforeEach(() => {
    testData = mockData.listData;
  });

  it('Gets correct list of products when no parameters are provided', () => {
    return chakram.get('http://localhost:3000/products/list').then(response => {
      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(testData.slice(0, 5));
      return chakram.wait();
    });
  });

  it('Gets correct list of products when page parameter is provided', () => {
    return chakram
      .get('http://localhost:3000/products/list?page=2')
      .then(response => {
        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(testData.slice(5, 11));
        return chakram.wait();
      });
  });

  it('Gets correct list of products when count is provided', () => {
    return chakram
      .get('http://localhost:3000/products/list?count=2')
      .then(response => {
        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(testData.slice(0, 2));
        return chakram.wait();
      });
  });

  it('Gets correct list of products when count and page parameters are provided', () => {
    return chakram
      .get('http://localhost:3000/products/list?count=2&page=2')
      .then(response => {
        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(testData.slice(2, 4));
        return chakram.wait();
      });
  });

  it('Responds with 404 if page value is less than 1', () => {
    return chakram
      .get('http://localhost:3000/products/list?page=0')
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });

  it('Responds with 404 if page value is not a number', () => {
    return chakram
      .get('http://localhost:3000/products/list?page=a')
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });

  it('Responds with 404 if count value is less than 0', () => {
    return chakram
      .get('http://localhost:3000/products/list?count=-1')
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });

  it('Responds with 404 if count value is not a number', () => {
    return chakram
      .get('http://localhost:3000/products/list?count=a')
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });
});

describe('Product Info endpoint', () => {
  let testData;
  beforeEach(() => {
    testData = mockData.productInfoData;
  });

  it('Gets the correct product info for an existing product ID', () => {
    return chakram.get('http://localhost:3000/products/2').then(response => {
      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(testData);
      expect(response.body.features.length).to.equal(3);
      return chakram.wait();
    });
  });

  it('Reponds 404 when an invalid product ID is entered', () => {
    return chakram
      .get('http://localhost:3000/products/1000000000000000000000000000000')
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });
});

describe('Product Styles endpoint', () => {
  it('Correctly retireves the correct style information', () => {
    return chakram
      .get('http://localhost:3000/products/1/styles')
      .then(response => {
        expect(response).to.have.status(200);
        const styleInfo = response.body;

        expect(styleInfo.product_id).to.equal(1);
        expect(styleInfo.results).to.be.an('array');
        expect(styleInfo.results.length).to.equal(6);
        expect(styleInfo.results[0].photos.length).to.equal(6);
        return chakram.wait();
      });
  });

  it('Responds with 404 status if an invalid product ID is passed in', () => {
    return chakram
      .get(
        'http://localhost:3000/products/1000000000000000000000000000000/styles'
      )
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });
});

describe('Related Products endpoint', () => {
  it('returns correct list of related products', () => {
    return chakram
      .get('http://localhost:3000/products/1/related')
      .then(response => {
        expect(response).to.have.status(200);
        expect(response.body.length).to.equal(4);
        expect(response.body).to.deep.equal([2, 3, 8, 7]);
        return chakram.wait();
      });
  });

  it('responds with a 404 status if product id is invalid', () => {
    return chakram
      .get(
        'http://localhost:3000/products/1000000000000000000000000000000/related'
      )
      .then(response => {
        expect(response).to.have.status(404);
        return chakram.wait();
      });
  });
});
