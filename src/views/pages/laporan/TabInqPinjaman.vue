<template>
    <div>
        <n-space vertical :size="12" class="pt-4">
            <n-space>
                <n-input placeholder="cari" v-model:value="searchBox" clearable />
                <n-button @click="downloadCsv" type="info">download</n-button>
            </n-space>
            <n-data-table ref="tableRef" :max-height="250"
                          virtual-scroll
                          virtual-scroll-x
                          :scroll-x="scrollX"
                          :min-row-height="48"
                          :height-for-row="12"
                          virtual-scroll-header
                          :header-height="48" :columns="columns" :data="showData" :pagination="{ pageSize: 10 }"
                :loading="loading" />
        </n-space>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useSearch } from "../../../helpers/searchObject.js";

const props = defineProps({
    loading: Boolean,
    columns: Array,
    data: Object
})
const tableRef = ref();
const searchBox = ref();
const showData = computed(() => {
    return useSearch(props.data ? props.data : [], searchBox.value);
});
const downloadCsv = () => tableRef.value?.downloadCsv({
    fileName: `inq_pinjaman`,
    keepOriginalData: false
});
</script>
