<template>
    <n-card :segmented="{
        content: true,
        footer: 'soft',
    }">
        <!-- <pre>{{ pageData }}</pre> -->
        <template #header>Tambah Penerimaan Uang</template>
        <template #header-extra>

            <n-space>

                <n-button round v-show="!searchField" strong secondary type="warning" @click="handleBack">
                    <template #icon>
                        <n-icon>
                            <back-icon />
                        </n-icon>
                    </template>
                    <p class="hidden md:flex">kembali</p>
                </n-button>
                <!-- <n-button
          round
          v-show="!searchField"
          strong
          secondary
          type="success"
          @click="handlePayFull"
        >
          <template #icon>
            <n-icon>
              <full-pay />
            </n-icon>
          </template>
          <p class="hidden">pindah ke pelunasan</p>
        </n-button> -->
                <n-button v-show="!searchField" strong secondary circle @click="handleExpand">
                    <template #icon>
                        <n-icon>
                            <full-icon />
                        </n-icon>
                    </template>
                </n-button>
            </n-space>
        </template>
        <div class="flex flex-col md:flex-row gap-2">
            <n-form-item label="Nama Pelanggan" class="w-full">
                <n-input v-model:value="dynamicSearch.nama" type="text" placeholder="Nama" @input="handleSearch"
                    clearable />
            </n-form-item>
            <n-form-item label="No Polisi" class="w-full">
                <n-input v-model:value="dynamicSearch.no_polisi" type="text" placeholder="No Polisi"
                    @input="handleSearch" clearable />
            </n-form-item>
            <n-form-item label="No Kontrak" class="w-full">
                <n-input v-model:value="dynamicSearch.no_kontrak" type="text" placeholder="No Kontrak"
                    @input="handleSearch" clearable />
            </n-form-item>
        </div>
        <div>
            <n-data-table :row-props="rowProps" striped :row-class-name="rowClassName" size="small" :scroll-x="800"
                :row-key="(row) => row.loan_number" :columns="columns" :data="dataSearch" :max-height="300"
                :on-update:checked-row-keys="handleFasilitas" :loading="loadSearch" class="pb-2"
                v-show="dataFasilitas" />
            <n-data-table striped size="small" :scroll-x="1200" :row-key="(row) => row" :columns="columnStruktur"
                :data="dataStrukturKredit" :max-height="300" :checked-row-keys="checkedRowCredit"
                :loading="loadStructure" v-show="dataAngsuran" :on-update:checked-row-keys="handleAngsuran"
                class="py-2" />
            <n-space vertical>
                <n-alert type="warning" :show-icon="false" class="mb-2" v-show="isLasted">
                    <div class="flex justify-between gap-4">
                        <div class="flex w-full justify-start gap-4 items-center">
                            <div>Tungakan denda</div>
                            <div class="text-lg">
                                {{ formatter.format(pageData.tunggakan_denda + dendaAngsuranBerjalan) }}
                            </div>
                        </div>
                        <div class="flex w-full justify-end items-center gap-2">
                            <div>Diskon</div>
                            <div class="flex gap-2">
                                <n-input-number v-bind:dir="isRtl ? 'rtl' : 'ltr'" :show-button="false" :min="0"
                                    :default-value="0" clearable icon size="" :parse="parse" :format="format"
                                    :max="pageData.tunggakan_denda + dendaAngsuranBerjalan" @input="diskonFormat"
                                    placeholder="Jumlah Diskon" v-model:value="pageData.diskon_tunggakan" />

                            </div>
                        </div>
                    </div>
                </n-alert>
            </n-space>
            <div class="md:flex gap-2 bg-pr/10 rounded-xl items-center pt-4 px-4" v-show="dataPayment">
                <n-form-item path="nestedValue.path2" label="Jenis Pembayaran" class="w-full">
                    <div class="flex gap-2">
                        <n-select filterable :options="optTipePay" placeholder="Jenis Pembayaran"
                            v-model:value="pageData.payment_method" />
                        <n-button v-show="pageData.payment_method == 'transfer'"
                            :type="dataBuktiTransfer.length > 0 ? 'success' : 'warning'" @click="buktiTransfer = true">
                            <template #icon>
                                <n-icon v-if="dataBuktiTransfer.length > 0"><check-icon /></n-icon>
                            </template>

                            Bukti
                        </n-button>
                    </div>
                </n-form-item>
                <n-form-item path="nestedValue.path2" label="Total Bayar" class="w-full">
                    <n-input-number v-bind:dir="isRtl ? 'rtl' : 'ltr'" placeholder="Jumlah Pembayaran"
                        v-model:value="totalPay" :show-button="false" :parse="parse" :format="format" clearable
                        class="w-full" readonly>
                    </n-input-number>
                </n-form-item>
                <n-form-item path="nestedValue.path2" label="Uang Pelanggan" class="w-full">
                    <n-input-number v-bind:dir="isRtl ? 'rtl' : 'ltr'" placeholder="Jumlah Pembayaran"
                        @focus="handleFocus" ref="inputFocus" v-model:value="pageData.jumlah_uang" :show-button="false"
                        :parse="parse" :format="format" clearable class="w-full">
                    </n-input-number>
                </n-form-item>
                <n-form-item label="Pembulatan" class="w-full">
                    <n-input-number v-bind:dir="isRtl ? 'rtl' : 'ltr'" :show-button="false" :parse="parse" min="0"
                        :format="format" :max="pageData.jumlah_uang - totalPay" v-model:value="pageData.pembulatan"
                        clearable class="w-full" />
                </n-form-item>
                <n-form-item label="Kembalian" class="w-full">
                    <n-input-number v-bind:dir="isRtl ? 'rtl' : 'ltr'" :show-button="false" min="0;" :parse="parse"
                        :format="format" v-model:value="pageData.kembalian" readonly class="w-full" />
                </n-form-item>
                <n-form-item class="w-full">
                    <n-button type="primary" @click="handleProses" :loading="loadProses" class="w-full" :disabled="totalPay === 0
                        ? true
                        : pageData.jumlah_uang <= 0
                            ? true
                            : pageData.kembalian < 0
                                ? true
                                : dataBuktiTransfer.length == 0 && pageData.payment_method == 'transfer'
                                    ? true
                                    : false
                        ">
                        Proses
                    </n-button>
                </n-form-item>
            </div>
        </div>
    </n-card>

    <n-modal class="w-1/4" v-model:show="buktiTransfer" preset="card" :segmented="segmented">
        <file-upload title="Bukti Transfer" :def_value="dataBuktiTransfer" endpoint="payment_attachment"
            type="bukti_transfer" :idapp="pageData.uid" @fallback="handleResBack" />
    </n-modal>
