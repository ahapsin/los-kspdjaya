<template>
        <n-scrollbar x-scrollable>
                <n-space class="p-4">
                        <n-steps :current="current" :status="currentStatus" v-model:current="current">
                                <n-step title="Informasi Order" />
                                <n-step title="Data Pelanggan" />
                                <n-step title="Data Jaminan" />
                                <n-step title="Data Survey" />
                        </n-steps>
                </n-space>
        </n-scrollbar>
        <n-space vertical class="pt-4">
                <n-form ref="formRef" :model="model" :rules="rules" :label-placement="width <= 920 ? 'top' : 'left'"
                        require-mark-placement="right-hanging" :size="size" label-width="auto">
                        <n-card v-show="current == 1" title="Informasi Kredit" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="Plafond" path="plafond">
                                        <n-input-number :parse="parse" :format="format" v-model:value="order.plafond"
                                                placeholder="plafond" :show-button="false" class="flex !w-full"
                                                :on-update:value="handlePlafond" :loading="loading" />
                                </n-form-item>
                                <n-form-item label="Jenis Angsuran" path="jenis">
                                        <n-select filterable placeholder="Jenis Angsuran" :options="jenisAngsuran"
                                                v-model:value="order.jenis_angsuran" :on-update:value="handleTipe"
                                                :disabled="order.plafond != 0 ? false : true" />
                                </n-form-item>

                                <n-form-item label="Tenor / Angsuran" path="tenor">
                                        <!-- <n-select filterable placeholder="Tenor Kredit" :options="tenorKredit"
                                                v-model:value="order.tenor" /> -->
                                        <div class="flex flex-col md:flex-row" v-show="tipeAngsuran == 'bulanan'">
                                                <n-radio-group v-model:value="order.tenor" name="radiogroup">
                                                        <n-radio @change="handleChange" name="tenor" value="6">
                                                                6 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_6.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                        <n-divider vertical />
                                                        <n-radio name="tenor" @change="handleChange" value="12">
                                                                12 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_12.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                        <n-divider vertical />
                                                        <n-radio name="tenor" @change="handleChange" value="18">
                                                                18 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_18.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                        <n-divider vertical />
                                                        <n-radio name="tenor" @change="handleChange" value="24">
                                                                24 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_24.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                </n-radio-group>
                                        </div>
                                        <div class="flex flex-col md:flex-row" v-show="tipeAngsuran == 'musiman'">
                                                <n-radio-group v-model:value="order.tenor" name="radiogroup">
                                                        <n-radio @change="handleChange" name="tenor" value="3">
                                                                1x 3 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_6.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                        <n-divider vertical />
                                                        <n-radio name="tenor" @change="handleChange" value="6">
                                                                1 x 6 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_12.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                        <n-divider vertical />
                                                        <n-radio name="tenor" @change="handleChange" value="12">
                                                                2 x 12 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_18.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                        <n-divider vertical />
                                                        <n-radio name="tenor" @change="handleChange" value="18">
                                                                3 x 18 bulan<n-text code>
                                                                        {{ skemaAngsuran.length == null ?
                                                                                ` /
                                                                        ${skemaAngsuran.tenor_24.angsuran.toLocaleString('US')}`
                                                                                :
                                                                                ''
                                                                        }}
                                                                </n-text>
                                                        </n-radio>
                                                </n-radio-group>
                                        </div>
                                </n-form-item>
                                <n-form-item label="Tujuan Kredit" path="tujuan_kredit">
                                        <n-select filterable placeholder="Tujuan Kredit" :options="tujuanKredit"
                                                v-model:value="order.tujuan_kredit" />
                                </n-form-item>
                                <n-form-item label="Kategori Kredit" path="category">
                                        <n-select filterable placeholder="Kategori Kredit" :options="optKategori"
                                                v-model:value="order.category" />
                                </n-form-item>
                        </n-card>
                        <n-card v-show="current == 2" title="Data Pelanggan" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="No KTP" path="no_ktp">
                                        <n-input placeholder="NO KTP" v-model:value="pelanggan.no_ktp" />
                                </n-form-item>
                                <n-form-item label="Nama" path="nama">
                                        <n-input placeholder="Nama" v-model:value="pelanggan.nama" />
                                </n-form-item>
                                <n-form-item label="Tanggal lahir" path="tgl_lahir">
                                        <n-space vertical>
                                                <n-alert title="Informasi" type="warning" :bordered="bordered"
                                                        v-if="notifUsia"> {{ noteUsia }} ||</n-alert>
                                                <n-date-picker placeholder="Tanggal Lahir"
                                                        v-model:formatted-value="pelanggan.tgl_lahir"
                                                        value-format="yyyy-MM-dd" type="date"
                                                        @update:value="handleTanggalLahir" />
                                        </n-space>
                                </n-form-item>
                                <n-form-item label="Alamat" path="alamat">
                                        <n-input-group>
                                                <n-input placeholder="Alamat"
                                                        v-model:value="pelanggan.data_alamat.alamat" />
                                                <n-input placeholder="RT" v-model:value="pelanggan.data_alamat.rt" />
                                                <n-input placeholder="RW" v-model:value="pelanggan.data_alamat.rw" />
                                        </n-input-group>
                                </n-form-item>
                                <n-form-item label="No Handphone" path="HP">
                                        <n-input placeholder="No Handphone" v-model:value="pelanggan.no_hp" />
                                </n-form-item>
                                <n-divider title-placement="left">
                                        Dokumen Identitas
                                </n-divider>
                                <n-space>
                                        <n-upload :data="{ 'type': 'ktp' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload KTP
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'ktp pasangan' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload KTP Pasangan
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'kartu keluarga' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload Kartu Keluarga
                                        </n-upload>
                                </n-space>
                        </n-card>
                        <n-card v-show="current == 3" class="flex" title="Data Jaminan" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <!-- <n-form-item label="Jenis Kendaraan" path="tipe_kendaraan">
                                        <n-select filterable placeholder="Tipe Kendaraan" :options="tipeKendaraan"
                                                v-model:value="jaminan.tipe" />
                                </n-form-item> -->
                                <!-- <n-form-item>
                                        <n-alert title="Warning Text" type="warning">
                                                error
                                        </n-alert>
                                </n-form-item> -->
                                <div>
                                        <taksasi-select-state />
                                </div>
                                <!-- <n-form-item label="Tipe Kendaraan" path="tipe_kendaraan">
                                        <n-select filterable placeholder="Tipe Kendaraan" :options="tipeKendaraan"
                                                v-model:value="jaminan.tipe" />
                                </n-form-item> -->
                                <n-form-item label="NO Polisi" path="no_polisi">
                                        <n-input placeholder="No Polisi" v-model:value="jaminan.no_polisi" />
                                </n-form-item>
                                <!-- <n-form-item label="Tahun" path="tahun_kendaraan" :rule="rules.tahun_jaminan">
                                        <n-date-picker v-model:formatted-value="jaminan.tahun" value-format="yyyy"
                                                type="year" placeholder="Tahun jaminan" clearable />
                                </n-form-item> -->
                                <n-form-item label="Warna" path="warna">
                                        <n-input placeholder="warna" v-model:value="jaminan.warna" />
                                </n-form-item>
                                <!-- <n-form-item label="NO BPKB" path="no_bpkb">
                                        <n-input placeholder="No BPKB" v-model:value="jaminan.no_bpkb" />
                                </n-form-item>
                                <n-form-item label="Atas Nama" path="atas_nama">
                                        <n-input placeholder="Atas Nama" v-model:value="jaminan.atas_nama" />
                                </n-form-item>
                                <n-form-item label="NO Polisi" path="no_polisi">
                                        <n-input placeholder="No Polisi" v-model:value="jaminan.no_polisi" />
                                </n-form-item>
                                <n-form-item label="NO Rangka" path="no_rangka">
                                        <n-input placeholder="No Rangka" v-model:value="jaminan.no_rangka" />
                                </n-form-item>
                                <n-form-item label="NO Mesin" path="no_mesin">
                                        <n-input placeholder="No Mesin" v-model:value="jaminan.no_mesin" />
                                </n-form-item>
                                <n-form-item label="NO STNK" path="no_stnk">
                                        <n-input placeholder="No STNK" v-model:value="jaminan.no_stnk" />
                                </n-form-item> -->
                                <!-- <n-form-item label="Nilai Jaminan" path="nilai_jaminan">
                                        <n-input-number :parse="parse" :format="format" v-model:value="jaminan.nilai"
                                                placeholder="Nilai Jaminan" :show-button="false">
                                        </n-input-number>
                                </n-form-item> -->
                                <n-divider title-placement="left">
                                        Dokumen Jaminan
                                </n-divider>
                                <n-space>
                                        <n-upload :data="{ 'type': 'no rangka' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload No Rangka
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'no mesin' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload No Mesin
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'stnk' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload STNK
                                        </n-upload>
                                </n-space>
                                <n-divider />
                                <n-space>
                                        <n-upload :data="{ 'type': 'tampak depan' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload tampak depan
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'tampak belakang' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload tampak belakang
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'tampak kanan' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload tampak kanan
                                        </n-upload>
                                        <n-upload :data="{ 'type': 'tampak kiri' }" list-type="image-card"
                                                :custom-request="handleImagePost">
                                                Upload tampak kiri
                                        </n-upload>
                                </n-space>
                        </n-card>
                        <n-card v-show="current == 4" title="Data Survey" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="Tanggal survey" path="tgl_survey">
                                        <n-date-picker v-model:value="survey.tgl_survey" placeholder="Tanggal Survey"
                                                :default-value="Date.now()" type="date" clearable />
                                </n-form-item>

                                <n-form-item label="Lama Bekerja" path="lama_berkerja">
                                        <n-input placeholder="lama bekerja" v-model:value="survey.lama_bekerja">
                                                <template #suffix>
                                                        bulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan " path="pendapatan">
                                        <n-input-number class="flex w-full" :parse="parse" :format="format"
                                                v-model:value="survey.penghasilan.pribadi"
                                                placeholder="pendapatan pelanggan" :show-button="false">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input-number>
                                </n-form-item>
                                <n-form-item label=" pasangan" path="pendapatan">
                                        <n-input-number class="flex w-full" :parse="parse" :format="format"
                                                v-model:value="survey.penghasilan.pasangan"
                                                placeholder="pendapatan pasangan" :show-button="false">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input-number>
                                </n-form-item>
                                <n-form-item label="lainnya" path="pendapatan">
                                        <n-input-number class="flex w-full" :parse="parse" :format="format"
                                                v-model:value="survey.penghasilan.lainnya"
                                                placeholder="pendapatan lain-lain" :show-button="false">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input-number>
                                </n-form-item>
                                <n-form-item label="Pengeluaran" path="pengeluaran">
                                        <n-input-number :parse="parse" :format="format"
                                                v-model:value="survey.pengeluaran" placeholder="pengeluaran"
                                                :show-button="false">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input-number>
                                </n-form-item>
                                <n-form-item label="Usaha" path="usaha">
                                        <n-input placeholder="usaha" v-model:value="survey.usaha" />
                                </n-form-item>
                                <n-form-item label="Sektor" path="sektor">
                                        <n-select filterable placeholder="sektor" :options="optSektor"
                                                v-model:value="survey.sektor" />
                                </n-form-item>
                                <n-form-item label="Catatan Survey" path="cat_survey">
                                        <n-input v-model:value="survey.catatan_survey" type="textarea"
                                                placeholder="catatan survey" />
                                </n-form-item>
                                <n-divider title-placement="left">
                                        Dokumen Pendukung
                                </n-divider>
                                <n-upload :data="{ 'type': 'dokumen pendukung' }" list-type="image-card"
                                        :custom-request="handleImagePost">
                                </n-upload>

                        </n-card>
                </n-form>
                <!-- <n-space>
                        <n-card>
                                <pre>
                        {{ dynamicForm }}
                </pre>
                        </n-card>
                </n-space> -->

                <n-flex justify="between">
                        <n-button @click="prev" type="secondary" v-if="current > 1">
                                <template #icon>
                                        <n-icon>
                                                <arrow-back />
                                        </n-icon>
                                </template>
                                kembali
                        </n-button>
                        <n-button @click="next" type="primary" v-if="current < 4">
                                <template #icon>
                                        <n-icon>
                                                <arrow-forward />
                                        </n-icon>
                                </template>
                                Selanjutnya
                        </n-button>
                        <n-button :loading="loading" icon-placement="left" type="primary" @click="handleSave" v-else>
                                simpan
                        </n-button>
                </n-flex>
        </n-space>

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward } from "@vicons/material";
import { useMessage } from "naive-ui";
import router from '../../../router';
import { eagerComputed, useWindowSize } from '@vueuse/core';
import { useApi } from "../../../helpers/axios";
import _ from "lodash";
import { lyla } from "@lylajs/web";
const { width, height } = useWindowSize()
const message = useMessage();
const uuid = uuidv4();
const current = ref(1);
const loading = ref(false);
const tipeAngsuran = ref('bulanan');

