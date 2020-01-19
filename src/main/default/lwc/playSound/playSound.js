import { LightningElement, api, track } from 'lwc';

export default class PlaySound extends LightningElement {
    @api mp3path = 'registration';
    @track myMp3;
    @track mediaReadyState;
    @track mediaSrc;

    connectedCallback() {
        if (!this.mp3path) return;
        let cacheBuster = new Date().getTime();
        this.myMp3 = new Audio('/resource/' + cacheBuster + '/' + this.mp3path);
        this.myMp3.controls = true;
        this.myMp3.load();
        this.myMp3.play();
    }

    renderedCallback() {
        if (this.myMp3) this.mediaReadyState = this.myMp3.readyState;
    }

    disconnectedCallback() {
        if (this.myMp3) {
            this.myMp3.pause();
            this.myMp3 = null;
        }
    }
}