</template>
<script setup>
import { v4 as uuidv4 } from "uuid";
import { lyla } from "@lylajs/web";
import { useApi } from "../../../helpers/axios";

import router from "../../../router";
import _ from "lodash";
import {
    CheckCircleRound as checkIcon,
    ChevronLeftRound as backIcon,
    OpenInFullRound as fullIcon,
} from "@vicons/material";
import {
    useDialog,
    useMessage,
    NIcon,
    NTag,
    NButton,
    NInput,
    NInputNumber,
} from "naive-ui";
import { computed, reactive, ref, h } from "vue";

const searchField = ref(false);

const prosesButton = ref(true);
const checkedRowCredit = ref([]);
const dialogProses = ref(false);
const paymentData = ref([]);
const buktiTransfer = ref(false);
const dataBuktiTransfer = ref([]);
const diskonInput = ref("false");
const isLast = ref(false);

const handleResBack = (data) => {
    dataBuktiTransfer.value = data;
}
const dendaAngsuranBerjalan = computed(
    () => {
        const totalPenalty = () =>
            checkedRowCredit.value.reduce(
                (total, installment) => total + installment.bayar_denda,
                0
            );
        return totalPenalty();
    }
);
const totalPay = computed(() => {
    const totalInstallment = () =>
        checkedRowCredit.value.reduce(
            (total, installment) => total + installment.bayar_angsuran,
            0
        );
    const totalPenalty = () =>
        checkedRowCredit.value.reduce(
            (total, installment) => total + installment.bayar_denda,
            0
        );
    const combinedTotal = () => totalInstallment() + totalPenalty();
    if (isLasted.value) {
        return (
            combinedTotal() + pageData.tunggakan_denda - pageData.diskon_tunggakan
        );
    } else {
        return combinedTotal();
    }
});
const uuid = uuidv4();
const pageData = reactive({
    uid: uuid,
    total_bayar: totalPay,
    jumlah_uang: 0,
    payment_method: "cash",
    pembayaran: "angsuran",
    tunggakan_denda: 0,
    diskon_tunggakan: 0,
    pembulatan: 0,
    kembalian: computed(() =>
        pageData.jumlah_uang
            ? pageData.jumlah_uang - pageData.total_bayar - pageData.pembulatan
            : 0
    ),
    struktur: checkedRowCredit,
    bank_tujuan: null,
    no_rekening: null,
    bukti_transafer: null,
});

