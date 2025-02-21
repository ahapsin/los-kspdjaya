<template>
  <n-card title="Laporan Keuangan Berbasis Harian (LKBH)" :segmented="{
    content: true,
    footer: 'soft',
  }">
    <div>
      <n-space vertical :size="12" class="pt-4">
        <n-space>
          <n-date-picker v-model:value="rangeDate" :default-value="Date.now()" clearable
                         start-placeholder="dari" end-placeholder="sampai"/>
          <n-select
              v-show="me.me.cabang_nama == 'Head Office'"
              :loading="loadingBranch"
              @click="getBranch"
              filterable
              placeholder="Pilih Cabang"
              label-field="nama"
              value-field="id"
              :default-value="defBranch"
              :options="dataBranch"
              v-model:value="selectBranch"
          />
          <n-button @click="handleSubmit" type="primary">
            Cari
          </n-button>
          <!--        <json-excel :data="props.data.datas" :name="`LAP_LKBH_${formatDate(props.data.tgl_tarik)}`" :fields="convertObjectToArray(props.data.datas)" :stringifyLongNum="true">-->
          <!--          <n-button type="primary" secondary>Download</n-button>-->
          <!--        </json-excel>-->
          <!--        <n-button @click="downloadCsv" type="info">-->
          <!--          download-->
          <!--        </n-button>-->
        </n-space>
        <div class=" border p-4 border-black" v-if="tarik">
          <div
              class="flex items-center gap-2 justify-between">
            <div class="flex gap-2 items-center py-4">
              <img class="h-10 md:h-10" :src="applogo" alt="logo_company"/>
              <div class="flex flex-col">
                <n-text class="text-xl font-bold">{{ apptitle }}</n-text>
                <n-text class="text-md font-bold">POS : {{ me.me.cabang_nama }}</n-text>
              </div>
            </div>
            <div class="text-md font-bold justify-center pt-4 flex flex-col text-right">
              <n-text>LAPORAN KEUANGAN BERBASI HARIAN (LKBH)</n-text>
              <n-text class="text-sm">tanggal : {{ formatDate(dataArusKas.tgl_tarik) }}</n-text>

            </div>
          </div>
          <table class="w-full font-mono">
            <thead>
            <tr class="border-b border-t border-black border-dashed">
              <th class="py-2" colspan="2">NO</th>
              <th align="left">CABANG</th>
              <th align="left">TGL</th>
              <th align="left">USER</th>
              <th align="left">POSITION</th>
              <th align="left">NO KONTRAK</th>
              <th align="left">TERIMA DARI / KE</th>
              <th align="left">KETERANGAN</th>
              <th align="right">AMOUNT</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="6">CASH-IN</td>
            </tr>
            <tr v-for="cashin in cashIn" :key="cashin.id">
              <td width="20px"></td>
              <td>{{ cashin.no }}</td>
              <td>{{ cashin.cabang }}</td>
              <td>{{ cashin.tgl }}</td>
              <td>{{ cashin.user }}</td>
              <td>{{ cashin.position }}</td>
              <td>{{ cashin.no_kontrak }}</td>
              <td>{{ cashin.nama_pelanggan }}</td>
              <td>{{ cashin.keterangan }}</td>
              <td align="right">{{ cashin.amount.toLocaleString() }}</td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td colspan="6">CASH-OUT</td>
            </tr>
            <tr v-for="cashout in cashOut" :key="cashout.id">
              <td></td>
              <td>{{ cashout.no }}</td>
              <td>{{ cashout.cabang }}</td>
              <td>{{ cashout.tgl }}</td>
              <td>{{ cashout.user }}</td>
              <td>{{ cashout.position }}</td>
              <td>{{ cashout.no_kontrak }}</td>
              <td>{{ cashout.nama_pelanggan }}</td>
              <td>{{ cashout.keterangan }}</td>
              <td align="right">{{ cashout.amount.toLocaleString() }}</td>
            </tr>
            </tbody>
            <tbody>
            <tr class="border-b border-t border-black border-dashed">
              <td colspan="9">JUMLAH</td>
              <th align="right">{{ dataArusKas.ttl_all.toLocaleString() }}</th>
            </tr>
            </tbody>
          </table>

        </div>


        <!--      <n-data-table-->
        <!--          ref="tableRef"-->
        <!--          :get-csv-cell="getCsvCell"-->
        <!--          size="small"-->
        <!--          :columns="props.columns"-->
        <!--          :data="props.data"-->
        <!--          :loading="props.load"-->
        <!--          :pagination="paginationRef"-->
        <!--      />-->
      </n-space>
    </div>
  </n-card>
</template>

<script setup>
import {computed, ref} from "vue";
import {useApi} from "../../../helpers/axios.js";
import {useMeStore} from "../../../stores/me.js";
import {
  useMessage, useLoadingBar
} from "naive-ui";
import _ from "lodash";


const apptitle = import.meta.env.VITE_APP_TITLE;
const applogo = import.meta.env.VITE_APP_LOGO;
const me = useMeStore();
const dataArusKas = ref([]);
const loadingBar = useLoadingBar();
const tarik = ref(false);
const message = useMessage();
const loadData = ref(false);

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so we add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const cashOut = ref([]);
const cashIn = ref([]);
const getArusKas = async (e) => {
  message.loading('memuat data LKBH');
  loadData.value = true;
  tarik.value = false;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "arus_kas",
    data: e,
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    loadData.value = false;
    dataArusKas.value = response.data;
    tarik.value = true;
    cashOut.value = _.filter(response.data.datas, ['type', "CASH_OUT"]);
    cashIn.value = _.filter(response.data.datas, ['type', "CASH_IN"]);
  }
}
const rangeDate = ref();
const dataBranch = ref([]);
const selectBranch = ref();
const defBranch = ref();
const userToken = localStorage.getItem("token");
const loadingBranch = ref(false);
const getBranch = async () => {
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
    me.me.cabang_nama != "Head Office" ? selectBranch.value = me.me.cabang_id : selectBranch.value = "SEMUA CABANG";
    dataBranch.value = response.data.response;
    dataBranch.value.unshift({
      id: "SEMUA CABANG",
      nama: "SEMUA CABANG"
    });
  }
}
onMounted(() => {
  loadingBar.finish();
  getBranch();
});
const handleSubmit = () => {
  let a = {
    dari: rangeDate.value ? rangeDate.value : Date.now(),
    cabang_id: selectBranch.value ? selectBranch.value : null
  }
  getArusKas(a);
}

</script>