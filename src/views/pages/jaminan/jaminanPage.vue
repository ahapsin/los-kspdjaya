<template>
  <n-tabs size="medium" @update:value="handleUpdateValue" class="card-tabs" default-value="jaminan" animated
          type="card" pane-wrapper-style="margin: 0 -4px"
          pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
    <n-tab-pane name="jaminan" tab="Jaminan">
      <template #tab>
        <div>
          Jaminan
        </div>
      </template>
      <div class="flex w-full mb-2 justify-between px-4">
        <n-statistic label="Jaminan tersedia di POS">
          {{ showData.length }}
        </n-statistic>
        <n-popover trigger="click" placement="bottom-end">
          <template #trigger>
            <n-button circle>
              <n-icon>
                <search-icon/>
              </n-icon>
            </n-button>
          </template>
          <n-space vertical>
            <n-input autofocus="true" clearable placeholder="Cari No Kontrak / Nama Debitur"
                     v-model:value="searchBox"/>
          </n-space>
        </n-popover>
      </div>

      <n-data-table :columns="columns" :data="showData" size="small" :pagination="{pageSize:10}"/>
    </n-tab-pane>
    <n-tab-pane name="transaksi" tab="Transaksi">
      <n-data-table :columns="columnsTransaction" :data="dataTransaction" size="small"/>
    </n-tab-pane>
    <n-tab-pane name="Approval" tab="Approval">
      <n-data-table :columns="columnsTransactionApproval" :data="dataTransactionApproval" size="small"/>
    </n-tab-pane>
    <template #suffix>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect" v-if="addButtonDisplay">
        <n-button type="primary">Tambah Transaksi</n-button>
      </n-dropdown>
    </template>
  </n-tabs>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <div class="w-1/2">
      <FormTransaksi @batal="showModal = false" v-if="typeTransaksi == 'kirim'" @simpan="handleSimpanModal"
                     type="pengiriman"/>
      <FormTransaksi @batal="showModal = false" v-if="typeTransaksi == 'minta'" @simpan="handleSimpanModal"
                     type="permintan"/>
      <FormUpdate @batal="showModal = false" v-if="typeTransaksi == 'update'"/>
    </div>
  </n-modal>
  <n-modal v-model:show="showDetailModal" title="Modal">
    <n-card class="w-2/3">
      <n-tabs>
        <n-tab-pane name="detail" tab="Detail Jaminan ">

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
              <td>{{ bodyModal.type }}</td>
              <td>{{ bodyModal.nama_debitur }}</td>
              <td>{{ bodyModal.order_number }}</td>
              <td>{{ bodyModal.no_jaminan }}</td>
              <td>{{ bodyModal.lokasi }}</td>
              <td>{{ bodyModal.status_jaminan }}</td>
            </tr>
            </tbody>
          </n-table>
          <n-table :bordered="false" :single-line="false" size="small">
            <tbody>
            <tr>
              <th>BPKB NO</th>
              <td>{{ bodyModal.no_bpkb }}</td>
            </tr>
            <tr>
              <th>BPKB Atas Nama</th>
              <td>{{ bodyModal.atas_nama }}</td>
            </tr>
            <tr>
              <th>Merk/Tipe/Tahun</th>
              <td>{{ bodyModal.merk }} / {{ bodyModal.tipe }} / {{ bodyModal.tahun }}</td>
            </tr>
            <tr>
              <th>Warna/No Polisi</th>
              <td>{{ bodyModal.warna }} /{{ bodyModal.no_polisi }}</td>
            </tr>
            <tr>
              <th>No Rangka/No Mesin</th>
              <td>{{ bodyModal.no_rangka }}/ {{ bodyModal.no_mesin }}</td>
            </tr>
            <tr>
              <th>No Faktur</th>
              <td>{{ bodyModal.no_faktur }}</td>
            </tr>
            <tr>
              <th>Dokumen</th>
              <td>
                <n-image v-for="doc in bodyModal.document" width="64" height="64" :src="doc.PATH"
                         :key="doc"/>
              </td>
            </tr>
            </tbody>
          </n-table>

        </n-tab-pane>
        <n-tab-pane name="rilis" tab="Rilis Jaminan">
          <n-result
              v-if="bodyModal.status_kontrak != 'active'"
              status="403"
              title="Rilis Jaminan Tidak Tersedia"
              description="Terdapat kredit aktif, jaminan tidak dapat diproses rilis !"
          >
          </n-result>
          <div v-else>
            <div class="bg-white border border-black p-4" ref="buktiTerimaRef">
              <div class="flex gap-2 items-center">
                <img class="h-10 md:h-10" :src="applogo" alt="logo_company"/>
                <div class="flex flex-col">
                  <span class="text-xl font-bold">apptitle</span>
                  <n-text strong class="text-md"> POS: {{ bodyModal.lokasi }}</n-text>
                </div>
              </div>
              <div class="mb-4 text-center text-base">
                <b>SURAT TANDA TERIMA DOKUMEN</b>
              </div>
              <div class="mb-4">yang bertanda tangan di bawah ini:</div>
              <div class="mb-4">
                <table>
                  <tr>
                    <td width="100px">Nama</td>
                    <td width="25">:</td>
                    <td>
                      <b class="uppercase">{{ bodyModal.nama_debitur }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>No Jaminan</td>
                    <td width="25">:</td>
                    <td>
                      <b class="uppercase">{{ bodyModal.no_jaminan }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>No Order</td>
                    <td width="25">:</td>
                    <td>
                      <b class="uppercase">{{ bodyModal.order_number }}</b>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="mb-4 text-justify text-sm">
                Pada hari ini <b>{{ dayFull.day }}</b> tanggal
                <b>{{ dayFull.date }}</b> bulan <b>{{ dayFull.month }}</b> tahun
                <b>{{ dayFull.year }}</b>,Dengan ini telah menerima buku kepemilikan kendaraan (BPKB)
                dalam keadaan baik dengan rincian sebagai berikut :
              </div>
              <div class="text-justify pt-2">
                Jenis Dokumen: <b> </b>
                <table v-if="bodyModal.type.toLowerCase() == 'kendaraan'">
                  <tr>
                    <td>BPKB No</td>
                    <td width="25">:</td>
                    <td>{{ bodyModal.no_bpkb }}</td>
                  </tr>
                  <tr>
                    <td>BPKB atas nama</td>
                    <td width="25">:</td>
                    <td>{{ bodyModal.atas_nama }}</td>
                  </tr>
                  <tr>
                    <td>Merk/Type/Tahun</td>
                    <td width="25">:</td>
                    <td>{{ bodyModal.merk }}/{{ bodyModal.tipe }}/{{ bodyModal.tahun }}</td>
                  </tr>
                  <tr>
                    <td>Warna/No.Polisi</td>
                    <td width="25">:</td>
                    <td>{{ bodyModal.warna }}/{{ bodyModal.no_polisi }}</td>
                  </tr>
                  <tr>
                    <td>No. Rangka/Mesin</td>
                    <td width="25">:</td>
                    <td>{{ bodyModal.no_rangka }}/{{ bodyModal.no_mesin }}</td>
                  </tr>
                  <tr>
                    <td>No. Faktur</td>
                    <td width="25">:</td>
                    <td>{{ bodyModal.no_faktur }}</td>
                  </tr>
                </table>
                <table v-else>
                  <tr>
                    <td>No Sertifikat</td>
                    <td width="25">:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Atas Nama</td>
                    <td width="25">:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Status Kepemilikan</td>
                    <td width="25">:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>IMB / Luas Tanah / Luas Bangunan</td>
                    <td width="25">:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td>Lokasi</td>
                    <td width="25">:</td>
                    <td></td>
                  </tr>
                </table>
              </div>

              <div class="mb-4">
                <!-- Selanjutnya disebut Penjamin<br /> -->
                Dokumen tersebut telah diterima dalam keadaan baik untuk
                ditindaklanjuti sebagaimana mestinya
              </div>
              <div>
                <table class="!text-sm w-full">
                  <tr>
                    <td class="py-4 pr-4">
                      Pemberi,
                      <br/><br/><br/>
                      <u class="uppercase">{{ me.me.nama }}</u>
                    </td>
                    <td class="py-4 pr-4">
                      Penerima,
                      <br/><br/><br/>
                      <u class="uppercase">{{ bodyModal.nama_debitur }}</u>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <n-collapse class="p-2 rounded-xl border mt-2 shadow bg-sc-50/50" v-if="bodyModal.status_kontrak=='active'">
              <n-collapse-item title="Rilis Dokumen" name="1">
                <div class="flex bg-white  p-2 rounded-xl flex-col gap-2">
                  <n-button type="info" dashed @click="cetakBuktiTerima">Cetak Bukti Terima</n-button>
                  <file-upload title="Upload bukti terima " endpoint="image_upload_prospect" type="ktp"/>
                </div>
              </n-collapse-item>
            </n-collapse>
          </div>
        </n-tab-pane>
      </n-tabs>


    </n-card>
  </n-modal>
  <n-modal v-model:show="modalTrx" title="Modal">
    <n-card class="w-2/3" title="Data Surat">
      <template #header-extra>
        <n-button type="primary" @click="handlePrint">
          <n-space>
            <n-icon>
              <print-icon/>
            </n-icon>
            Cetak Surat
          </n-space>
        </n-button>
      </template>
      <div ref="printArea" class="p-4">
        <div class="flex gap-2 p-4">
          <img
              class="h-10 md:h-10"
              :src="applogo"
              alt="logo_company"
          />
          <span class="text-2xl font-bold">{{apptitle}}</span>
        </div>
        <n-table :bordered="false" :single-line="false" size="small">
          <thead>
          <tr>
            <th>No Surat</th>
            <th>Transaksi</th>
            <th>Tanggal</th>
            <th>Dari</th>
            <th>Ke</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ bodyModalTrx.trx_code }}</td>
            <td>{{ bodyModalTrx.type }}</td>
            <td>{{ bodyModalTrx.tgl }}</td>
            <td>{{ bodyModalTrx.dari_cabang }}</td>
            <td>{{ bodyModalTrx.ke_cabang }}</td>
            <td>{{ bodyModalTrx.status }}</td>
          </tr>
          </tbody>
        </n-table>
        <n-table :bordered="false" :single-line="false" size="small">
          <tr>
            <th style="width:10%">Kurir</th>
            <td>{{ bodyModalTrx.kurir }}</td>
          </tr>
          <tr>
            <th>Keterangan</th>
            <td>{{ bodyModalTrx.keterangan }}</td>
          </tr>
        </n-table>
        <h1 class="font-semibold py-4">Data Jaminan</h1>
        <n-data-table :row-key="(row) => row.id" :checked-row-keys="checkedRowJaminan" :bordered="false"
                      :single-line="false" size="small"
                      :columns="bodyModalTrx.status == 'SELESAI'?columnsJaminan:columnsJaminanApprove"
                      :data="bodyModalTrx.jaminan"
                      :on-update:checked-row-keys="handleCheckedJaminan">
        </n-data-table>
        <div class="flex flex-col border-b border-dashed pb-4 ms-3 pt-4">
          <div class="flex gap-4">
            <div class="border-b pb-20 px-4 w-36">
              <n-text strong class="text-md font-bold"> {{ bodyModalTrx.dari_cabang }}</n-text>
            </div>
            <div class="border-b pb-20 px-4 w-36">
              <n-text strong class="text-md font-bold"> {{ bodyModalTrx.kurir }}</n-text>
            </div>
            <div class="border-b pb-20 px-4 w-36">
              <n-text strong class="text-md font-bold"> {{ bodyModalTrx.ke_cabang }}</n-text>
            </div>
          </div>
        </div>
        <div v-if="bodyModalTrx.status !='SELESAI' ">
          <n-form-item label="keterangan" class="pt-2">
            <n-input type="textarea" v-model:value="bodyApprove.keterangan"/>
          </n-form-item>
          <n-button type="primary" @click="handleApprove">approve</n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
  <n-modal v-model:show="modalTrxApproval" title="Modal">
    <n-card class="w-2/3">
      <h1 class="font-semibold py-4">Data Surat</h1>
      <n-table :bordered="false" :single-line="false" size="small">
        <thead>
        <tr>
          <th>No Surat</th>
          <th>Transaksi</th>
          <th>Tanggal</th>
          <th>Dari</th>
          <th>Ke</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ bodyModalTrx.trx_code }}</td>
          <td>{{ bodyModalTrx.type }}</td>
          <td>{{ bodyModalTrx.tgl }}</td>
          <td>{{ bodyModalTrx.dari_cabang }}</td>
          <td>{{ bodyModalTrx.ke_cabang }}</td>
          <td>{{ bodyModalTrx.status }}</td>
        </tr>
        </tbody>
      </n-table>
      <n-table :bordered="false" :single-line="false" size="small">
        <tr>
          <th style="width:10%">Kurir</th>
          <td>{{ bodyModalTrx.kurir }}</td>
        </tr>
        <tr>
          <th>Keterangans</th>
          <td>{{ bodyModalTrx.keterangan }}</td>
        </tr>
      </n-table>
      <h1 class="font-semibold py-4">Data Jaminan</h1>
      <n-data-table :row-key="(row) => row.id" :checked-row-keys="checkedRowJaminan" :bordered="false"
                    :single-line="false" size="small"
                    :columns="bodyModalTrx.status == 'SELESAI'?columnsJaminan:columnsJaminanApprove"
                    :data="bodyModalTrx.jaminan"
                    :on-update:checked-row-keys="handleCheckedJaminan">
      </n-data-table>

      <div v-if="bodyModalTrx.status !='SELESAI' ">
        <n-form-item label="keterangan" class="pt-2">
          <n-input type="textarea" v-model:value="bodyApprove.keterangan"/>
        </n-form-item>
        <n-button type="primary" @click="handleApprove">approve</n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup>
