const chakram = require('chakram'),
  expect = chakram.expect;

const testData = [
  {
    id: 1,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description:
      'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: 140
  },
  {
    id: 2,
    name: 'Bright Future Sunglasses',
    slogan: "You've got to wear shades",
    description:
      "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    category: 'Accessories',
    default_price: 69
  },
  {
    id: 3,
    name: 'Morning Joggers',
    slogan: 'Make yourself a morning person',
    description:
      "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
    category: 'Pants',
    default_price: 40
  },
  {
    id: 4,
    name: "Slacker's Slacks",
    slogan: 'Comfortable for everything, or nothing',
    description: "I'll tell you how great they are after I nap for a bit.",
    category: 'Pants',
    default_price: 65
  },
  {
    id: 5,
    name: 'Heir Force Ones',
    slogan: 'A sneaker dynasty',
    description:
      "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
    category: 'Kicks',
    default_price: 99
  },
  {
    id: 6,
    name: 'Pumped Up Kicks',
    slogan: 'Faster than a just about anything',
    description:
      'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
    category: 'Kicks',
    default_price: 89
  },
  {
    id: 7,
    name: 'Blues Suede Shoes',
    slogan: '2019 Stanley Cup Limited Edition',
    description:
      'Touch down in the land of the Delta Blues in the middle of the pouring rain',
    category: 'Dress Shoes',
    default_price: 120
  },
  {
    id: 8,
    name: 'YEasy 350',
    slogan: 'Just jumped over jumpman',
    description:
      'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.',
    category: 'Kicks',
    default_price: 450
  },
  {
    id: 9,
    name: 'Summer Shoes',
    slogan: 'A risky call in the spring or fall',
    description:
      'Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.',
    category: 'Kicks',
    default_price: 59
  },
  {
    id: 10,
    name: 'Infinity Stone',
    slogan:
      'Reality is often disappointing. That is, it was. Now, reality can be whatever I want.',
    description:
      'The Infinity Stones are six immensely powerful stone-like objects tied to different aspects of the universe, created by the Cosmic Entities. Each of the stones possesses unique capabilities that have been enhanced and altered by various alien civilizations for millennia.',
    category: 'Accessories',
    default_price: 5000000
  }
];

describe('Product List endpoint', () => {
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
});
