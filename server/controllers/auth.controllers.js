const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';


exports.register = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const user = await User.findOne({ email: email});

  if (user) {
    return ctx.throw(409, 'Username already exists');
  }

  const hashPassword = await bcrypt.hashSync(password, 10);
  const newUser = new User({ username , email, password: hashPassword });

  try {
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    ctx.status = 201;
    ctx.body = { 
      message: 'User created successfully',
      accessToken
    };
  } catch (err) {
    ctx.throw(500, err);
  }
}

exports.login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;

    const user = await User.findOne({ username });
    if (!user) {
      return ctx.throw(401, 'Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return ctx.throw(401, 'Invalid credentials');
    }

    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    const { password: hashPassword, ...userData } = user._doc;

    ctx.cookies.set('accessToken', accessToken, { httpOnly: true });
    
    ctx.status = 200;
    ctx.body = { 
      message: 'Login successful',
      accessToken,
      user: userData
    };
  } catch (err) {
    ctx.throw(500, err);
  }
}

exports.profile = async (ctx) => {  
  try {
    console.log(ctx.state.user)
    const { _id } = ctx.state.user;
    const user = await User.findById(_id);
    if (!user) {
      return ctx.throw(404, 'User not found');
    }

    const { password: hashPassword, ...userData } = user._doc;
    ctx.status = 200;
    ctx.body = { user: userData };
} catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Profile not found' };
  }
}

exports.deleteProfile = async (ctx) => {  
  try {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 404;
      ctx.body = { message: `User not found by ${id}` }
    } else {
      const result = await User.deleteOne({ _id : id });
      ctx.status = 200;
      ctx.body = { message: `User has been successfully deleted` }
    }
  } catch (e) {
    ctx.status = 500;
    console.log('Error deleting profile',e)
  }
}

exports.updateProfile = async (ctx) => {    
  try {
    const { id } = ctx.params;
    const updates = ctx.request.body;
    console.log("thisisupdates" , updates);
    if (!id) {
      ctx.status = 404;
      ctx.body = { message: `User not found by ${id}` }
    } else {
      const result = await User.findByIdAndUpdate( id, updates, {new : true});
      ctx.status = 200;
      ctx.body = result;
    }
  } catch (e) {
    ctx.status = 500;
    console.log('Error updating profile',e)
  }
} 

exports.getFavorites = async (ctx) => { 

} 

exports.addFavorite = async (ctx) => {         

}

exports.removeFavorite = async (ctx) => { 

} 

exports.logout = async (ctx) => { 
  try {
    ctx.cookies.set('accessToken', null);
    ctx.status = 200;
    ctx.body = { message: 'Logout successful', accessToken: null};
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Logout failed' };
  }
} 