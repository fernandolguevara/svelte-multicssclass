const classRegex = /class:(\S+)=(?:(['"])([\s\S]*?)\2|([^\s>]+))/g;

const expandCssClasses = (src: string, classes: string[]) =>
  classes.reduce((s, c) => {
    const attrValue = c.substring(c.indexOf('='));
    const _class: string = c.replace('class:', '');
    const _classes = _class
      .substring(0, _class.indexOf('='))
      .replace(/,/g, '|')
      .replace(/;/g, '|')
      .split('|')
      .map((x) => `class:${x}${attrValue}`);

    return s.replace(c, _classes.join(' '));
  }, src);

export const multicssclass = () => {
  return {
    name: 'vite:svelte-multicssclass',
    enforce: 'pre',
    transform(src: string, id: string) {
      if (id.endsWith('.svelte')) {
        const classes = src.match(classRegex);
        if (classes?.length) {
          return {
            code: expandCssClasses(src, classes),
          };
        }
      }
    },
  };
};

export default multicssclass;
