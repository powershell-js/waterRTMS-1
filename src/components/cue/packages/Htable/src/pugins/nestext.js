import Handsontable from 'handsontable-pro';
import './nestext.css';

function NestExt(hotInstance) {
    Handsontable.plugins.BasePlugin.call(this, hotInstance);
    this.rowspanArray=[];
    this._superClass = Handsontable.plugins.BasePlugin;
}

NestExt.prototype = Object.create(Handsontable.plugins.BasePlugin.prototype, {
    constructor: {
        writable: true,
        configurable: true,
        value: NestExt
    },
});

NestExt.prototype.isEnabled = function () {
    return !!this.hot.getSettings().nestedHeaders;
};

NestExt.prototype.enablePlugin = function () {
    if (this.enabled) {
        return;
    }
    this.settings = this.hot.getSettings().nestedHeaders;
    this.addHook('afterGetColHeader', this.onAfterGetColHeader.bind(this));
    // this.addHook('afterViewportColumnCalculatorOverride', (calc) => this.onAfterViewportColumnCalculatorOverride(calc));
    this.setupRowspanArray();
    this._superClass.prototype.enablePlugin.call(this);
};

NestExt.prototype.disablePlugin = function () {
    this._superClass.prototype.disablePlugin.call(this);
};

NestExt.prototype.updatePlugin = function () {
    this.disablePlugin();
    this.enablePlugin();
    this._superClass.prototype.updatePlugin.call(this);
};

NestExt.prototype.onAfterGetColHeader=function(index, TH) {
    var _this=this;
    var dom=$(TH);
    var headerRow=dom.parents("thead").find("tr").index(dom.parent());
    if(headerRow<0) return
    var rowdom=_this.rowspanArray[headerRow][index];
    if(rowdom){
        dom.attr('_k',rowdom._k)
    }
    if (rowdom && rowdom.rowspan>1) {
        setTimeout(() => {
            dom.attr('rowspan',rowdom.rowspan);
            dom.addClass('rowspan');
            _this.onAfterViewportColumnCalculatorOverride()
        }, 50);
    }else{
        dom.removeClass('rowspan');
        dom.removeAttr('rowspan');
    }
    if(rowdom &&rowdom.hidden){
        dom.addClass('hiddenHeaderRow');
    }else{
        dom.removeClass('hiddenHeaderRow');
    }
};

NestExt.prototype.setupRowspanArray = function () {
    function checkIfExists(array, index) {
        if (!array[index]) {
          array[index] = [];
        }
    }
    this.rowspanArray=[];
    $.each(this.settings, (level,levelValue) => {
        $.each(levelValue, (col,val) => {
            checkIfExists(this.rowspanArray, level);
            this.rowspanArray[level].push({
                label: levelValue[col].label || '',
                rowspan: levelValue[col].rowspan,
                colspan: levelValue[col].colspan,
                _k:levelValue[col]._k,
                hidden: levelValue[col].rowspan==0
            });
            if(levelValue[col].colspan>1){
                var i=1;
                while (i<levelValue[col].colspan) {
                    this.rowspanArray[level].push({
                        label: '',
                        rowspan: 0,
                        colspan: 0,
                        hidden: true
                    });
                    i++;
                }
            }

        });
    });
};

NestExt.prototype.onAfterViewportColumnCalculatorOverride = function(calc){
    var master_table=$(this.hot.container)
    var mas_ths= master_table.find("thead tr th.rowspan")
    $.each(mas_ths,function(i,th){
        var k=$(th).attr("_k");
        var cth=master_table.parent(".htable").find(".ht_clone_left th.rowspan[_k='"+k+"']")
        cth.height($(th).height());
        var ccth=master_table.parent(".htable").find(".ht_clone_top_left_corner th.rowspan[_k='"+k+"']")
        ccth.height($(th).height());
    })
}

NestExt.prototype.destroy = function () {
    this.rowspanArray=[];
    this._superClass.prototype.destroy.call(this);
};

Handsontable.plugins.registerPlugin('nestExt', NestExt);
