'use strict';

const image = require('../models/image');

exports.postImage = async (ctx) => {
  console.log(ctx.request.body);
  try {
    await image.create(ctx.request.body);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, 'Something went wrong uploading the picture');
  }
};
//instead of repeating * 3, can I make the item value dynamic and pass it from the front too?
exports.getTops = async (ctx) => {
  //const { tempToday, rainToday } = ctx.request.body;
  try {
    const topArr = await image.find({
      item: 'top',
      // tempRange: 'hot',
      // rain: false,
    });
    //const randomTop = topArr[Math.floor(Math.random() * topArr.length)];
    if (topArr) {
      ctx.body = topArr;
      ctx.status = 200;
    } else {
      ctx.throw(404, 'No appropiate clothing items were found');
    }
  } catch (error) {
    ctx.throw(500, 'Something went wrong getting the pictures');
  }
};
exports.getBottoms = async (ctx) => {
  //const { tempToday, rainToday } = ctx.request.body;
  try {
    const bottomArr = await image.find({
      item: 'bottom',
      // tempRange: 'hot',
      // rain: false,
    });
    // const randomBottom =
    //   bottomArr[Math.floor(Math.random() * bottomArr.length)];
    if (bottomArr) {
      ctx.body = bottomArr;
      ctx.status = 200;
    } else {
      ctx.throw(404, 'No appropiate clothing items were found');
    }
  } catch (error) {
    ctx.throw(500, 'Something went wrong getting the pictures');
  }
};
exports.getShoes = async (ctx) => {
  //const { tempToday, rainToday } = ctx.request.body;
  try {
    const shoeArr = await image.find({
      item: 'shoe',
      tempRange: 'hot',
      rain: false,
    });

    // const randomShoe = shoeArr[Math.floor(Math.random() * shoeArr.length)];
    if (shoeArr) {
      ctx.body = shoeArr;
      ctx.status = 200;
    } else {
      //TODO if shoeArr empty, it throws 500 instead of 404, fix
      ctx.throw(404, 'No appropiate clothing items were found');
    }
  } catch (error) {
    ctx.throw(500, 'Something went wrong getting the pictures');
  }
};
