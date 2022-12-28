import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index';
chai.should();
chai.use(chaiHttp);
describe('/GET coupon', () => {
    it('it should GET all the coupon', (done) => {
        chai.request(server)
            .get('/coupon')
            .end((err, res) => {
            if (err) {
                res.should.have.status(204);
            }
            else {
                res.should.have.status(200);
                res.body.should.be.a('object');
            }
            done();
        });
    });
});
describe('/GET/:id coupon', () => {
    let id = "63a01ea1708e4fdc5278f115";
    it('it should GET a coupon by the given id', (done) => {
        chai.request(server)
            .get("/coupon/" + id)
            .end((err, res) => {
            if (err) {
                res.should.have.status(204);
                res.body.should.be.a('object');
            }
            else {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("message");
            }
            done();
        });
    });
});
describe('/POST data', () => {
    it('it can POST a coupon without pages field', (done) => {
        let data = {
            couponCode: 3545,
            expiry: "30-12-2022",
            title: "amazon",
            description: [
                "Big sale"
            ],
            paymentMode: "Cash",
            discount: {
                percentage: "15%",
                amount: 4515
            }
        };
        chai.request(server)
            .post('/coupon')
            .send(data)
            .end((err, res) => {
            if (err) {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message");
                res.body.data.couponCode.should.not.be.a('string').status(400);
                res.body.data.discount.amount.should.not.be.a('string');
                res.body.data.title.should.not.be.a('number');
                res.body.errors.should.contain("title is required");
            }
            else {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property("message");
                res.body.data.couponCode.should.be.a('number');
            }
            done();
        });
    });
});
describe('/PUT/:id ', () => {
    it('it should UPDATE a coupon given the id', (done) => {
        chai.request(server)
            .put("/coupon/" + "63a01ea1708e4fdc5278f115")
            .end((err, res) => {
            if (err) {
                res.should.have.status(204);
                res.body.should.be.a('object');
                res.body.data.couponCode.should.not.be.a('string').status(400);
                res.body.data.discount.amount.should.not.be.a('string');
                res.body.data.title.should.not.be.a('number');
            }
            else {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Coupon updated successfully");
            }
            done();
        });
    });
});
describe('/PATCH/:id ', () => {
    it('it should UPDATE a coupon given the id', (done) => {
        chai.request(server)
            .patch("/coupon/" + "63a01efb708e4fdc5278f11b")
            .end((err, res) => {
            if (err) {
                res.should.have.status(204);
                res.body.should.be.a('object');
            }
            else {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Coupon updated successfully');
            }
            done();
        });
    });
});
describe('/DELETE/:id ', () => {
    it('it should UPDATE a coupon given the id', (done) => {
        chai.request(server)
            .delete("/coupon/" + "63a01efb708e4fdc5278f11b")
            .end((err, res) => {
            if (err) {
                res.should.have.status(204);
                res.body.should.be.a('object');
            }
            else {
                res.should.have.status(202);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Coupon deleted successfully');
            }
            done();
        });
    });
});