import {computed, h, onMounted, ref} from 'vue';
import {NButton, useLoadingBar, useMessage} from 'naive-ui';
import {useApi} from '../../../helpers/axios';
import FormTransaksi from './trxJaminan.vue';
import FormUpdate from './updateJaminanPage.vue';
import {
  SearchRound as searchIcon,
  LocalPrintshopRound as PrintIcon,
} from "@vicons/material";
import {useSearch} from '../../../helpers/searchObject';
import {reactive} from 'vue';
import {useVueToPrint} from "vue-to-print";
import {useMeStore} from "../../../stores/me.js";
const apptitle = import.meta.env.VITE_APP_TITLE;
const applogo = import.meta.env.VITE_APP_LOGO;
const me = useMeStore();
const message = useMessage();
const showModal = ref(false);
const dataTable = ref([]);
const dataTransaction = ref([]);
const dataTransactionApproval = ref([]);
const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "jaminan",
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API (J2)");
  } else {
    dataTable.value = response.data;
  }
};


const buktiTerimaRef = ref(null);

const handleApprove = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    data: bodyApprove,
    api: "jaminan_approval",
    token: userToken,
  });
  if (!response.ok) {
    message.error("error");

  } else {
    message.success("berhasil");
    modalTrx.value = false;
  }

}
var dt = new Date();
let year = dt.getFullYear();
let day = dt.getDate().toString().padStart(2, "0");