const dataRepayment = ref([]);
const getDataPelunasan = async (e) => {
    const dynamicBody = {
        loan_number: e,
    };
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: "POST",
        api: "pelunasan",
        data: dynamicBody,
        token: userToken,
    });
    if (!response.ok) {
        localStorage.removeItem("token");
        router.push("/");
    } else {
        dataRepayment.value = response.data;
        pageData.tunggakan_denda = dataRepayment.value[0].TUNGGAKAN_DENDA;
    }
};
const rowProps = (row) => {
    return {
        style: "cursor: pointer;",
        onClick: () => {
            // if (row.status === "LUNAS") {
            //   message.info("Fasilitas Sudah Lunas")
            // } else {
            isLasted.value = false;
            selectedFasilitas.value = row.loan_number;
            getSkalaCredit(row.loan_number);
            getDataPelunasan(row.loan_number);
            // }
        },
    };
};
const diskonFormat = computed(() => pageData.tunggakan_bunga);
const dynamicSearch = reactive({
    nama: "",
    no_polisi: "",
    no_kontrak: "",
});
const createColumns = () => {
    return [
        {
            title: "No Kontrak",
            key: "loan_number",
            sorter: "default",
        },
        {
            title: "Nama",
            key: "nama",
            sorter: "default",
            fixed: "left",
        },
        {
            title: "No Polisi",
            key: "no_polisi",
            sorter: "default",
        },
        {
            title: "Alamat",
            key: "alamat",
            sorter: "default",
        },
        {
            title: "Angsuran",
            key: "angsuran",
            align: "right",
            render(row) {
                return h("div", formatter.format(row.angsuran));
            },
        },
        // {
        //   title: "Status",
        //   key: "status",
        //   sorter: "default",
        // },
    ];
};
const rowClassName = (row) => {
    if (row.loan_number == selectedFasilitas.value) {
        return "row-active";
    }
    return "";
};

const parse = (input) => {
    const nums = input.replace(/,/g, "").trim();
    if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
    return nums === "" ? null : Number.NaN;
};
const format = (value) => {
    if (value === null) return "";
    return value.toLocaleString("en-US");
};

const createColStruktur = () => {
    return [
        {
            title: "ke",
            fixed: "left",
            type: "selection",
            disabled(row) {
                return (
                    row.key > checkedRowCredit.value.length || row.flag === "PENDING"
                );
            },
        },
        {
            title: "ke",
            key: "angsuran_ke",
            width: 40,
            fixed: "left",
        },
        {
            title: "No Kontrak",
            key: "loan_number",
            width: 150,
        },
        {
            title: "Jatuh Tempo",
            key: "tgl_angsuran",
            width: 100,
        },
        {
            title: "Angsuran",
            key: "installment",
            align: 'right',
            width: 100,
            render(row) {
                return h("div", formatter.format(row.installment));
            },
        },
        {
            title: "Denda",
            width: 100,
            key: "denda",
            align: 'right',
            render(row) {
                return h("div", formatter.format(row.denda));
            },
        },
        {
            title: "Bayar Angsuran",
            width: 150,
            key: "installment",
            render(row, index) {
                if (row.flag == "PENDING") {
                    return h(NTag, { type: "warning" }, { default: "dalam proses" });
                } else {
                    return h(NInputNumber, {
                        disabled: _.find(checkedRowCredit.value, ["key", row.key])
                            ? false
                            : true,
                        format: format,
                        parse: parse,
                        dir: isRtl,
                        max: row.installment,
                        showButton: false,
                        secondary: true,
                        placeholder: "pembayaran",
                        value: _.find(checkedRowCredit.value, ["key", row.key])
                            ? row.bayar_angsuran
                            : 0,
                        onUpdateValue(v) {
                            dataStrukturKredit.value[index].bayar_angsuran = v;
                        },
                    });
                }
            },
        },
        {
            title: "Bayar Denda",
            width: 150,
            key: "installment",
            render(row, index) {
                if (row.flag == "PENDING") {
                    return h(NTag, { type: "warning" }, { default: "dalam proses" });
                } else {
                    return h(NInputNumber, {
                        disabled: _.find(checkedRowCredit.value, ["key", row.key])
                            ? isLasted.value
                            : true,
                        clearable: true,
                        max: row.denda,
                        format: format,
                        parse: parse,
                        showButton: false,
                        secondary: true,
                        placeholder: "pembayaran",
                        value: _.find(checkedRowCredit.value, ["key", row.key])
                            ? isLasted.value ? 0 : row.bayar_denda
                            : 0,
                        onUpdateValue(v) {
                            dataStrukturKredit.value[index].bayar_denda = v;
                        },
                    });
                }
            },
        },
        {
            title: "Jumlah Bayar",
            width: 150,
            key: "payment",
            render(row, index) {
                if (row.flag == "PENDING") {
                    return h(NTag, { type: "warning" }, { default: "dalam proses" });
                } else {
                    return h(NInputNumber, {
                        readonly: true,
                        disabled: _.find(checkedRowCredit.value, ["key", row.key])
                            ? false
                            : true,
                        format: format,
                        parse: parse,
                        showButton: false,
                        secondary: true,
                        placeholder: "pembayaran",
                        value: _.find(checkedRowCredit.value, ["key", row.key])
                            ? isLasted.value ? dataStrukturKredit.value[index].bayar_angsuran : dataStrukturKredit.value[index].bayar_angsuran +
                                dataStrukturKredit.value[index].bayar_denda
                            : 0,
                    });
                }
            },
        },
    ];
};

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
const optTipePay = [
    {
        label: "Tunai",
        value: "cash",
    },
    {
        label: "Transfer",
        value: "transfer",
    },
];
const columns = createColumns();
const columnStruktur = createColStruktur();
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);
const loadStructure = ref(false);
const selectedFasilitas = ref();
const isRtl = true;
const handleFasilitas = (e) => {
    // isLasted(e);
    isLast.value = true;
    selectedFasilitas.value = e;
    prosesButton.value = true;
    // getSkalaCredit(e);
};
const isLasted = computed(() => {
    let mxChecked = Math.max(...checkedRowCredit.value.map((o) => o.angsuran_ke));
    let mxStruct = Math.max(
        ...dataStrukturKredit.value.map((o) => o.angsuran_ke)
    );
    if (checkedRowCredit.value.length != 0) {
        return mxChecked === mxStruct ? true : false;
    } else {
        return false;
    }
});
const handleAngsuran = (action, e, row) => {
    checkedRowCredit.value = e;
    if (row.action == "uncheck") {
        checkedRowCredit.value = _.filter(checkedRowCredit.value, (o) => o.key <= row.row.key);
    }

};

