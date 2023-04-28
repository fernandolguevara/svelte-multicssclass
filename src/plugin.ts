import type { HmrContext } from 'vite';

const classRegex = /class:(\S[^=]+)={1}/g;

const splitter = '|';

const expand = (classes: string, v: string) =>
  classes
    ?.split(splitter)
    .filter(Boolean)
    .map((x) => `class:${x}${v}`) || '';

const expandCssClasses = (src: string, classes: string[], sep?: string) => {
  const separators = sep ? [sep] : [';', ','];

  if (!classes?.length) {
    return src;
  }

  let _class,
    cursor,
    j,
    i = 0,
    result = src,
    work = src,
    l;

  do {
    _class = classes[i];
    l = work.length;
    cursor = work.indexOf(_class) + _class.length;

    for (j = cursor; j < l; j++) {
      const char = work[j];
      const next = work[j + 1];
      if (char === '}') {
        j++;
        break;
      } else if (char === '"' && next === '}') {
        j += 2;
        break;
      }
    }

    const attrValue = work.substring(cursor - 1, j);
    const _classesList: string = _class.replace('class:', '').replace('=', '');

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
        `${_class} invalid not operator. Ex: class:when-true${
          sep?.length ? sep : '(;; ,, ||)'
        }when-false={cond}`
      );
    }

    i++;
    work = work.substring(j);
    if (!trueClasses?.length && !falseClasses?.length) {
      continue;
    }

    let _classes, notAttrValue;

    _classes = expand(trueClasses, attrValue);

    if (falseClasses?.length) {
      notAttrValue = attrValue.replace('{', '{!(').replace('}', ')}');

      _classes = _classes.concat(expand(falseClasses, notAttrValue));
    }

    result = result.replace(
      _class + attrValue.substring(1),
      _classes.join(' ')
    );
  } while (classes.length > i);

  return result;
};

export const multicssclass = (options?: { sep?: string }) => {
  return {
    name: 'vite:svelte-multicssclass',
    enforce: 'pre',
    transform(src: string, id: string) {
      if (id.endsWith('.svelte')) {
        const classes = src.match(classRegex) || [];
        return {
          code: expandCssClasses(src, classes, options?.sep),
        };
      }
    },
    handleHotUpdate(ctx: HmrContext) {
      if (ctx.file.endsWith('.svelte')) {
        const read = ctx.read;
        ctx.read = async () => {
          const src = await read();
          const classes = src.match(classRegex) || [];
          return expandCssClasses(src, classes, options?.sep);
        };
      }
    },
  };
};

export default multicssclass;
