// ====== Intro typewriter ======
const introLines = [
    "> hi, i'm Niamh! — a self-taught backend developer and first-year software engineering student ",
    "> i enjoy designing efficient Python APIs, automating workflows, and exploring DevOps practices",
    "> currently expanding my skills through projects and open to remote opportunities"
];

function typeInto(el, lines, speed=28){
    let i=0, line=0; el.textContent="";
    function tick(){
        if(line >= lines.length){
            if(!el.querySelector('.caret')){
                const c=document.createElement('span');
                c.className='caret';
                el.appendChild(c);
            }
            return;
        }
        if(i < lines[line].length){
            el.textContent += lines[line][i++];
        }else{
            el.textContent += "\n"; line++; i=0;
        }
        requestAnimationFrame(()=>setTimeout(tick, speed));
    }
    tick();
}
export function initIntro() {
    const el = document.getElementById("terminalText");
    if (!el) return;
    typeInto(el, introLines, 18);
}