'use strict';
'global document';
var page = require('page');
var React = require('react');

var app = {};
var renderView = function(opt, cb){
  opt = opt || {};
  if(typeof(opt.view) === 'function'){
    opt.view = opt.view(opt.args);
    return renderView(opt, cb);
  }
  else{
    React.renderComponent(opt.view, opt.el);
    return cb();
  }
};

app.createRouteHandler = function(opt){
  if(typeof(opt) === 'string'){
    return function(ctx, next){
      return require([opt], function(fn){
        return fn(ctx, next);
      });
    };
  }
  else{
    return app.createRenderHandler(opt);
  }
};

app.createRenderHandler = function(opt){
  opt = opt || {};
  if(opt.continue === null){
    opt.continue = true;
  }
  if(typeof(opt.el === 'string')){
    opt.el = document.getElementById(opt.el);
  }
  var handler = function(ctx, next){
    var nopt = {
      el: opt.el,
      view: opt.view,
      args: ctx
    };
    renderView(nopt, function(){
      if(opt.title){
        document.title = opt.title;
      }
      if(opt.continue){
        next();
      }
    });
  };
  return handler;
};

app.createRenderHandler = function(opt){
  opt = opt || {};
  if(opt.continue === null){
    opt.continue = true;
  }
  if(typeof(opt.el === 'string')){
    opt.el = document.getElementById(opt.el);
  }
  var handler = function(ctx, next){
    var nopt = {
      el: opt.el,
      view: opt.view,
      args: ctx
    };
    renderView(nopt, function(){
      if(opt.title){
        document.title = opt.title;
      }
      if(opt.continue){
        next();
      }
    });
  };
  return handler;
};

var __slice = [].slice;

app.route = function() {
  var handlers, route;
  route = arguments[0], handlers = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  handlers = handlers.map(app.createRouteHandler);
  page.apply(null, [route].concat(__slice.call(handlers)));
  return app;
};

app.route = page;
app.use = app.route.bind(null, '*');
app.start = page.start;

module.exports = app;
