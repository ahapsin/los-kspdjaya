<template>
        <div class="p-2 rounded-md">
                <n-dropdown trigger="hover" :options="options">
                        <div class="flex items-center gap-2">
                                <span class="flex flex-col items-end">
                                        <strong>{{ dataUser?.NAMA }}</strong>
                                        <small class="text-pr hidden md:flex">{{ dataUser?.EMAIL }}</small>
                                </span>
                                <n-avatar round size="medium" class="aspect-square"
                                        :src="dataUser ? dataUser.PHOTO_URL : 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-vert.png'">
                                        {{ dataUser?.NAMA.at(0) }}
                                </n-avatar>

                        </div>
                </n-dropdown>
        </div>
</template>
<script setup>
import { ref } from "vue";
import router from "../../router"
import { useMessage, NIcon } from "naive-ui";
import {
        AccountCircleOutlined as Account,
        LockOutlined as Locked,
        LogOutOutlined as SignOut
} from '@vicons/material'
import { useApi } from "../../helpers/axios"
const message = useMessage();

const dataUser = ref();
const options = [
        {
                label: "Akun",
                icon() {
                        return h(NIcon, null, {
                                default: () => h(Account)
                        })
                },
                key: 1,
                props: {
                        onClick: () => {
                                message.success("akun!");
                        }
                }
        },
        {
                label: "Ganti Password",
                icon() {
                        return h(NIcon, null, {
                                default: () => h(Locked)
                        })
                },
                key: 2,
                props: {
                        onClick: () => {
                                message.success("ganti password!");
                        }
                }
        }, {
                type: "divider",
                key: "d1"
        },
        {
                label: "Logout",
                icon() {
                        return h(NIcon, null, {
                                default: () => h(SignOut)
                        })
                },
                key: 3,
                props: {
                        onClick: () => {
                                LogOut();
                        }
                }
        },
];

const GetMe = async () => {
        let userToken = localStorage.getItem("token");
        const response = await useApi({
                method: 'GET',
                api: 'me',
                token: userToken
        });
        if (!response.ok) {
                localStorage.removeItem("token");
        } else {
                dataUser.value = response.data.response;
        }
}

const LogOut = async () => {
        let userToken = localStorage.getItem("token");
        const response = await useApi({
                method: 'GET',
                api: 'auth/logout',
                token: userToken
        });
        if (response.ok) {
                localStorage.removeItem("token");
                message.success("logout berhasil");
                router.replace('/');
        }
}
onMounted(() => GetMe());
</script>