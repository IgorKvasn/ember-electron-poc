import Ember from 'ember';

export default Ember.Controller.extend({
  result: null,
  filePath: null,

  electron: Ember.computed(function(){
    return this.isElectron();
  }),

  isElectron(){
    return !!(window.process && window.process.versions['electron']);
  },

  actions:{
    callElectron(){
      if (Ember.isNone(this.get('filePath'))){
        alert('No file path defined');
      }

      let fs = requireNode('fs');
      fs.readFile(this.get('filePath'), 'utf8',  (err,data) => {
        if (err) {
          this.set('result', err);
          return console.log(err);
        }
        console.log(data);
        this.set('result', data);
      });
    }
  }
});
