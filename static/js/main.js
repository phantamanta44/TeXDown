const renderer = new marked.Renderer();
const katexOpts = {
  throwOnError: false,
  errorColor: '#F44336',
};
renderer.code = function(code) {
  try {
    const r = katex.renderToString(code, {
      displayMode: true,
      ...katexOpts,
    });
    return `<blockquote class="katex-block">${r}</blockquote>`;
  } catch (e) {
    return `<blockquote class="katex-block">${e.message}</blockquote>`;
  }
};
renderer.codespan = function(code) {
  try {
    return katex.renderToString(code, katexOpts);
  } catch (e) {
    return e.message;
  }
};

const wrapper = document.getElementById('page-wrapper');
const preview = document.getElementById('preview');

const editor = ace.edit('editor');
editor.getSession().setUseSoftTabs(true);
editor.getSession().setTabSize(2);
editor.getSession().setUseWrapMode(true);
editor.getSession().setMode("ace/mode/markdown");

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
    document.body.classList.toggle('printable');
    window.scrollTo(0, 0);
    event.preventDefault();
    return false;
  }
};
