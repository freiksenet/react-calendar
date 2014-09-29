var _ = require('lodash');
var React = require('react');

function nonEmptyString (str) {
  return _.isString(str) && str.length > 0;
}

function getActiveClasses (classNames) {
  return Object.keys(classNames).filter(function (className) {
    return classNames[className];
  });
};

var ClassNamer = function (options) {
  var fn = function () {
    return fn.toString();
  };

  fn.options = _.defaults(options, {
    namespace: '',
    parents: [],
    className: '',
    modifiers: {},
    classes: {},
    namespaceSeparator: '-',
    descendantSeparator: '-',
    modifierSeparator: '--'
  });

  fn.prototype = Object.create(Function.prototype);
  _.mixin(fn, ClassNamer.prototype);

  return fn;
};

ClassNamer.prototype.getBaseClass = function () {
  if (!nonEmptyString(this.options.className)) {
    return '';
  };

  var classNames = [];
  if (nonEmptyString(this.options.namespace)) {
    classNames.push(this.options.namespace);
  }

  if (this.options.parents.length > 0) {
    classNames.push(this.options.parents[0]);
    classNames = [classNames.join(this.options.namespaceSeparator)];
    classNames = classNames.concat(this.options.parents.slice(1));
  }

  classNames.push(this.options.className);

  return classNames.join(this.options.descendantSeparator);
};

ClassNamer.prototype.getModifierClasses = function () {
  var baseClass = this.getBaseClass();
  var modifiers = getActiveClasses(this.options.modifiers);

  if (nonEmptyString(baseClass)) {
    return modifiers.map((modifier) => {
      return [baseClass, modifier].join(this.options.modifierSeparator);
    });
  } else {
    return modifiers;
  }
};

ClassNamer.prototype.getOtherClasses = function () {
  return getActiveClasses(this.options.classes);
};

ClassNamer.prototype.getAllClasses = function () {
  return Array.prototype.concat(
    [this.getBaseClass()],
    this.getModifierClasses(),
    this.getOtherClasses()
  );
};

ClassNamer.prototype.descendant = function (descendant, modifiers, classes) {
  if (!_.isArray(descendant)) {
    descendant = [descendant];
  }
  var options = _.assign({}, this.options, {
    parents: Array.prototype.concat(
      this.options.parents,
      nonEmptyString(this.options.className) ? [this.options.className] : [],
      descendant.slice(0, -1)
    ),
    className: descendant.slice(-1)[0],
    modifiers: modifiers,
    classes: classes
  });

  return new ClassNamer(options);
};

ClassNamer.prototype.descendants = function (...descendants) {
  return this.descendant(descendants, {}, {});
};

ClassNamer.prototype.toString = function () {
  return this.getAllClasses().join(' ');
};

var ClassNameMixin = {
  propTypes: {
    classNamespace: React.PropTypes.string,
    className: React.PropTypes.oneOfType(
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ),
    classNameOptions: React.PropTypes.object
  },

  contextTypes: {
    classNamespace: React.PropTypes.string,
    classNameOptions: React.PropTypes.object
  },

  getNamespace: function () {
    return this.props.classNamespace || this.context.classNamespace;
  },

  getClassNameOptions: function () {
    return this.props.classNameOptions || this.context.classNameOptions;
  },

  className: function (options) {
    return new ClassNamer(_.assign({
      classNamespace: this.getNamespace(),
      className: this.props.className || this.constructor.displayName
    }, this.getClassNameOptions(), options));
  }
};

module.exports = ClassNameMixin;
