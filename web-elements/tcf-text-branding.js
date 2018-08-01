const textLogoBranding = document.getElementsByClassName("tcf-text-logo");
const textLogoContent = `
        <span class="red">T</span>
        <span class="bright-pink">h</span>
        <span class="teal">e &nbsp;</span>
        <span class="light-blue">C</span>
        <span class="bright-pink">r</span>
        <span class="yellow">e</span>
        <span class="red">a</span>
        <span class="light-purple">t</span>
        <span class="light-purple-blue">i</span>
        <span class="light-green">v</span>
        <span class="dark-pink">e &nbsp;</span>
        <span class="yellow">F</span>
        <span class="green">o</span>
        <span class="teal">u</span>
        <span class="bright-pink">n</span>
        <span class="red">d</span>
        <span class="light-green">a</span>
        <span class="yellow">t</span>
        <span class="pink">i</span>
        <span class="teal">o</span>
        <span class="mint-green">n</span>
`;

for (let i = 0; i < textLogoBranding.length; i++) {
    textLogoBranding[i].insertAdjacentHTML('afterbegin',textLogoContent);
}