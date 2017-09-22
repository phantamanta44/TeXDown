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
  
const q = {};
if (!!document.location.search) {
    const parts = document.location.search.substring(1).split("&");
    for (let i = 0; i < parts.length; i++) {
        const eq = parts[i].indexOf("=");
        q[parts[i].substring(0, eq).toLowerCase()] = parts[i].substring(eq + 1);
    }
}

const wrapper = document.getElementById('page-wrapper');
const preview = document.getElementById('preview');
let fileName = q.fileName || 'Untitled.md';

const editor = ace.edit('editor');
editor.getSession().setUseSoftTabs(true);
editor.getSession().setTabSize(2);
editor.getSession().setUseWrapMode(true);
editor.getSession().setMode("ace/mode/markdown");
if (!!q.content) {
  editor.getSession().setValue(decodeURIComponent(q.content));
}

function updateOutput() {
  const result = marked(editor.getValue(), {
    renderer: renderer,
    smartypants: true,
  });
  preview.innerHTML = result;
}

editor.getSession().on('change', updateOutput);
document.onkeydown = function(event) {
  if (event.ctrlKey) {
    switch (event.keyCode) {
      case 77: // ctrl + m
        wrapper.classList.toggle('printable');
        document.body.classList.toggle('printable');
        window.scrollTo(0, 0);
        event.preventDefault();
        return false;
      case 79: // ctrl + o
        alert('Not implemented yet!');
        // TODO prompt user to open a file
        event.preventDefault();
        return false;
      case 83: // ctrl + s
        const anchorElem = document.createElement('a');
        const enc = encodeURIComponent(editor.getValue());
        anchorElem.setAttribute('href', `data:text/markdown;charset=utf-8,${enc}`);
        anchorElem.setAttribute('download', fileName);
        anchorElem.style.display = 'none';
        document.body.appendChild(anchorElem);
        anchorElem.click();
        document.body.removeChild(anchorElem);
        event.preventDefault();
        return false;
    }
  }
};
