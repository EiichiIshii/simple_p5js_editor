const editor = document.getElementById('editor');
const lineNumbers = document.getElementById('line-numbers');
function updateLineNumbers() {
    const lines = editor.value.split('\n').length;
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}
editor.addEventListener('input', updateLineNumbers);
editor.addEventListener('scroll', () => {
    lineNumbers.scrollTop = editor.scrollTop;
});
window.addEventListener('resize', updateLineNumbers);

fetch('sample.txt')
    .then(res => res.ok ? res.text() : '')
    .then(text => {
        editor.value = text;
        updateLineNumbers();
        runSketch(editor.value); 
    })
    .catch(() => {
        editor.value = '';
        updateLineNumbers();
    });

window._p5Instance = null;

function runSketch(code) {
    if (window._p5Instance) {
        window._p5Instance.remove();
        window._p5Instance = null;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = code;
    document.body.appendChild(script);

    try {
        window._p5Instance = new p5();
    } catch (e) {
        alert("Error: " + e.message);
    }
    document.body.removeChild(script);
}

function stopSketch() {
    if (window._p5Instance) {
        window._p5Instance.remove();
        window._p5Instance = null;
    }

    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(c => c.parentNode && c.parentNode.removeChild(c));
}


document.getElementById('run-btn').onclick = () => {
    runSketch(editor.value);
    editor.blur();
};
document.getElementById('stop-btn').onclick = () => {
    stopSketch();
    editor.blur();
};

editor.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') {
        runSketch(editor.value);
        editor.blur();
    }
});

window.addEventListener('resize', () => {

});