let thisMonths = (dt.getMonth() + 1).toString().padStart(2, "0");
const thisday = `${year}-${thisMonths}-${day}`;
const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const daysName = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];
const dayFull = reactive({
  day: computed(() => daysName[new Date(thisday).getDay()]),
  date: computed(() => new Date(thisday).getDate()),
  month: computed(() => monthNames[new Date(thisday).getMonth()]),
  year: computed(() => new Date(thisday).getFullYear()),
  full_date_only: computed(
      () => `${dayFull.date} ${dayFull.month} ${dayFull.year}`
  ),
  full_date: computed(
      () => `${dayFull.day}, ${dayFull.date} ${dayFull.month} ${dayFull.year}`
  ),
});
const getDataTransaction = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "jaminan_transaction",
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    message.info("memuat transaksi jaminan");

    dataTransaction.value = response.data;
  }
};
const loadingBar = useLoadingBar();
const getDataTransactionApproval = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "jaminan_list_approval",
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    loadingBar.finish();
    message.info("memuat transaksi jaminan approval");
    dataTransactionApproval.value = response.data;
  }
};

const options = [
  {
    label: 'Pengiriman',
    key: 'kirim',
  },
  {
    label: 'Permintaan',
    key: 'minta',
  },
  {
    label: 'Update Jaminan',
    key: 'update'
  }
];

