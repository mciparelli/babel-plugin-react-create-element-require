'use strict';

exports.__esModule = true;

exports.default = ({ types: t }) => {
  return {
    visitor: {
      Identifier: ({ node }, { file }) => {
        if (node.name === 't') file.set('hasT', true);
      },
      Program: {
        enter: (path, { file }) => {
          file.set('hasT', false);
        },
        exit: ({ node, scope }, { file }) => {
          if (!(file.get('hasT') && !scope.hasBinding('t'))) return;
          const declaration = t.importDeclaration(
            [t.importSpecifier(t.identifier('t'), t.identifier('createElement'))],
            t.stringLiteral('react')
          );

          node.body.unshift(declaration);
        }
      }
    }
  };
};
