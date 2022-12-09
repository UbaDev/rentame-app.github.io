<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing>Ir a pagar</b-button>

        <b-modal id="modal-prevent-closing" ref="modal" title="Pagar anuncio" @show="resetModal" @hidden="resetModal"
            @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-img src="https://tusfinanzas.ec/wp-content/uploads/2017/07/credito-o-debito.png" fluid alt="Responsive image"></b-img>

                <b-form-group label="Numero de tarjeta" label-for="name-input"
                    invalid-feedback="Numero de tarjeta es requerido" :state="nameState">
                    <b-form-input  placeholder="0000 - 0000 - 0000 - 0000" id="name-input"
                        v-model="name" :state="nameState" required></b-form-input>


                </b-form-group>

                <b-form-group label="Fecha de vencimiento" label-for="name-inpfut"
                    invalid-feedback="La fecha de vencimiento es requerida" :state="nameStaste">
                    <b-form-input placeholder="00 / 00" id="name-input" v-model="naame"
                        :state="nameState" required>
                    </b-form-input>

                </b-form-group>

                <b-form-group label="Codigo de seguridad dinamico" label-for="name-iffnput"
                    invalid-feedback="El CVV es requerido" :state="nameStatsse">
                    <b-form-input  placeholder="CVV" id="name-input" v-model="naaame"
                        :state="nameState" required>
                    </b-form-input>


                </b-form-group>
                <b-img class="mr-3" src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                    fluid alt="Responsive image" width="80"></b-img>
                <b-img class="mr-3"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/1280px-Former_Visa_%28company%29_logo.svg.png"
                    fluid alt="Responsive image" width="80"></b-img>

                <b-img class="mr-3"
                    src="https://graffica.info/wp-content/uploads/2018/04/american-express-graphic-design-3.jpg" fluid
                    alt="Responsive image" width="80"></b-img>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'a',
            nameState: null,
            submittedNames: []
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            this.submittedNames.push(this.name)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }
}
</script>