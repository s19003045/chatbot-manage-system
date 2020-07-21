<template>
  <div class="my-1">
    <!-- message -->
    <small class="d-block mb-1">類別: {{actionObject.action.type}}</small>
    <div v-if="actionObject.action.type === 'message'" class="input-group input-group-sm">
      <div class="input-group-prepend">
        <span class="input-group-text" id>標籤</span>
      </div>
      <input
        v-model="actionObject.action.label"
        type="text"
        class="form-control"
        placeholder="label"
        aria-label="labe"
        aria-describedby
      />
      <div class="input-group-prepend">
        <span class="input-group-text" id>文字</span>
      </div>
      <input
        v-model="actionObject.action.text"
        type="text"
        class="form-control"
        placeholder="text"
        aria-label="text"
        aria-describedby
      />
    </div>

    <!-- postback -->
    <div v-if="actionObject.action.type === 'postback'" class>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.action.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
        <div class="input-group-prepend">
          <span class="input-group-text" id>displayText</span>
        </div>
        <input
          v-model="actionObject.action.displayText"
          type="text"
          class="form-control"
          placeholder="displayText"
          aria-label="displayText"
          aria-describedby
        />
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>data</span>
        </div>
        <input
          v-model="actionObject.action.data"
          type="text"
          class="form-control"
          placeholder="data"
          aria-label="data"
          aria-describedby
        />
      </div>
    </div>

    <!-- camera -->
    <div v-if="actionObject.action.type === 'camera'" class="input-group input-group-sm">
      <div class="input-group-prepend">
        <span class="input-group-text" id>標籤</span>
      </div>
      <input
        v-model="actionObject.action.label"
        type="text"
        class="form-control"
        placeholder="label"
        aria-label="labe"
        aria-describedby
      />
    </div>

    <!-- cameraRoll -->
    <div v-if="actionObject.action.type === 'cameraRoll'" class="input-group input-group-sm">
      <div class="input-group-prepend">
        <span class="input-group-text" id>標籤</span>
      </div>
      <input
        v-model="actionObject.action.label"
        type="text"
        class="form-control"
        placeholder="label"
        aria-label="labe"
        aria-describedby
      />
    </div>

    <!-- location -->
    <div v-if="actionObject.action.type === 'location'" class="input-group input-group-sm">
      <div class="input-group-prepend">
        <span class="input-group-text" id>標籤</span>
      </div>
      <input
        v-model="actionObject.action.label"
        type="text"
        class="form-control"
        placeholder="label"
        aria-label="labe"
        aria-describedby
      />
    </div>

    <!-- datetimepicker -->
    <div v-if="actionObject.action.type === 'datetimepicker'" class>
      <!-- 第一列 -->
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id>標籤</span>
        </div>
        <input
          v-model="actionObject.action.label"
          type="text"
          class="form-control"
          placeholder="label"
          aria-label="labe"
          aria-describedby
        />
        <div class="input-group-prepend">
          <span class="input-group-text" id>data</span>
        </div>
        <input
          v-model="actionObject.action.data"
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
          <option :selected="actionObject.action.mode === ''">Choose...</option>
          <option value="date" :selected="actionObject.action.mode === 'date'">date</option>
          <option value="time" :selected="actionObject.action.mode === 'time'">time</option>
          <option value="datetime" :selected="actionObject.action.mode === 'datetime'">datetime</option>
        </select>
        <div class="input-group-prepend">
          <span class="input-group-text" id>initial</span>
        </div>
        <input
          v-model="actionObject.action.initial"
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
          <span class="input-group-text" id>max</span>
        </div>
        <input
          v-model="actionObject.action.max"
          type="text"
          class="form-control"
          placeholder="max"
          aria-label="max"
          aria-describedby
        />
        <div class="input-group-prepend">
          <span class="input-group-text" id>min</span>
        </div>
        <input
          v-model="actionObject.action.min"
          type="text"
          class="form-control"
          placeholder="min"
          aria-label="min"
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
      type: Object
    }
  },
  data() {
    return {
      datetimepickerModeSelect: ""
    };
  },
  create() {},
  methods: {}
};
</script>