const skemaAngsuran = ref([]);
const filteredAngsuran = ref([]);
const nilaiAngsuran = reactive({
        tenor6: null,
        tenor12: null,
        tenor18: null,
        tenor24: null
});
const tenor6 = ref([]);
const tenor12 = ref([]);
const tenor18 = ref([]);
const tenor24 = ref([]);


const diffState = ref();

const refAdmin = async (body) => {
        skemaAngsuran.value = [];
        // const bodyPost = {
        //         "plafond": 1500000,
        //         "jenis_angsuran": "bulanan"
        // };
        loading.value = true;
        const response = await useApi({
                method: 'post',
                api: 'fee_survey',
                data: body,
                token: userToken
        });
        if (!response.ok) {
                message.error("sesi berakhir");
                localStorage.removeItem("token");
                router.replace('/');
        } else {
                loading.value = false;
                skemaAngsuran.value = response.data;
                tenor6.value = response.data.tenor_6;
                tenor12.value = response.data.tenor_12;
                tenor18.value = response.data.tenor_18;
                tenor24.value = response.data.tenor_24;
        }
}

// onMounted(() => refAdmin());

const sum = (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
                return undefined;
        }
        return num1 + num2;
};

const userToken = localStorage.getItem("token");

const currentStatus = ref("process");

