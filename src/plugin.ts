const classRegex = /class:(\S+)=(?:(['"])([\s\S]*?)\2|([^\s>]+))/g;

const splitter = '|';

const expand = (classes: string, v: string) =>
  classes
    ?.split(splitter)
    .filter(Boolean)
    .map((x) => `class:${x}${v}`) || '';

const expandCssClasses = (src: string, classes: string[], sep?: string) => {
  const separators = sep ? [sep] : [';', ','];

  return classes.reduce((s, c) => {
    const attrValue = c.substring(c.indexOf('='));
    const _class: string = c.replace('class:', '');

    let _classesList = _class.substring(0, _class.indexOf('='));

    const replaced = separators.reduce(
      (ctx, sep) => ctx.replaceAll(sep, splitter),
      _classesList
    );

    // 2 splitter chars make not operation
    const [trueClasses, falseClasses, ...badSyntax] = replaced.split(
      splitter.repeat(2)
    );

    if (badSyntax?.length) {
      throw SyntaxError(
        `${c} invalid not operator. Ex: class:when-true${
          sep?.length ? sep : '(;; ,, ||)'
        }when-false={cond}`
      );
    }

    if (!trueClasses?.length && !falseClasses?.length) {
      return s;
    }

    let _classes, notAttrValue;

    _classes = expand(trueClasses, attrValue);

    if (falseClasses?.length) {
      notAttrValue = attrValue.replace('{', '{!(').replace('}', ')}');

      _classes = _classes.concat(expand(falseClasses, notAttrValue));
    }

    return s.replace(c, _classes.join(' '));
  }, src);
};

export const multicssclass = (options?: { sep?: string }) => {
  return {
    name: 'vite:svelte-multicssclass',
    enforce: 'pre',
    transform(src: string, id: string) {
      if (id.endsWith('.svelte')) {
        const classes = src.match(classRegex);
        if (classes?.length) {
          const code = expandCssClasses(src, classes, options?.sep);

          return {
            code,
          };
        }
      }
    },
  };
};

export default multicssclass;
