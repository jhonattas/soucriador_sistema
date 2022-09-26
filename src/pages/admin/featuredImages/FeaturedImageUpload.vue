<template>
  <div class="productImageNewPage">
      <div class="uploadPage">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <h1>Nova Imagem de destaque</h1>

          <div class="field">
            <label class="label">LINK DE DESTINO</label>
            <div class="control">
              <input
                class="form-control input" type="text" placeholder="Modelo do equipamento"
                v-model="productUrl">
            </div>
          </div>

          <div class="field">
            <label class="label">DESCRIÇÃO</label>
            <div class="control">
              <input
                class="form-control input" type="text" placeholder="Modelo do equipamento"
                v-model="description">
            </div>
          </div>

          <div class="dropbox">
            <input type="file" multiple :name="newImage" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
              <p v-if="isInitial">
                Arraste a imagem para dentro <br> ou clique para encontra-la no computador
              </p>
              <p v-if="isSaving">
                Subindo {{ fileCount }} imagem...
              </p>
          </div>
        </form>
      </div>
  </div>
</template>

<style scoped>
  .uploadPage {
    margin: 15px auto;
    min-height: 400px;
    max-width: 600px;
  }

  .insertForm{
    background:#fff;
    padding: 2em 0;
    max-width: 400px;
    margin: 0 auto;
  }

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>

<script>
import { uploadFeatured } from '@/services/FileUploadService'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
var productUrl
var description

export default {
  name: 'app',
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      newImage: 'photo',
      productUrl,
      description
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING
      uploadFeatured(formData, this.productUrl, this.description)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          console.log(err.response)
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
      this.$router.push({ name: 'admin_featured_images' })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })
      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>
