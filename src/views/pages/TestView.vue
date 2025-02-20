<template>
  <div class="flex justify-center p-0 md:p-8 bg-gradient-to-tr from-blue-800 to-orange-500">
    <div
        class="p-8 h-screen border shadow rounded-none md:rounded-2xl w-[500px] flex bg-white justify-between flex-col">
      <div class=" h-20 ">
        <div class="text-2xl flex items-center   pb-8">
          chat<span :class="indikator ? 'animate-bounce':'animate-none'"><b>Raimu</b></span>
        </div>

      </div>
      <div class="flex flex-col gap-4 h-[600px] overflow-auto">
        <div v-for="inv in pushedInvoice" class="flex justify-between bg-slate-50 p-2 rounded-full">
          <span class="font-bold">{{ inv.no_invoice }}</span>
          <span>{{ dateFormat(inv.tgl) }}</span>
        </div>
        <div v-if="pushedInvoice.length > 0" @click="pushedInvoice = []"
             class="bg-slate-200  cursor-pointer font-bold  item-center flex w-fit p-2 rounded-full ">
          <n-icon>
            <close-icon/>
          </n-icon>
          <div>hapus log</div>
        </div>
      </div>
      <div class="">
        <div class="flex flex-col p-2 shadow-md border rounded-2xl">
    <textarea v-model="textArea" style="resize:none" class="p-2 focus:outline-none"
              placeholder="no invoice dipisahkan dengan koma" @focus="indikator = true" @blur="indikator=!indikator">
    </textarea>
          <div class="flex justify-between">

            <div v-if="noInvoice != null" class="border items-center font-bold flex w-fit px-4 rounded-full shadow">
              {{ noInvoice != null ? noInvoice.length : null }} Invoice
            </div>
            <div v-else></div>
            <div class="flex gap-2">
              <div v-if="textArea != null" @click="textArea = null"
                   class="bg-slate-200  cursor-pointer font-bold flex w-fit p-2 rounded-full ">
                <n-icon>
                  <close-icon/>
                </n-icon>
              </div>
              <div @click="eksekusi(noInvoice)"
                   class="bg-pr cursor-pointer font-bold flex w-fit p-2 rounded-full text-white">
                <n-icon>
                  <up-icon/>
                </n-icon>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import {useMessage} from 'naive-ui';
import {useApi} from '../../helpers/axios';
import {ArrowUpwardRound as UpIcon, CloseRound as CloseIcon} from "@vicons/material";

const message = useMessage();
const textArea = ref();
const pushedInvoice = ref([]);
const noInvoice = computed(() => {
  return textArea.value ? textArea.value.split(',').map(item => item.trim()) : null;
});
const indikator = ref(false);
const eksekusi = async (e) => {
  for (let invoice of e) {
    const response = await useApi({
      method: "POST",
      api: "welcome",
      data: {
        "no_invoice": invoice,
        "tipe": "angsuran"
      },
    });
    if (!response.ok) {
      message.error('ERROR API');
    } else {
      textArea.value = null;
      message.success(invoice);
      const date = Date.now();
      pushedInvoice.value.push({no_invoice: invoice, tgl: date});
    }

  }
}
const dateFormat = (e) => {
  var date = new Date(e * 1000);

// Hours part from the timestamp
  var hours = date.getHours();

// Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

// Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
}

</script>