const searchBox = ref();
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
const typeTransaksi = ref();
const handleSelect = (e) => {
  showModal.value = true;
  typeTransaksi.value = e;

}
const addButtonDisplay = ref(false);
const handleUpdateValue = (e) => {
  if (e === "transaksi") {
    addButtonDisplay.value = true;
  } else {
    addButtonDisplay.value = false;
  }
}
const columns = [
  {
    title: "Jenis",
    key: "type",
    sorter: "default",
  },
  {
    title: "No Kontrak",
    key: "order_number",
    sorter: "default",
  },
  {
    title: "Stts Kontrak",
    key: "status_kontrak",
    sorter: "default",
  },
  {
    title: "Nama Debitur",
    key: "nama_debitur",
    sorter: "default",
  },
  {
    title: "Asal Jaminan",
    key: "asal_lokasi",
    sorter: "default",
  },
  {
    title: "Lokasi Jaminan",
    key: "lokasi",
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
              handleAction(row);
            },
          },
          {
            default: () => "detail",
          }
      );
    },
  },
];
const columnsTransaction = [
  {
    title: "No Surat",
    key: "trx_code",
    sorter: "default",
  },
  {
    title: "Transaksi",
    key: "type",
    sorter: "default",
  },
  {
    title: "Tanggal",
    key: "tgl",
    sorter: "default",
  },
  {
    title: "Jumlah Jaminan",
    key: "jml_jaminan",
    sorter: "default",
  },
  {
    title: "dari",
    key: "dari_cabang",
    sorter: "default",
  },
  {
    title: "ke",
    key: "ke_cabang",
    sorter: "default",
  },
  {
    title: "Status",
    key: "status",
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
];
const columnsTransactionApproval = [
  {
    title: "No Surat",
    key: "trx_code",
    sorter: "default",
  },
  {
    title: "Transaksi",
    key: "type",
    sorter: "default",
  },
  {
    title: "Tanggal",
    key: "tgl",
    sorter: "default",
  },
  {
    title: "Jumlah Jaminan",
    key: "jml_jaminan",
    sorter: "default",
  },
  {
    title: "dari",
    key: "dari_cabang",
    sorter: "default",
  },
  {
    title: "ke",
    key: "ke_cabang",
    sorter: "default",
  },
  {
    title: "Status",
    key: "status",
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
              detailTrxApproval(row);
            },
          },
          {
            default: () => "detail",
          }
      );
    },
  },
];
const printArea = ref();
const {handlePrint} = useVueToPrint({
  content: printArea,
  documentTitle: "Surat Mutasi Jaminan",
});
const checkedRowJaminan = ref([]);
const cetakBuktiTerima = () => {
  handlePrintBuktiTerima;
}
const modelJaminan = ref();
const bodyApprove = reactive({
  no_surat: null,
  flag: "yes",
  jaminan: checkedRowJaminan,
})
const handleCheckedJaminan = (e) => {

  checkedRowJaminan.value = e;

}
const columnsJaminan = [

  {
    title: "No Surat",
    key: "BPKB_NUMBER",
    sorter: "default",
  },
  {
    title: "Transaksi",
    key: "POLICE_NUMBER",
    sorter: "default",
  },
  {
    title: "Tanggal",
    key: "ON_BEHALF",
    sorter: "default",
  },
  {
    title: "Jumlah Jaminan",
    key: "CHASIS_NUMBER",
    sorter: "default",
  },
  {
    title: "dari",
    key: "ENGINE_NUMBER",
    sorter: "default",
  },
  {
    title: "ke",
    key: "LOAN_NUMBER",
    sorter: "default",
  }
];
const columnsJaminanApprove = [
  {
    key: "id",
    type: "selection",
  },
  {
    title: "No BPKB",
    key: "BPKB_NUMBER",
    sorter: "default",
  },
  {
    title: "No Polisi",
    key: "POLICE_NUMBER",
    sorter: "default",
  },
  {
    title: "Atas Nama",
    key: "ON_BEHALF",
    sorter: "default",
  },
  {
    title: "No Rangka",
    key: "CHASIS_NUMBER",
    sorter: "default",
  },
  {
    title: "No Mesin",
    key: "ENGINE_NUMBER",
    sorter: "default",
  },
  {
    title: "No Order",
    key: "LOAN_NUMBER",
    sorter: "default",
  }
];
const bodyModal = ref();
const bodyModalTrx = ref();
const showDetailModal = ref(false);
const modalTrx = ref(false);
const modalTrxApproval = ref(false);
const handleAction = (e) => {
  showDetailModal.value = true;
  bodyModal.value = e;
}

const detailTrx = (e) => {
  bodyApprove.no_surat = e.trx_code;
  let jaminan = e.jaminan;
  modelJaminan.value = jaminan.map((o) => {
    return {
      id: o.id,
      flag: "check"
    }
  });
  checkedRowJaminan.value = jaminan.map((o) => o.id);
  bodyModalTrx.value = e;
  modalTrx.value = true;
}
const detailTrxApproval = (e) => {
  bodyApprove.no_surat = e.trx_code;
  let jaminan = e.jaminan;
  modelJaminan.value = jaminan.map((o) => {
    return {
      id: o.id,
      flag: "check"
    }
  });
  checkedRowJaminan.value = jaminan.map((o) => o.id);
  bodyModalTrx.value = e;
  modalTrxApproval.value = true;
}

onMounted(() => {
  getData();
  getDataTransaction();
  getDataTransactionApproval();
});


const handleSimpanModal = () => {
  getDataTransaction();

  showModal.value = false;
}
</script>
