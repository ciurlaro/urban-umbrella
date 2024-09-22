import * as Tone from 'tone';

export default {
  name: 'Modal',
  props: {
    showModal: Boolean,
    selectedAnswerText: String,
    isCorrect: Boolean, // Determines success (true), error (false), or default (null)
  },
  computed: {
    headerClass() {
      if (this.isCorrect === true) {
        return 'bg-success text-white custom-success';
      } else if (this.isCorrect === false) {
        return 'bg-danger text-white custom-danger';
      }
      return '';
    },
    footerClass() {
      if (this.isCorrect === true) {
        return 'bg-success text-white custom-success';
      } else if (this.isCorrect === false) {
        return 'bg-danger text-white custom-danger';
      }
      return '';
    },
  },
  methods: {
    submit() {
      if (this.isCorrect === true) {
        this.playSuccessSound();
      } else if (this.isCorrect === false) {
        this.playErrorSound();
      }
      this.$emit('submit');
    },
    cancel() {
      this.$emit('cancel');
    },
    playSuccessSound() {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.triggerAttackRelease("E4", "8n"); // Success sound notes
      synth.triggerAttackRelease("B4", "8n");

      if (Tone.context.state !== 'running') {
        Tone.start();
      }
    },
    playErrorSound() {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.triggerAttackRelease("E3", "8n"); // Error sound notes
      synth.triggerAttackRelease("B3", "8n");

      if (Tone.context.state !== 'running') {
        Tone.start();
      }
    }
  },
};
