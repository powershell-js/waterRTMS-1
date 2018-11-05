import Handsontable from 'handsontable-pro';
import SettingsMapper from './settingsMapper';

export const CURRENT_ROW_CLASS = "htable-current-row";
export const HOVER_ROW_CLASS = "htable-hover-row";

/**
 * Rewrite the settings object passed to the watchers to be a clean array/object prepared to use withing Handsontable config.
 *
 * @param {*} observerSettings Watcher object containing the changed data.
 * @returns {Object|Array}
 */
export function rewriteSettings(observerSettings){
    let settings = null;
    let type = {};
    if(Object.prototype.toString.call(observerSettings).indexOf('Array') > -1){
        settings = [];
        type.array = true;

    }
    else if(typeof observerSettings === 'object'){
        settings = {};
        type.object = true;
    }

    if(type.array || type.object){
        for(const p in observerSettings){
            if(observerSettings.hasOwnProperty(p)){
                settings[p] = observerSettings[p];
            }
        }

    }
    else{
        settings = observerSettings;
    }

    return settings;
}

/**
 * Initialize Handsontable.
 *
 * @param {Object} vueInstance The Vue component instance object.
 */
export function hotInit(vueInstance){
    const settingsMapper = new SettingsMapper();
    const unmappedSettings = [
        vueInstance.settings ? vueInstance.settings : vueInstance._props,
    ];

    if(vueInstance.settings){
        unmappedSettings.push(vueInstance._props)
    }
    vueInstance.table = new Handsontable(vueInstance.$el,
        settingsMapper.prepare(...unmappedSettings));

    vueInstance.table._options = {currentRow: null};
    // $(window).resize(function(){
    //     vueInstance.table.render();
    // });
}

export function hotRender(vueInstance){
    if(vueInstance.table){
        vueInstance.table.render();
        vueInstance.table._options = {currentRow: null};
        return;
    }
    hotInit(vueInstance);
}

/**
 * Destroy the Handsontable instance.
 *
 * @param {Object} vueInstance The Vue component instance object.
 */
export function hotDestroy(vueInstance){
    vueInstance.table.destroy();
}

/**
 * Generate an object containing all the available Handsontable properties and plugin hooks (with the `on`-prefixes added).

 * @returns {Object}
 */
export function propFactory(){
    const settingsMapper = new SettingsMapper();
    const currentSettings = Handsontable.helper.clone(
        Handsontable.DefaultSettings.prototype);
    const registeredHooks = Handsontable.hooks.getRegistered();

    for(let prop in currentSettings){
        if(currentSettings.hasOwnProperty(prop)){
            currentSettings[prop] = {};
        }
    }

    for(let i = 0; i < registeredHooks.length; i++){
        currentSettings[settingsMapper.addHookPrefix(registeredHooks[i])] = {};
    }

    currentSettings.root = {
        'type': String,
        'default': 'hot-' + new Date().getTime()
    };

    currentSettings.settings = {
        'type': Object,
        validator: function(value){
            // 禁用单元格选择事件
            value.disableVisualSelection = true;
            return true;
        }
    };

    return currentSettings;
}

/**
 * Generate and object containing all the available Handsontable properties and hooks tied to the Handsontable updating function.
 *
 * @param {Function} updateFunction Function used to update a single changed property.
 * @param {Function} bulkUpdateFunction Function used to update the whole `settings` object.
 * @returns {Object}
 */
export function propWatchFactory(updateFunction, bulkUpdateFunction){
    const props = propFactory();

    for(const prop in props){
        if(props.hasOwnProperty(prop)){
            if(prop === 'settings'){
                props[prop] = {
                    handler: function(...args){
                        return bulkUpdateFunction.call(this, prop, ...args);
                    },
                    deep: true
                };

            }
            else{
                props[prop] = {
                    handler: function(...args){
                        return updateFunction.call(this, prop, ...args);
                    },
                    deep: true
                };
            }
        }
    }

    return props;
}

// The `this` value in the functions below points to the Vue component instance. They're not meant to used anywhere but in the context of the component.

/**
 * Update the Handsontable instance with a single changed property.
 *
 * @param {String} updatedProperty Updated property name.
 * @param {Object} updatedValue Watcher-generated updated value object.
 * @param {Object} oldValue Watcher-generated old value object.
 */
export function updateHotSettings(updatedProperty, updatedValue, oldValue){
    const newSettings = {};

    newSettings[updatedProperty] = rewriteSettings(updatedValue);
    this.table && this.table.updateSettings(newSettings);
}

/**
 * Update the Handsontable instance with a whole changed `settings` property.
 *
 * @param {String} updatedProperty Updated property name.
 * @param {Object} updatedValue Watcher-generated updated value object.
 * @param {Object} oldValue Watcher-generated old value object.
 */
