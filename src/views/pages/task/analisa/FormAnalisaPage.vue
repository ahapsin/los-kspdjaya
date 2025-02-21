<template>
  <n-card title="form isian analisa">
    <div class="p-2 group border flex justify-between  items-center rounded-lg">
      <div class="flex gap-2">
        <n-avatar>P</n-avatar>
        <div class="flex flex-col">
          <small>NO DEBITUR</small>
          <strong>NAMA DEBITUR</strong>
        </div>
      </div>
      <n-button type="info" @click="modalSt = true">Detail</n-button>
    </div>
    <div class="p-4">
      <n-space vertical>
        <n-steps vertical v-model:current="currentRef">
          <n-step v-for="schema in schemaScoring" :key="schema.id"
                  :title="schema.kriteria"
          >
            <div class="flex flex-col gap-2">
              <div class="flex  items-center justify-between p-2 bg-slate-200 rounded-lg" v-if="schema.key === 2">
                <n-form>
                  <n-space>
                    <n-form-item :label="uang.title" v-for="uang in keuangan" :key="uang.id">
                      <n-input :placeholder="`Masukan ${uang.title}`">
                        <template #suffix>{{ uang.suff }}</template>
                      </n-input>
                    </n-form-item>
                  </n-space>
                </n-form>
              </div>
              <div class="flex  items-center justify-between p-2 bg-slate-200 rounded-lg"
                   v-for="header in schema.scoring">
                <div class="flex flex-col">
                  <span class="text-xl font-bold">{{ header.header }}</span>
                  {{ header.param.note }}
                  <span>{{ findMatchParameter(header.param, header.nilai).parameter }}</span>
                  <n-input v-if="findMatchParameter(header.param, header.nilai).note"/>
                </div>
                <div class="flex gap-2 items-center">
                  <div class="w-[100px] flex">
                    <n-slider v-model:value="header.nilai">
                    </n-slider>
                  </div>
                  <div class="text-2xl w-[50px]">{{ header.nilai }}</div>
                </div>
              </div>
            </div>
          </n-step>
        </n-steps>
      </n-space>
    </div>
  </n-card>
  <n-modal v-model:show="modalSt">
    <n-card
        style="width: 600px"
        title="Data Detail Debitur"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
    </n-card>
  </n-modal>

</template>
<script setup>
import _ from "lodash";
import {useScoringAnalis} from "../../../../stores/analis.js";

const keuangan = reactive([{
  title: "Omzet",
  value: null,
  suff: "/bulan"
},
  {
    title: "Margin Keuntungan",
    value: null,
    suff: "%"
  }, {
    title: "Pendapatan lain-lain",
    value: null,
    suff: "/bulan"
  }, {
    title: "Biaya Hidup, pendidikan dll",
    value: null,
    suff: "/bulan"
  }, {
    title: "Biaya Operasional usaha",
    value: null,
    suff: "/bulan"
  },])
const schemaScoring = reactive(useScoringAnalis);
const currentRef = ref(1);
const modalSt = ref(false);
const stStep1 = () => {
  modalSt.value = true;
}

const findMatchParameter = (col, val) => {
  let a = _.findIndex(col, function (o) {
    return o.range_min <= val && o.range_max >= val;
  });
  return a > 0 ? col[a] : col[0];
}
const currentStatus = ref("process");
</script>