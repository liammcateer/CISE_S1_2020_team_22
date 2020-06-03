process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () =>{
    describe('Submit Tests', () =>{
        it('Get analyst queue', function(done){
            this.timeout(5000);
            chai.request(server)
            .get('/api/v1/article/analyst')
            .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.data).to.have.property('article');
              done();
            });
        });
    });
});