'use strict';
var ListenerMixin = require('./ListenerMixin');
module.exports = function(config){
  var ModelViewMixin = {
    mixins: [ListenerMixin],
    componentWillMount: function(){
      if(this.props.model != null){
        this.models = this.props.model;
      }
      else if((this.promps.params != null ? this.promps.params.id : void 0) != null){
        this.model = new config.model();
        this.model.id = this.props.params.id;
        this.listenTo(this.model, 'change', function(){
          this.forceUpdate();
        }.bind(this));
        this.models.fetch();
      }
    },
  };
  if(config.model == null){
    throw new Error('Missing model attributes');
  }
  config.mixins = null || [];
  config.mixins.push(ModelViewMixin);
  return this.view(config);
};
