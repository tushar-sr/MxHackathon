'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoBind;
function autoBind(context) {
  for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < fns.length; i++) {
    if (typeof context[fns[i]] === 'function') {
      context[fns[i]] = context[fns[i]].bind(context);
    }
  }
}