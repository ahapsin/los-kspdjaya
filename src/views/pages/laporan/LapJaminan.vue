<template>
  <div>
    <n-space vertical>
      <n-card :title="`Laporan data Jaminan`" :segmented="true" size="small">
                <template #header-extra>
        <!--          <n-space class="!gap-1">-->
        <!--            <div class="me-1 flex gap-2">-->
        <!--              <n-date-picker-->
        <!--                v-model:value="timestamp"-->
        <!--                type="month"-->
        <!--                 :default-value="Date.now()"-->
        <!--                format="y MMM"-->
        <!--                month-format="MMM"-->
        <!--                clearable-->
        <!--              />-->
        <!--              <n-popover trigger="click" placement="bottom-end">-->
        <!--                <template #trigger>-->
        <!--                  <n-button circle>-->
        <!--                    <n-icon>-->
        <!--                      <search-icon />-->
        <!--                    </n-icon>-->
        <!--                  </n-button>-->
        <!--                </template>-->
        <!--                <n-input-->
        <!--                  autofocus="true"-->
        <!--                  clearable-->
        <!--                  placeholder="cari disini.."-->
        <!--                  v-model:value="searchBox"-->
        <!--                />-->
        <!--              </n-popover>-->
        <!--            </div>-->
        <!--            <div>-->
        <!--              <n-button type="primary" secondary>-->
        <!--                <template #icon>-->
        <!--                  <n-icon>-->
        <!--                    <download-icon />-->
        <!--                  </n-icon>-->
        <!--                </template>-->
        <!--                Download-->
        <!--              </n-button>-->
        <!--            </div>-->
        <!--            <div class="md:hidden">-->
        <!--              <n-button type="primary" @click="handleAdd">-->
        <!--                <template #icon>-->
        <!--                  <n-icon>-->
        <!--                    <add-icon />-->
        <!--                  </n-icon>-->
        <!--                </template>-->
        <!--              </n-button>-->
        <!--            </div>-->
        <!--          </n-space>-->
                  <json-excel v-if="showData.length > 0" :data="showData" :name="`laporan_jaminan_${dynamicSearch.pos}`" :fields="json_fields"
                              :stringifyLongNum="true">
                    <n-button type="primary">Download Xls</n-button>
                  </json-excel>
                </template>
        <n-space vertical :size="12" class="pt-4">
          <div class="flex flex-col md:flex-row gap-2 pt-4 pr-4 ps-4">
            <n-form-item label="POS" class="w-full">
              <n-select
                  :loading="loadingBranch"
                  filterable
                  placeholder="Pilih Cabang"
                  label-field="nama"
                  value-field="nama"
                  :default-value="defBranch"
                  :options="dataBranch"
                  v-model:value="dynamicSearch.pos"
              />
            </n-form-item>
            <n-form-item label="NO KONTRAK" class="w-full">
              <n-input v-model:value="dynamicSearch.loan_number" type="text" placeholder="NO KONTRAK" clearable/>
            </n-form-item>
            <n-form-item label="NAMA DEBITUR" class="w-full">
              <n-input v-model:value="dynamicSearch.nama" type="text" placeholder="NAMA DEBITUR" clearable/>
            </n-form-item>
            <n-form-item label="NO POL" class="w-full">
              <n-input v-model:value="dynamicSearch.nopol" type="text" placeholder="NO POLISI" clearable/>
            </n-form-item>
            <n-form-item label="STATUS JAMINAN" class="w-full">
              <n-select
                  filterable
                  placeholder="Status Jaminan"
                  counter
                  :options="optStatusJaminan"
                  v-model:value="dynamicSearch.status"
              />
            </n-form-item>

            <n-form-item class="flex gap-2" as="div">
              <n-button type="primary" @click="handleSearch" class="px-4"> Cari</n-button>

            </n-form-item>
          </div>
          <n-data-table
              :loading="loadTable"
              size="small"
              :columns="convertObjectToArray(showData)"
              :data="showData"
              :pagination="pagination"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
<script setup>
import {ref, onMounted, computed, reactive} from "vue";
import {useApi} from "../../../helpers/axios";
import {useSearch} from "../../../helpers/searchObject";
import {useMeStore} from "../../../stores/me";
import {
  useMessage,
  NButton, NInput,
} from "naive-ui";
import JsonExcel from "vue-json-excel3";

const message = useMessage();
const dataTable = ref([]);
const searchBox = ref();
const dynamicSearch = reactive({
  pos: '',
  loan_number: '',
  nama: '',
  nopol: '',
  status: '',
});

const optStatusJaminan = ["NORMAL", "TITIP", "SITA", "JUAL", "RILIS"].map((v) => ({
  label: v,
  value: v,
}));


const me = useMeStore();
const loadingBranch = ref(false);
const dataBranch = ref();
const defBranch = ref();
const getBranch = async () => {
  let userToken = localStorage.getItem("token");
  loadingBranch.value = true;
  const response = await useApi({
    method: "GET",
    api: "cabang",
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    loadingBranch.value = false;

    if (me.me.cabang_nama != "Head Office") {
      defBranch.value = me.me.cabang_nama;
      dynamicSearch.pos = me.me.cabang_nama;
    } else {
      dynamicSearch.pos = "SEMUA POS";
      dataBranch.value = response.data.response;
      dataBranch.value.unshift({
        id: "",
        nama: "SEMUA POS"
      });
    }
  }
}
const handleSearch = () => {
  getData();
}
const loadTable = ref(false);
const getData = async () => {
  loadTable.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: `collateral_report?pos=${dynamicSearch.pos}&loan_number=${dynamicSearch.loan_number}&nama=${dynamicSearch.nama}&nopol=${dynamicSearch.nopol}&status=${dynamicSearch.nopol}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    dataTable.value = response.data;
    loadTable.value = false;
  }
};
const convertObjectToArray = (obj) => {
  if (!Array.isArray(obj) || obj.length === 0) {
    return [];
  }
  const keys = Object.keys(obj[0]);
  return keys.map(key => ({title: key, key: key}));
}
const pagination = {
  pageSize: 10,
};
onMounted(() => {
  getBranch();
});
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
</script>
