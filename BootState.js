
var BootState = {

preload: function() {
    this.game.load.spritesheet('girl', 'assets/greenChunkSheet.png',80, 85, 7);
    this.game.load.image('donut', 'assets/bittenDonut.png');

},

create : function() {
  this.game.state.start('pls');
}


};