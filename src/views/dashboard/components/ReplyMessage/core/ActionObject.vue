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
          disabled
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
          <span class="input-group-text" id>點選後顯示的文字</span>
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
      <!-- 讓使用者選取要觸發的模組 -->
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>選擇要觸發的摸組</span>
        </div>
        <select
          name="postback-trigger-module"
          id="postback-trigger-module"
          class="custom-select"
          v-model="moduleSelect"
        >
          <option
            v-for="(module, index) in replyModuleList"
            :key="index"
            :value="module.id"
          >{{module.name}}-{{module.uuid}}</option>
        </select>
      </div>

      <!-- <div class="input-group input-group-sm">
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
      </div>-->
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

    <!-- datetimepicker => 待處理時間選取的問題-->
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
      <!-- 套件 VCalendar -->
      <vc-date-picker mode="range" :value="null" color="blue" is-inline />
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
import querystring from "querystring";

export default {
  props: {
    actionObject: {
      type: Object,
    },
    replyModuleList: {
      type: Array,
    },
  },
  data() {
    return {
      datetimepickerModeSelect: "",
      moduleSelect: -1,
    };
  },
  computed: {
    //postback object data 屬性的值
    postBackActionData() {
      return `action=triggerReply&triggerModuleId=${this.moduleSelect}`;
    },
    //轉換 postback action 的 data 成 moduleSelect 的 值
    postbackDataObject() {
      if (this.actionObject.type === "postback") {
        return querystring.parse(this.actionObject.data);
      } else {
        return {};
      }
    },
  },
  create() {},
  beforeUpdate() {
    // 將 label 的值賦值給 displayText
    this.actionObject.displayText = this.actionObject.label;

    // 將 label 的值賦值給 text
    this.actionObject.text = this.actionObject.label;

    // 若為 postback action，則當moduleSelect值有變動時，則修改 actionObject.data =>組合字串action=triggerReply&triggerModuleId=?
    if (this.actionObject.type === "postback") {
      this.actionObject.data = this.postBackActionData;
    }
  },
  mounted() {
    if (this.actionObject.type === "postback") {
      this.moduleSelect = parseInt(this.postbackDataObject.triggerModuleId);
    }
  },
  methods: {},
};
</script>