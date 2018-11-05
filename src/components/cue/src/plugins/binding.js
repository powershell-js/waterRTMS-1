var BINDKEY = "CUE-UNISCADA-BINDING";
export function BindRecords(key, _bindings) {
    _bindings = _bindings || {};
    if (key in _bindings) return _bindings[key];
    var Bindings = HD.LocalStorage.Get(BINDKEY, {});
    if (key in Bindings) return Bindings[key];
    return [];
}

export function Bind(V, KEY, field, bindings) {
    var records = BindRecords(KEY, bindings);
    for (let i = 0; i < records.length; i++) {
        let item = records[i];
        if (item.Value == V) {
            return field ? (item[field] || item.Name) : item.Name;
        }
    }
    return "";
}