const next = () => current.value += 1;
const prev = () => current.value -= 1;

const tujuanKredit = ["konsumsi", "investasi"].map(
        (v) => ({
                label: v,
                value: v
        }));
const tenorKredit = ["12", "24", "36"].map(
        (v) => ({
                label: v,
                value: v
        }));
const jenisAngsuran = ["Bulanan", "Musiman"].map(
        (v) => ({
                label: v,
                value: v.toLowerCase(),
        }));
const optKategori = ["Baru", "RO"].map(
        (v) => ({
                label: v,
                value: v
        }));
const tipeKendaraan = ["motor", "mobil"].map(
        (v) => ({
                label: v,
                value: v
        }));
const optSektor = ["PERDAGANGAN UMUM", "JASA", "HOTEL DAN PENGINAPAN", "INDUSTRI"].map(
        (v) => ({
                label: v,
                value: v
        }));
const order = ref({
        tujuan_kredit: null,
        plafond: "",
        tenor: null,
        category: null,
        jenis_angsuran: 'bulanan',
});
const pelanggan = reactive({
        nama: "",
        no_ktp: "",
        no_hp: "",
        tgl_lahir: null,
        data_alamat: {
                alamat: "",
                rt: "",
                rw: "",
                provinsi: "",
                kota: "",
                kecamatan: "",
                kelurahan: ""
        }
});
const jaminan = ref({
        tipe: null,
        tahun: null,
        merk: "",
        warna: "",
        atas_nama: "",
        no_polisi: "",
        no_rangka: "",
        no_mesin: "",
        no_bpkb: "",
        no_stnk: "",
        nilai: ""
});
const survey = reactive({
        lama_bekerja: "",
        penghasilan: {
                pribadi: "",
                pasangan: "",
                lainnya: ""
        },
        pengeluaran: "",
        usaha: "",
        sektor: "",
        catatan_survey: "",
        tgl_survey: Date.now(),
});
const dynamicForm = reactive({
        id: uuid,
        order: order.value,
        data_nasabah: pelanggan,
        data_survey: survey,
        jaminan_kendaraan: [jaminan.value]
});
const handlePlafond = (e) => {
        order.value.plafond = e;
        const body = {
                plafond: e,
                jenis_angsuran: order.value.jenis_angsuran,
        }
        refAdmin(body);
}
const handleTipe = (e) => {
        tipeAngsuran.value = e;
        order.value.jenis_angsuran = e;
        const body = {
                plafond: order.value.plafond,
                jenis_angsuran: e,
        }
        refAdmin(body);
}
const notifUsia = ref(false)
const noteUsia = ref(false)
const usiaPelanggan = ref()
const handleTanggalLahir = (e) => {
        var month_diff = Date.now() - e;
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        if (age > 19 && age < 60) {
                notifUsia.value = false;
        } else {
                if (age < 19) {
                        notifUsia.value = true;
                        noteUsia.value = `usia ${age} tahun, usia < dari 19 Tahun`;
                } else if (age < 60) {
                        notifUsia.value = true;
                        noteUsia.value = `usia ${age} tahun, usia > dari 60 Tahun`;
                }
        }
}
const handleSave = async (e) => {
        e.preventDefault(e);
        // formRef.value?.validate((errors) => {
        //         if (errors) {
        //                 loading.value = false
        //         }
        // });
        loading.value = true;
        const response = await useApi({
                method: 'POST',
                api: 'kunjungan',
                data: dynamicForm,
                token: userToken
        });
        if (!response.ok) {
                message.error("data gagal disimpan");
                loading.value = false;
        } else {
                message.success("data berhasil disimpan");
                loading.value = false;
                router.replace('/task/survey');
        }
}

