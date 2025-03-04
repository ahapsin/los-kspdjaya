<template>
  <div class="flex items-center gap-4 cursor-pointer">
    <n-badge @click="approvalCenter" v-if="dataUser?.nama == 'ho'">
      <n-icon size="25" color="#0e7a0d">
        <NotifIcon/>
      </n-icon>
    </n-badge>
    <n-dropdown trigger="hover" :options="options">
      <div class="flex items-center gap-4">
                <span class="flex flex-col items-end">
                  <n-text type="primary"><strong>{{ dataUser?.nama }}</strong></n-text>
                    <small class="text-primary hidden md:flex uppercase"> POS :{{ dataUser?.cabang_nama }}</small>
                </span>
        <n-avatar round size="medium" class="aspect-square" :src="dataUser
                    ? dataUser.PHOTO_URL
                    : 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-vert.png'
                    ">
          {{ dataUser?.nama.at(0) }}
        </n-avatar>

      </div>
    </n-dropdown>

  </div>
</template>
<script setup>
import {ref, h, onMounted} from "vue";
import router from "../../router";
import {useMessage, NIcon} from "naive-ui";
import {
  NotificationsRound as NotifIcon,
  AccountCircleOutlined as Account,
  LockOutlined as Locked,
  LogOutOutlined as SignOut,
} from "@vicons/material";

import {useApi} from "../../helpers/axios";
import {useMeStore} from "../../stores/me";
import {useTaskStore} from "../../stores/task";

const message = useMessage();

const dataUser = ref();
const options = [
  {
    label: "Akun",
    icon() {
      return h(NIcon, null, {
        default: () => h(Account),
      });
    },
    key: 1,
    props: {
      onClick: () => {
        handleAccount();
      },
    },
  },
  {
    label: "Ganti Password",
    icon() {
      return h(NIcon, null, {
        default: () => h(Locked),
      });
    },
    key: 2,
    props: {
      onClick: () => {
        handleChangePassword();
      },
    },
  },
  {
    type: "divider",
    key: "d1",
  },
  {
    label: "Logout",
    icon() {
      return h(NIcon, null, {
        default: () => h(SignOut),
      });
    },
    key: 3,
    props: {
      onClick: () => {
        LogOut();
      },
    },
  },
];
const me = useMeStore();
const task = useTaskStore();
const approvalCenter = () => {
  router.push({name: "approval-center"})
}
const handleAccount = () => {
  router.push({name: "myaccount"});
};
const handleChangePassword = () => {
  router.push({name: "changepassword"});
};

const GetMe = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "me",
    token: userToken,
  });
  if (!response.ok) {
    message.info('SESI BERAKHIR');
  } else {
    dataUser.value = response.data.response;
    me.storeMe(response.data.response);
    task.storeTask(response.data.response);
  }
};
const GetPayment = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "me",
    token: userToken,
  });
  if (!response.ok) {
    message.info('SESI BERAKHIR');
  } else {
    dataUser.value = response.data.response;
    me.storeMe(response.data.response);
    task.storeTask(response.data.response);
  }
};


const LogOut = async () => {

  localStorage.removeItem("token");
  message.success("logout berhasil");
  router.go();
  // }
};
onMounted(() => {
  GetMe();
});
</script>