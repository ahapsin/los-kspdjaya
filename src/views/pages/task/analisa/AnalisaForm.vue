<template>
  <div class="flex p-1 border bg-slate-50 shadow rounded-lg">
    <div class="p-2 w-1/4">
      <div class="flex gap-2">
        <n-avatar>P</n-avatar>
        <div class="flex flex-col">
          <small>NO DEBITUR</small>
          <strong>NAMA DEBITUR</strong>
        </div>
      </div>
      <div class="py-4">
        <div @click="addParam(param)" :key="param.id" v-for="param in paramScoring"
             class="p-2 gap-2 flex  items-center cursor-pointer hover:bg-slate-200 rounded">
          <n-icon size="large">
            <add-icon/>
          </n-icon>
          <div>{{ param.param }}</div>
        </div>
      </div>
      <div class="p-4">
        <n-progress
            type="line"
            :show-indicator="false"
            status="info"
            :percentage="(bucketParam.length ? bucketParam.length : 0)"
        />
        <div class="py-2">{{bucketParam.length ? bucketParam.length : 0}} parameter dari {{paramScoring.length}}</div>
      </div>
    </div>
    <div class="w-full bg-white rounded-lg p-4">
      <div class="grid  grid-cols-2 gap-4  p-4">
        <n-form-item label="Permohonan nasabah">
          <n-select/>
        </n-form-item>
        <n-form-item label="Status nasabah">
          <n-select/>
        </n-form-item>
      </div>
      <div v-for="(listBucket,i) in bucketParam" :key="listBucket.id">
        <n-card :title="listBucket.param">
          <template #header-extra>
            <n-button quaternary circle @click="removeParam(i)">
              <n-icon>
                <remove-icon/>
              </n-icon>
            </n-button>
          </template>
          <n-form-item v-for="itemParam in listBucket.paramlist">
            <div class="w-2/6">{{ itemParam.title }}</div>
            <n-input type="textarea" v-if="itemParam.type == 'single'"/>
            <div v-else-if="itemParam.type == 'table'">
              <n-table :bordered="false" :single-line="false" class="w-full" width="100%">
                <thead>
                <tr>
                  <th>tab1</th>
                  <th>tab2</th>
                  <th>tab3</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>col1</td>
                  <td>col2</td>
                  <td>col3</td>
                </tr>
                </tbody>
              </n-table>
            </div>
            <n-select v-else/>
          </n-form-item>
        </n-card>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-y-4 pt-4">
    <!--      <n-card v-for="param in modelArray(useAnalisaModalKerja)" :key="param.id">-->
    <!--        <div class="flex justify-between">-->
    <!--          <div class="text-lg font-bold">{{ param.replace("_", " ").toUpperCase() }}</div>-->
    <!--          <n-switch></n-switch>-->
    <!--        </div>-->
    <!--        <div class="bg-slate-50 p-4">-->
    <!--          asdasd-->
    <!--        </div>-->
    <!--      </n-card>-->

  </div>
</template>
<script setup>
import _ from "lodash";
import {h} from "vue";
import {NInput} from "naive-ui";

const apptitle = import.meta.env.VITE_APP_TITLE;
const applogo = import.meta.env.VITE_APP_LOGO;
import {useAnalisaModalKerja} from "../../../../models/parameter_analisa.js";
import {CloseRound as RemoveIcon, AddCircleRound as AddIcon} from "@vicons/material";

const optModalKerja = reactive(useAnalisaModalKerja);
const marks = {
  0: '0',
  50: '50',
  100: '100'
}
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
const paramScoring = reactive(useAnalisaModalKerja);
const currentRef = ref(1);
const modalSt = ref(false);
const stStep1 = () => {
  modalSt.value = true;
}

const bucketParam = ref([]);

const findMatchParameter = (col, val) => {
  let a = _.findIndex(col, function (o) {
    return o.range_min <= val && o.range_max >= val;
  });
  return a > 0 ? col[a] : col[0];
}
const addParam = (e) => {
  bucketParam.value.unshift(e);
}
const removeParam = (e) => {
  bucketParam.value.splice(e, 1);
}
const currentStatus = ref("process");
const modelArray = (e) => Object.keys(e).map(key => key);

function createData() {
  return [
    {
      key: 0,
      name: "John Brown",
      age: "32",
      address: "New York No. 1 Lake Park"
    },
    {
      key: 1,
      name: "Jim Green",
      age: "42",
      address: "London No. 1 Lake Park"
    },
    {
      key: 2,
      name: "Joe Black",
      age: "32",
      address: "Sidney No. 1 Lake Park"
    }
  ];
}

const data = ref(createData());
const createColumns = () => [
  {
    title: "Name",
    key: "name",
    render(row, index) {
      return h(NInput, {
        value: row.name,
        onUpdateValue(v) {
          data.value[index].name = v;
        }
      });
    }
  },
  {
    title: "Age",
    key: "age",
    render(row, index) {
      return h(NInput, {
        value: row.age,
        onUpdateValue(v) {
          data.value[index].age = v;
        }
      });
    }
  },
  {
    title: "Address",
    key: "address",
    render(row, index) {
      return h(NInput, {
        value: row.address,
        onUpdateValue(v) {
          data.value[index].address = v;
        }
      });
    }
  }
];
const columns = () => {
  return createColumns();
}

</script>