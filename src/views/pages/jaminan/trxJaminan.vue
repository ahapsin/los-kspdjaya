<template>
  <n-card :segmented="{
        content: true,
        footer: 'soft'
    }" :title="`Form ${props.type} jaminan`" id="drawer-target" class="overflow-hidden">
    <template #header-extra>
        <n-button secondary type="info">
          {{dynamicForm.bpkb?.length}} jaminan dipilih
        </n-button>
    </template>
    <n-form ref="formRef" :model="dynamicForm" :rules="rules" :label-placement="width <= 920 ? 'top' : 'left'"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
      <n-space vertical :size="12" class="mb-4">
        <n-input clearable placeholder="cari disini.." v-model:value="searchBox"/>
        <n-data-table striped size="small" :row-key="(row) => row" :columns="columns" :data="showData"
                      :max-height="300" :on-update:checked-row-keys="handleChecked" :loading="loadData"/>
      </n-space>
      <n-space>
        <n-form-item label="Tujuan" path="cabang" v-if="props.type === 'pengiriman'">
          <n-select filterable placeholder="Pilih Cabang" :options="branchData"
                    v-model:value="dynamicForm.tujuan" value-field="id" label-field="nama"/>
        </n-form-item>
        <n-form-item label="Kurir" path="cabang" v-if="props.type === 'pengiriman'">
          <n-input filterable placeholder="Kurir" v-model:value="dynamicForm.kurir"/>
        </n-form-item>
      </n-space>
      <n-form-item label="Catatan" path="cabang">
        <n-input type="textarea" v-model:value="dynamicForm.catatan"/>
      </n-form-item>
    </n-form>
    <template #action>
      <n-space>
        <n-button :loading="loading" type="primary" @click="handleSave" v-if="props.type === 'pengiriman'">
          <span v-if="!param">Simpan Pengiriman</span>
        </n-button>
        <n-button :loading="loading" type="primary" @click="handleSavePerminataan" v-else>
          <span v-if="!param">Simpan Permintaan</span>
        </n-button>
        <n-button type="error" @click="handleCancel">
          Batal
        </n-button>
        <!-- <n-button type="info" @click="handlePrint" v-show="printAfter">
            Cetak
        </n-button> -->
      </n-space>
    </template>
  </n-card>
  <n-drawer v-model:show="modalTrx" :height="400" placement="bottom" to="#drawer-target">
    <n-drawer-content title="Detail Jaminan">
      <n-table :bordered="false" :single-line="false" size="small">
        <thead>
        <tr>
          <th>Jenis</th>
          <th>Nama Debitur</th>
          <th>Order Number</th>
          <th>No Jaminan</th>
          <th>Lokasi</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ bodyModalTrx.type }}</td>
          <td>{{ bodyModalTrx.nama_debitur }}</td>
          <td>{{ bodyModalTrx.order_number }}</td>
          <td>{{ bodyModalTrx.no_jaminan }}</td>
          <td>{{ bodyModalTrx.lokasi }}</td>
          <td>{{ bodyModalTrx.status_jaminan }}</td>
        </tr>
        </tbody>
      </n-table>
      <n-table :bordered="false" :single-line="false" size="small">
        <tbody>
        <tr>
          <th>BPKB NO</th>
          <td>{{ bodyModalTrx.no_bpkb }}</td>
        </tr>
        <tr>
          <th>BPKB Atas Nama</th>
          <td>{{ bodyModalTrx.atas_nama }}</td>
        </tr>
        <tr>
          <th>Merk/Tipe/Tahun</th>
          <td>{{ bodyModalTrx.merk }} / {{ bodyModalTrx.tipe }} / {{ bodyModalTrx.tahun }}</td>
        </tr>
        <tr>
          <th>Warna/No Polisi</th>
          <td>{{ bodyModalTrx.warna }} /{{ bodyModalTrx.no_polisi }}</td>
        </tr>
        <tr>
          <th>No Rangka/No Mesin</th>
          <td>{{ bodyModalTrx.no_rangka }}/ {{ bodyModalTrx.no_mesin }}</td>
        </tr>
        <tr>
          <th>No Faktur</th>
          <td>{{ bodyModalTrx.no_faktur }}</td>
        </tr>
        <tr>
          <th>Dokumen</th>
          <td>
            <div class="flex gap-2">
              <n-image v-for="doc in bodyModalTrx.document" width="64" height="64" :src="doc.PATH"
                       :key="doc" class="w-14 h-14 rounded-lg"/>
            </div>
          </td>
        </tr>
        </tbody>
      </n-table>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import {NButton, useMessage} from 'naive-ui';
import {ref, reactive, onMounted, computed} from 'vue';
import {
  ListAltRound as ListIcon,
} from "@vicons/material";
import {useWindowSize} from '@vueuse/core';

const {width,} = useWindowSize();
import {useApi} from '../../../helpers/axios';
// import { usePDF } from "vue3-pdfmake";
import router from '../../../router';
import {useRoute} from 'vue-router';
import {useSearch} from '../../../helpers/searchObject';
import _ from 'lodash';
import {useMeStore} from '../../../stores/me';

const emit = defineEmits();
const props = defineProps({
  type: String,
});

const dynamicForm = reactive({
  jaminan: null,
  tujuan: null,
  catatan: null,
  type: props.type == "pengiriman" ? "send" : 'request'
});
const loading = ref(false);


const message = useMessage();

const baseRoute = useRoute();

const param = baseRoute.params.iduser;
const userToken = localStorage.getItem("token");
const handleCancel = () => {
  emit('batal', true);
};


