const renderer = new marked.Renderer();
renderer.code = function(code) {
  try {
    return `<blockquote class="katex-block">${katex.renderToString(code)}</blockquote>`;
  } catch (e) {
    return `<div class="katex-error-block">${e.message}</div>`;
  }
};
renderer.codespan = function(code) {
  try {
    return katex.renderToString(code);
  } catch (e) {
    return `<span class="katex-error">${e.message}</div>`;
  }
};

const preview = document.getElementById('preview');

const editor = ace.edit('editor');
editor.getSession().setUseSoftTabs(true);

function updateOutput() {
  const result = marked(editor.getValue(), {
    renderer: renderer,
  });
  preview.innerHTML = result;
}

editor.getSession().on('change', updateOutput);
