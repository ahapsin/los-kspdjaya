<template>
    <div>
        <n-space vertical :size="12" class="pt-4">
            <n-space>
                <n-input placeholder="cari" v-model:value="searchBox" clearable />
            </n-space>
            <n-data-table ref="tableRef"
                          :header-height="48" :columns="columns" :data="showData"
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
