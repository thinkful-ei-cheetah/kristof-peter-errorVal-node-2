/* eslint-disable indent */
'use strict';

const chai = require('chai');
const app = require('../app');
const store = require ('../playstore');
const request = require('supertest');
const expect = chai.expect;

it('should return an array of apps', () => {
    return request(app)
    .get('/app')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(1);
      const apps = res.body[0];
      expect(apps).to.include.all.keys('App', 'Category', 'Rating', 'Genres');
    });
});

it('should return an array of apps filtered by genre', () => {
    const query = {genre: 'arcade'};
    
    return request(app)
    .get('/app') 
    .query(query)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(1);
      const apps = res.body[0];
      expect(apps.Genres).to.eql('Arcade');
    });
});

it('should return an array of apps sorted by rating', () => {
    const query =   {sort : 'Rating',
                    genre: 'arcade'}

    //const expected = ["Angry Birds Rio","Subway Surfers","Sonic Dash"];

    return request(app)
    .get('/app')
    .query(query)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(1);
    //   const apps = res.body;
    //   let titles = apps.map(app => app.App)
    //   expect(titles).to.eql(expected);

        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted =  res.body[i].Rating <= res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
    });
});

it('should return an array of apps sorted by app alphabetically', () => {
    const query =   {sort : 'App',
                    genre: 'arcade'}

    const expected = ["Angry Birds Rio","Sonic Dash","Subway Surfers"];

    return request(app)
    .get('/app')
    .query(query)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(1);
      const apps = res.body;
      let titles = apps.map(app => app.App)
      expect(titles).to.eql(expected);
    });
});