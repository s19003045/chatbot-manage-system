<template>
  <div class="my-1">
    <!-- message -->

    <div v-if="actionObject.type === 'message'" class>
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>文字</span>
        </div>
        <input
          v-model="actionObject.text"
          type="text"
          class="form-control"
          placeholder="text"
          aria-label="text"
          aria-describedby
        />
      </div>
    </div>

    <!-- uri -->
    <div v-if="actionObject.type === 'uri'" class>
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <!-- 第一列 -->
      <div class="input-group input-group-sm my-2">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>

      <!-- 第二列 -->
      <div class="input-group input-group-sm my-2">
        <div class="input-group-prepend">
          <span class="input-group-text" id>連結網址</span>
        </div>
        <input
          v-model="actionObject.uri"
          type="text"
          class="form-control"
          placeholder="text"
          aria-label="text"
          aria-describedby
        />
      </div>
    </div>

    <!-- postback -->
    <div v-if="actionObject.type === 'postback'" class>
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>
      <!-- displayText 應與 label 相同，所以這邊與 label 同步 -->
      <div class="input-group input-group-sm">
        <div
          class="input-group-prepend"
          data-toggle="tooltip"
          data-placement="top"
          title="使用者點選後顯示於談話框的文字"
        >
          <span class="input-group-text" id>displayText</span>
        </div>
        <!-- ↓ ↓ 置換成 label 的值 ↓ ↓  -->
        <input
          v-model="actionObject.displayText"
          type="text"
          class="form-control"
          placeholder="displayText"
          aria-label="displayText"
          aria-describedby
          disabled
        />
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>data</span>
        </div>
        <input
          v-model="actionObject.data"
          type="text"
          class="form-control"
          placeholder="data"
          aria-label="data"
          aria-describedby
        />
      </div>
    </div>

    <!-- camera -->
    <div v-if="actionObject.type === 'camera'">
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>
    </div>

    <!-- cameraRoll -->
    <div v-if="actionObject.type === 'cameraRoll'">
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>
    </div>

    <!-- location -->
    <div v-if="actionObject.type === 'location'">
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>
    </div>

    <!-- datetimepicker -->
    <div v-if="actionObject.type === 'datetimepicker'" class>
      <small class="d-block mb-1">類別: {{actionObject.type}}</small>
      <div class="w-100"></div>
      <!-- 第一列 -->
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>data</span>
        </div>
        <input
          v-model="actionObject.data"
          type="text"
          class="form-control"
          placeholder="data"
          aria-label="data"
          aria-describedby
        />
      </div>
      <!-- 第二列 -->
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <label class="input-group-text" for="datetimepickerMode">Mode</label>
        </div>
        <select class="custom-select" id="datetimepickerMode" v-model="datetimepickerModeSelect">
          <option :selected="actionObject.mode === ''">Choose...</option>
          <option value="date" :selected="actionObject.mode === 'date'">date</option>
          <option value="time" :selected="actionObject.mode === 'time'">time</option>
          <option value="datetime" :selected="actionObject.mode === 'datetime'">datetime</option>
        </select>
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>initial</span>
        </div>
        <input
          v-model="actionObject.initial"
          type="text"
          class="form-control"
          placeholder="initial"
          aria-label="initial"
          aria-describedby
        />
      </div>
      <!-- 第三列 -->
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>min</span>
        </div>
        <input
          v-model="actionObject.min"
          type="text"
          class="form-control"
          placeholder="min"
          aria-label="min"
          aria-describedby
        />
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>max</span>
        </div>
        <input
          v-model="actionObject.max"
          type="text"
          class="form-control"
          placeholder="max"
          aria-label="max"
          aria-describedby
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actionObject: {
      type: Object,
    },
  },
  data() {
    return {
      datetimepickerModeSelect: "",
    };
  },
  create() {},
  beforeUpdate() {
    // 將 label 的值賦值給 displayText
    this.actionObject.displayText = this.actionObject.label;
  },
  methods: {},
};
</script>