export function updateBulkHotSettings(updatedProperty, updatedValue, oldValue){
    if(!this.table){
        return;
    }
    $(this.table.rootElement)
        .height($(this.table.rootElement).parent().height());
    this.table.updateSettings(rewriteSettings(updatedValue));
    // $(this.table.rootElement).find('tbody tr').on('mouseover', function(){
    //     $('.ht_clone_left').find('tbody tr').eq($(this).index())
    //         .addClass('RiseHover').siblings().removeClass('RiseHover');
    //     $('.handsontable').find('tbody tr').eq($(this).index())
    //         .addClass('RiseHover').siblings().removeClass('RiseHover');
    // }).on('mouseout', function(){
    //     $('.handsontable').find('tbody tr').eq($(this).index())
    //         .removeClass('RiseHover');
    //     $('.ht_clone_left').find('tbody tr').eq($(this).index())
    //         .removeClass('RiseHover');
    // });
    // if(updatedValue.nestedHeaders && updatedValue.nestedHeaders.length > 0){
    //     let len = updatedValue.nestedHeaders.length;
    // }
}

// 选中行渲染
export function renderCurrentRow(table, index){
    let $root = $(table.rootElement);
    $root.find(".ht_clone_left tbody>tr").removeClass(CURRENT_ROW_CLASS)
        .eq(index).addClass(CURRENT_ROW_CLASS);
    $root.find(".ht_master tbody>tr").removeClass(CURRENT_ROW_CLASS)
        .eq(index).addClass(CURRENT_ROW_CLASS);
}

export function coreRegister(){
    require("./pugins/cellDbClick");

    // 复合表头修改
    Handsontable.hooks.add("beforeRender", function(isForced){
        if(!isForced){
            return;
        }
        // 合并表头配置
        let rowSpanArray = [];
        let headers = this.getSettings().nestedHeaders || [];
        headers.forEach((row, ri) => {
            if(!rowSpanArray[ri]){
                rowSpanArray[ri] = [];
            }
            row.forEach((cell) => {
                rowSpanArray[ri].push({
                    rowspan: cell.rowspan, colspan: cell.colspan, _k: cell._k,
                    label: cell.label || "", hidden: cell.rowspan == 0
                });
                if(cell.colspan > 1){
                    let i = 1;
                    while(i < cell.colspan){
                        rowSpanArray[ri].push({
                            label: "", rowspan: 0, colspan: 0, hidden: true
                        });
                        i++;
                    }
                }
            });
        });
        this.rowSpanArray = rowSpanArray;
    });

    Handsontable.hooks.add("afterGetColHeader", function(index, th){
        let $th = $(th);
        let ri = $th.parents("thead").find("tr").index($th.parent());
        if(ri < 0 || ri >= this.rowSpanArray.length
            || index >= this.rowSpanArray[ri].length){
            return;
        }
        let rowdom = this.rowSpanArray[ri][index];
        if(rowdom){
            $th.attr("_k", rowdom._k);
        }
        if(rowdom && rowdom.rowspan > 1){
            // $th.attr('rowspan', rowdom.rowspan);
            $th.addClass('rowspan');
        }
        else{
            $th.removeClass('rowspan');
            // $th.removeAttr('rowspan');
        }
        if(rowdom && rowdom.hidden){
            $th.addClass('hiddenHeaderRow');
        }
        else{
            $th.removeClass('hiddenHeaderRow');
        }
    });

    Handsontable.hooks.add("afterScrollHorizontally", function(){
        // 修复拉倒最左端可能错位
        let $wt = $(this.container).find("div.wtHolder");
        if($wt.scrollLeft() == 0){
            $wt.scrollLeft(1);
        }
    });

    Handsontable.hooks.add("afterRender", function(isForced){
        let $root = $(this.rootElement);
        let $left = $root.find(".ht_clone_left thead>tr");
        let $left_top = $root.find(".ht_clone_top_left_corner thead>tr");
        let $master = $root.find(".ht_master thead>tr");
        for(let i = 0; i < $master.length; i++){
            let ht = $master.eq(i).children(":last").outerHeight();
            $left.eq(i).children().css("height", ht + "px");
            $left_top.eq(i).children().css("height", ht + "px");
        }
    });

    // 行单击高亮
    Handsontable.hooks.add("beforeOnCellMouseDown", function(event, coords, td){
        if(coords.row < 0){
            return;
        }
        let rindex = $(td).parent("tr").index();
        renderCurrentRow(this, rindex);
        // 记录当前行行号
        this._options.currentRow = rindex;
    });
    Handsontable.hooks.add("beforeRenderer", function(td, row){
        if(row != (this._options || {}).currentRow){
            return;
        }
        $(td).parent("tr").addClass(CURRENT_ROW_CLASS);
    });
    // 行hover
    Handsontable.hooks.add("beforeOnCellMouseOut", function(event, coords){
        if(coords.row < 0){
            //表头
            return;
        }
        let $root = $(this.rootElement);
        $root.find(".ht_clone_left tbody>tr").removeClass(HOVER_ROW_CLASS);
        $root.find(".ht_master tbody>tr").removeClass(HOVER_ROW_CLASS);
    });
    Handsontable.hooks.add("beforeOnCellMouseOver", function(event, coords, td){
        if(coords.row < 0){
            //表头
            return;
        }
        let rindex = $(td).parent("tr").index();
        let $root = $(this.rootElement);
        $root.find(".ht_clone_left tbody>tr").eq(rindex)
            .addClass(HOVER_ROW_CLASS);
        $root.find(".ht_master tbody>tr").eq(rindex).addClass(HOVER_ROW_CLASS);
    });
}

coreRegister();