const rules = {
  no_ktp: {
    trigger: "blur",
    min: 16,
    message: 'No identitas minimal 16 karakter'
  }
}

const columns = [
  {
    type: "selection",
    disabled(row) {
      return (
          row.status_jaminan === "SENDING"
      );
    },
  },
  {
    title: "Jenis",
    key: "type",
    sorter: "default",
  },
  {
    title: "No Kontrak",
    key: "order_number",
    sorter: "default",
    // render(row) {
    //     return h("div", row.no_polisi);
    // }
  },
  {
    title: "Nama Debitur",
    key: "nama_debitur",
    sorter: "default",
  },
  {
    title: "No Jaminan",
    key: "no_jaminan",
    sorter: "default",
  },
  {
    title: "Status",
    key: "status_jaminan",
    sorter: "default",
  },
  {
    width: 100,
    align: "right",
    key: "action",
    render(row) {
      return h(
          NButton,
          {
            size: "small",
            secondary: true,
            round: true,
            onClick: () => {
              detailTrx(row);
            },
          },
          {
            default: () => "detail",
          }
      );
    },
  },
]
const dataBPKB = ref([]);

const response = async () => await useApi({
  method: 'get',
  api: `jaminan`,
  token: userToken
}).then(res => {
  if (res.ok) {
    dataBPKB.value = res.data;
    message.loading("memuat data BPKB");
  } else {
    message.error("error");
  }
});
const searchBox = ref();
const modalTrx = ref(false);
const bodyModalTrx = ref();
const detailTrx = (e) => {
  bodyModalTrx.value = e;
  modalTrx.value = true;
}

const bpkbToArray = (objects) => {
  try {
    return objects.map((obj, i) => [
      i + 1,
      obj.no_polisi,
      obj.no_rangka,
      // obj.no_mesin,
      obj.no_bpkb,
      // obj.no_stnk
    ]);
  } catch (error) {
    return [error];
  }
}
const colHeader = ['No', 'No BPKB', 'No Polisi', 'No Rangka'];
const handleSave = async () => {
  printAfter.value = true;
  const response = await useApi({
    method: 'POST',
    api: 'jaminan_transaction',
    data: dynamicForm,
    token: userToken
  });

  if (!response.ok) {
    message.error("data gagal disimpan");
    loading.value = false;
  } else {
    router.push({name: 'jaminan'})
    message.success("data berhasil disimpan");
    emit('simpan', false);
    loading.value = false;
  }
}
const handleSavePerminataan = async () => {
  printAfter.value = true;
  const bodyData = {
    collateral_id: dynamicForm.bpkb,
    catatan: dynamicForm.catatan,
  }
  const response = await useApi({
    method: 'POST',
    api: 'jaminan_transaction_permintaan',
    data: bodyData,
    token: userToken
  });

  if (!response.ok) {
    message.error("data gagal disimpan");
    loading.value = false;
  } else {
    router.push({name: 'jaminan'})
    message.success("data berhasil disimpan");
    emit('simpan', false);
    loading.value = false;
  }
}
const handleChecked = (e) => {
  dynamicForm.bpkb = e;
}
const dataBpkb = ref([]);
const loadData = ref(true);
useApi({
  method: 'GET',
  api: props.type == 'pengiriman' ? `forpostjaminan` : `forgetjaminan`,
  token: userToken
}).then(res => {
  if (!res.ok) {
    loadData.value = false;
    console.log(res);
    message.error("error koneksi api");
  } else {
    loadData.value= false;
    dataBpkb.value = res.data;
  }
});
const me = useMeStore();
const branchData = ref([]);
const branch = async () => {
  useApi({
    method: 'GET',
    api: `cabang`,
    token: userToken
  }).then(res => {
    if (!res.ok) {
      console.log(res);
      message.error("error koneksi api");
    } else {
      let branchDataApi = _.filter(res.data.response, (o) => o.id != me.me.cabang_id);
      branchData.value = branchDataApi;
    }
  })
};
const showData = computed(() => {
  let data = _.filter(dataBpkb.value, (o) => o.lokasi != 'HO');
  return useSearch(data, searchBox.value);
});


// const pdfmake = usePDF({
//     autoInstallVFS: true,
// });
const printAfter = ref(false);
// const handlePrint = () => {
//     const dataBPKB = bpkbToArray(dynamicForm.bpkb);
//     dataBPKB.unshift(colHeader);
//     pdfmake.createPdf({
//         info: {
//             title: `Surat keterangan serah terima BPKB`,
//             author: "ahapsin",
//         },
//         content: [
//             kopSurat,
//             {
//                 text: "SURAT TANDA TERIMA DOKUMEN",
//                 style: "header",
//                 alignment: "center",
//             },
//             {
//                 text: `daftar list bpkb `,
//                 margin: [0, 20, 0, 0],
//             },
//             {
//                 table: {
//                     widths: [20, '*', '*', '*'],
//                     body: dataBPKB,
//                 },
//                 margin: [0, 20, 0, 0],
//             },
//         ],
//         styles: {
//             header: {
//                 fontSize: 12,
//                 bold: true,
//                 margin: [0, 0, 0, 0],
//             },
//             subheader: {
//                 fontSize: 16,
//                 bold: true,
//                 margin: [0, 10, 0, 5],
//             },
//             tableExample: {
//                 margin: [0, 5, 0, 15],
//             },
//             tableHeader: {
//                 bold: true,
//                 fontSize: 10,
//                 color: "black",
//             },
//         },
//         defaultStyle: {
//             fontSize: 10,
//         },
//     }).print();

// }


onMounted(() => {
  branch();
  if (param) {
    response();
  }
  ;

});
</script>
