const renderer = new marked.Renderer();
const katexOpts = {
  throwOnError: false,
  errorColor: '#F44336',
};
renderer.code = function(code) {
  const r = katex.renderToString(code, {
    displayMode: true,
    ...katexOpts,
  });
  return `<blockquote class="katex-block">${r}</blockquote>`;
};
renderer.codespan = function(code) {
  return katex.renderToString(code, katexOpts);
};

const wrapper = document.getElementById('page-wrapper');
const preview = document.getElementById('preview');

const editor = ace.edit('editor');
editor.getSession().setUseSoftTabs(true);
editor.getSession().setUseWrapMode(true);

function updateOutput() {
  const result = marked(editor.getValue(), {
    renderer: renderer,
    smartypants: true,
  });
  preview.innerHTML = result;
}

editor.getSession().on('change', updateOutput);
document.onkeydown = function(event) {
  if (event.keyCode === 77 && event.ctrlKey) {
    wrapper.classList.toggle('printable');
    event.preventDefault();
    return false;
  }
};
