'use strict';

module.exports = {
  listenTo: function(ee, event, listener){
    ee.on(event, listener);
    return this;
  },
  removeListener: function(ee, event, listener){
    if(ee.off != null){
      ee.off(event, listener);
    }
    else if(ee.removeLister){
      ee.removeListner(event, listener);
    }
    return this;
  },
  componenetWillMount: function(){
    this.listeners = [];
    return;
  },
  componentWillUnmount: function(){
    for(var l in this.listeners){
      this.removeListener(l.ee, l.event, l.listener);
    }
    return;
  }
};
