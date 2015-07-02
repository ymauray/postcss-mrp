/**
 Module dependencies
 */
var postcss = require('postcss');

/**
 PostCSS plugin for MRP
 */
module.exports = postcss.plugin("mrp", function() {
    return function(css) {
        var node = css.prepend({
            selector: '*, *:before, *:after'
        });
        var map = {};
        css.eachDecl(function(decl) {
            if (decl.parent.type === 'rule' && decl.parent.selectors.reduce(function(previous, current) {
                    if (current == 'html') {
                        return true;
                    } else {
                        return previous;
                    }
                }, false)) {
                map[decl.prop] = {
                    between: decl.between,
                    value: decl.value
                };
            }
        });
        for (var prop in map) {
            css.first.append({
                prop: prop,
                between: ': ',
                value: 'inherit'
            });
        }
    };
});