const handleImagePost = ({ file, data, onError, onFinish, onProgress }) => {
        let idApp = uuid;
        const form = new FormData();
        form.append('image', file.file);
        form.append('type', data.type);
        form.append('cr_prospect_id', idApp);
        const headers = {
                Authorization: `Bearer ${userToken}`,
        }

        lyla.post('https://api.kspdjaya.id/image_upload_prospect', {
                headers,
                body: form,
                onUploadProgress: ({ percent }) => {
                        onProgress({ percent: Math.ceil(percent) });
                }
        }).then(({ json }) => {
                message.success("upload gambar berhasil");
                onFinish();
        }).catch((error) => {
                message.success("upload gambar gagal");
                onError();
        });
};
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const tahunJaminanValidate = (rule, value) => {
        let tahun = new Date().getFullYear();
        let diff = tahun - jaminan.value.tahun;
        diffState.value = 2;
        return diff <= 10;
}
const rules = {
        tahun_jaminan: {
                message: `jumlah tahun lebih dari 10 Tahun`,
                validator: tahunJaminanValidate,
                trigger: ['blur']
        },
}
const seprator = (value) => {
        let nums = value.replace(/,/g, '');
        // if (nums.endsWith('.')) return;
        // if (!nums) return;
        return parseFloat(nums).toLocaleString();
}
const parse = (input) => {
        const nums = input.replace(/,/g, "").trim();
        if (/^\d+(\.(\d+)?)?$/.test(nums))
                return Number(nums);
        return nums === "" ? null : Number.NaN;
}
const format = (value) => {
        if (value === null)
                return "";
        return value.toLocaleString("en-US");
}
</script>