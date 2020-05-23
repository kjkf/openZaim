
function download(filename) {
    var element = document.createElement('a');
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

    element.setAttribute('href', `assets/${filename}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
const settings = document.getElementById('settings');
if (settings) {
    const downloadBtns = document.querySelectorAll('.link-download');
    downloadBtns.forEach( btn => {
        btn.addEventListener('click', e => {
            const filename = 'report.pdf';

            download(filename);
        });
    });
}
