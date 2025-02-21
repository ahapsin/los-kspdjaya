<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
        <n-date-picker v-model:formatted-value="rangeDate" :default-value="Date.now()" clearable format="yyyy-MM-dd"
                       start-placeholder="dari" end-placeholder="sampai"/>
        <n-select
            v-if="me.me.cabang_nama == 'Head Office'"
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
              <n-text class="text-xl font-bold">{{apptitle}}</n-text>
              <n-text class="text-md font-bold">POS : {{ me.me.cabang_nama }}</n-text>
            </div>
          </div>
          <div class="text-md font-bold justify-center pt-4 flex flex-col text-right">
            <n-text>LAPORAN KEUANGAN BERBASI HARIAN (LKBH)</n-text>
            <n-text class="text-sm">tanggal : {{ formatDate(props.data.tgl_tarik) }}</n-text>

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
            <td colspan="6">CASH-IN </td>
          </tr>
          <tr v-for="cashin in compCashIn" :key="cashin.id">
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
          <tr v-for="cashout in compCashOut" :key="cashout.id">
            <td></td>
            <td>{{ cashout.no }}</td>
            <td>{{ cashout.cabang }}</td>
            <td>{{ cashin.tgl }}</td>
            <td>{{ cashin.user }}</td>
            <td>{{ cashin.position }}</td>
            <td>{{ cashout.no_kontrak }}</td>
            <td>{{ cashout.nama_pelanggan }}</td>
            <td>{{ cashout.keterangan }}</td>
            <td align="right">{{ cashout.amount.toLocaleString() }}</td>
          </tr>
          </tbody>
          <tbody>
          <tr class="border-b border-t border-black border-dashed">
            <td colspan="5" class="p-4"></td>
            <td>JUMLAH</td>
            <th align="right">{{ (props.data.ttl_all).toLocaleString('US') }}</th>
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
</template>

<script setup>
import {ref, defineEmits, reactive,computed} from "vue";
import _ from "lodash";
import {useApi} from "../../../helpers/axios.js";
import {useMessage} from "naive-ui";
import {useMeStore} from "../../../stores/me.js";
const apptitle = import.meta.env.VITE_APP_TITLE;
const applogo = import.meta.env.VITE_APP_LOGO;
const rangeDate = ref();
const emit = defineEmits();
const message = useMessage();
const paginationRef = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 30, 50, 100],
  onChange: (page) => {
    paginationRef.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationRef.pageSize = pageSize;
    paginationRef.page = 1;
  }
});
const tarik = ref(false);
const handleSubmit = () => {
  let a = {
    dari: rangeDate.value ? rangeDate.value : Date.now() ,
    cabang_id: selectBranch.value ? selectBranch.value : null
  }
  emit("filterForm", a);
  tarik.value = true;
}

const dataBranch = ref([]);
const selectBranch = ref();
const defBranch = ref();
const userToken = localStorage.getItem("token");
const loadingBranch = ref(false);
const me = useMeStore();
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

    if (me.me.cabang_nama != "Head Office") {
      defBranch.value = me.me.cabang_nama;
      selectBranch.value = me.me.cabang_id;
    } else {
      selectBranch.value = "SEMUA CABANG";
      dataBranch.value = response.data.response;
      dataBranch.value.unshift({
        id: "SEMUA CABANG",
        nama: "SEMUA CABANG"
      });
    }
  }
}

const props = defineProps({
  data: Array,
  columns: Array,
  load: Boolean,
  pageSize: Number,
});

const today = new Date();

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so we add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
const compCashOut = computed(()=>{
  return _.filter(props.data.datas,['type',"CASH_OUT"]);
});
const compCashIn = computed(()=>{
  return _.filter(props.data.datas,['type',"CASH_IN"]);
});

onMounted(() => {
  getBranch();
})

</script>
