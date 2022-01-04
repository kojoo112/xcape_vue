<template>
  <div class="hello">
    <b-card bg-variant="dark" header="XCAPE Hint Setting" text-variant="white" class="text-center">
      <b-container>
        <b-row>
          <b-col>
            <b-input-group size="md" prepend="가맹점">
              <b-form-select id="merchant" @change="getThemeList()" v-model="defaultMerchantCode">
                <option v-for="(data, index) in merchantList" :key="index" :value="data.merchant_code">
                  {{ data.merchant_name }}
                </option>
              </b-form-select>
            </b-input-group>
            <!-- <span>{{ selected }}</span> -->
          </b-col>
          <b-col>
            <b-input-group size="md" prepend="테마">
              <b-form-select id="theme" @change="getHintList()" v-model="defaultThemeCode">
                <option v-for="(data, index) in themeList" :key="index" :value="data.theme_code">
                  {{ data.theme_name }}
                </option>
              </b-form-select>
            </b-input-group>
          </b-col>
          <b-col>
            <b-input-group size="md" prepend="번호">
              <b-form-input></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-input-group size="md" prepend="힌트1">
              <b-form-input></b-form-input>
            </b-input-group>
          </b-col>
          <b-col>
            <b-input-group size="md" prepend="힌트2">
              <b-form-input></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
      <div><button>저장</button></div>
    </b-card>
    <!-- <select id="merchant" @change="getThemeList()">
      <option v-for="(data, index) in merchantList" :key="index" :value="data.merchant_code">
        
      </option>
    </select>
    <br />
    <select id="theme" @change="getHintList()">
      <option v-for="(data, index) in themeList" :key="index" :value="data.theme_code">
        
      </option>
    </select> -->

    <div>{{ res }}</div>
    <div>{{ defaultMerchantCode }}</div>
    <div>{{ defaultThemeCode }}</div>
    <div>{{ hintList }}</div>
  </div>
</template>

<script>
export default {
  created: function () {
    this.getMerchantList();

    // this.$http
    //   .get("/api/merchant/list")
    //   .then((res) => {
    //     this.merchantList = res.data;
    //   })
    //   .then(() => {
    //     this.getThemeList();
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  },
  name: "HelloWorld",
  data() {
    return {
      defaultMerchantCode: "",
      defaultThemeCode: "THM001",
      merchantList: [],
      themeList: [],
      hintList: "",
      res: "",
    };
  },
  methods: {
    getMerchantList: async function () {
      await this.$http
        .get("/api/merchant/list")
        .then((res) => {
          this.merchantList = res.data;
          this.defaultMerchantCode = res.data[0].merchant_code;
        })
        .then(() => {
          this.getThemeList();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getThemeList: function () {
      this.$http
        .get("/api/theme/list", {
          params: {
            merchantCode: $("#merchant").val(),
          },
        })
        .then((res) => {
          this.themeList = res.data;
          this.defaultThemeCode = res.data[0].theme_code;
        })
        .then(() => {
          this.getHintList();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getHintList: function () {
      this.$http
        .get("/api/hint/list", {
          params: {
            merchantCode: $("#merchant").val(),
            themeCode: $("#theme").val(),
          },
        })
        .then((res) => {
          // console.log("getHintList");
          this.hintList = res.data;
        });
    },
  },
};
</script>
<style scoped>
.card {
  background-color: red;
}
.card-header {
  background-color: #252525;
  font-size: 40px;
  font-weight: bold;
}

.card-body {
  background-color: #252525;
  display: flex;
}

.input-group-text {
  width: 150px;
  background-color: #343a40;
  color: white;
  font-weight: bold;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
