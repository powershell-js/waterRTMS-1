import Handsontable from 'handsontable-pro';
Handsontable.hooks.register('onCellDbClick');
function CellDbClick(hotInstance) {
    Handsontable.plugins.BasePlugin.call(this, hotInstance);
    this._superClass = Handsontable.plugins.BasePlugin;
}

CellDbClick.prototype = Object.create(Handsontable.plugins.BasePlugin.prototype, {
    constructor: {
        writable: true,
        configurable: true,
        value: CellDbClick
    },
});

CellDbClick.prototype.isEnabled = function () {
    return !!this.hot.getSettings().cellDbClick;
};

CellDbClick.prototype.enablePlugin = function () {
    if (this.enabled) {
        return;
    }
    this.settings = this.hot.getSettings().cellDbClick;
    this.addHook('afterRenderer', this.afterRenderer.bind(this));
    this._superClass.prototype.enablePlugin.call(this);
};

CellDbClick.prototype.disablePlugin = function () {
    this._superClass.prototype.disablePlugin.call(this);
};

CellDbClick.prototype.updatePlugin = function () {
    this.disablePlugin();
    this.enablePlugin();
    this._superClass.prototype.updatePlugin.call(this);
};

CellDbClick.prototype.afterRenderer = function (TD,row,col,prop,value,cellProperties) {
    var self=this;
    $(TD).on("dblclick",function(e){
        self.hot.runHooks('onCellDbClick',prop,value,row,col,cellProperties,TD,e,self);
    })
};


CellDbClick.prototype.destroy = function () {
    this._superClass.prototype.destroy.call(this);
};

Handsontable.plugins.registerPlugin('cellDbClick', CellDbClick);