const dialog = useDialog();
const loadProses = ref(false);
const handleProses = async () => {
    let userToken = localStorage.getItem("token");
    dialog.warning({
        title: "Konfirmasi",
        content: "apakah data yang anda masukan sudah benar ?",
        positiveText: "Ya",
        negativeText: "cek kembali",
        onPositiveClick: () => {
            postDynamic();
        },
    });
    const postDynamic = async () => {
        const response = await useApi({
            method: "POST",
            api: "payment",
            data: pageData,
            token: userToken,
        });
        if (!response.ok) {
            message.error("sesi berakhir");
            localStorage.removeItem("token");
            router.push("/");
        } else {
            loadProses.value = false;
            paymentData.value = response.data;
            dialogProses.value = true;
            router.push({ name: "pembayaran" });
        }
    };
};
const inputFocus = ref();
const handleFocus = () => {
    inputFocus.value?.select();
}
const dataSearch = ref([]);
const loadSearch = ref(false);
const dataFasilitas = ref(false);
const handleSearch = async () => {
    isLasted.value = false;
    dataAngsuran.value = false;
    let userToken = localStorage.getItem("token");
    loadSearch.value = true;
    const response = await useApi({
        method: "POST",
        api: "search_customer",
        data: dynamicSearch,
        token: userToken,
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.push("/");
    } else {
        dataFasilitas.value = true;
        loadSearch.value = false;
        dataSearch.value = response.data;
    }
};
const dataStrukturKredit = ref([]);
const dataPayment = ref(false);
const getSkalaCredit = async (e) => {
    pageData.no_facility = e;
    loadStructure.value = true;
    const dynamicBody = {
        loan_number: pageData.no_facility,
        jumlah_uang: pageData.jumlah_uang,
    };
    loadingAngsuran.value = true;
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: "POST",
        api: "struktur_kredit",
        data: dynamicBody,
        token: userToken,
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.push("/");
    } else {
        dataPayment.value = true;
        checkedRowCredit.value = [];
        dataStrukturKredit.value = response.data;
        dataAngsuran.value = true;
        loadStructure.value = false;
    }
};
const message = useMessage();
const handleImagePost = ({ file, onError, onFinish, onProgress }) => {
    let userToken = localStorage.getItem("token");
    const form = new FormData();
    form.append("uid", pageData.uid);
    form.append("image", file.file);
    const headers = {
        Authorization: `Bearer ${userToken}`,
    };
    lyla
        .post(`${import.meta.env.VITE_APP_API_BASE}payment_attachment`, {
            headers,
            body: form,
            onUploadProgress: ({ percent }) => {
                onProgress({ percent: Math.ceil(percent) });
            },
        })
        .then(({ json }) => {
            dataBuktiTransfer.value = [];
            dataBuktiTransfer.value.push(json);
            message.success("image berhasil di upload");
            onFinish();
        })
        .catch(() => {
            message.error("upload image gagal !");
            onError();
        });
};
const handleExpand = () => {
    const fullPage = router.resolve({ name: "expand transaction" });
    window.open(fullPage.href, "_blank");
};

const handleBack = () => {
    router.push({ name: "pembayaran" });
};
</script>
<style scoped>
:deep(.row-active td) {
    font-weight: bolder;
    background-color: rgba(24, 160, 88, 0.2) !important;
    color: rgba(24, 160, 88, 1) !important;
}
</style>
