import { multicssclass } from '../src/plugin';

test('plugin', () => {
  const html = `
<label
  class:text-gray-500|bg-gray-50|border-gray-300={isValid}>
  text
</label>
<label
  class:text-red-500|bg-red-50|border-red-300={isValid}>
  text
</label>
`;

  const plugin = multicssclass();

  if (plugin?.transform) {
    const out = plugin.transform(html, 'test.svelte');
    const code = out?.code!;
    const outHtml = `
<label
  class:text-gray-500={isValid} class:bg-gray-50={isValid} class:border-gray-300={isValid}>
  text
</label>
<label
  class:text-red-500={isValid} class:bg-red-50={isValid} class:border-red-300={isValid}>
  text
</label>
`;

    expect(code?.length).toBeGreaterThan(0);
    expect(code).toBe(outHtml);
  }
});
