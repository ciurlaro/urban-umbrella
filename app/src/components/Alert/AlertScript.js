export default {
    name: 'Alert',
    props: {
        alertType: String,
        alertMessage: String,
        showAlert: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        closeAlert() {
            this.$emit('closeAlert');
        },
    },
};
